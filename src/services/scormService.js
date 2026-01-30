/**
 * SCORM Service - Comunicação com LMS via SCORM 1.2 API
 *
 * Este serviço gerencia toda comunicação com o LMS (Learning Management System)
 * através da API SCORM 1.2, incluindo inicialização, leitura/escrita de dados,
 * e finalização da sessão.
 */

class ScormService {
  constructor() {
    this.api = null;
    this.initialized = false;
    this.debugMode = import.meta.env.DEV; // Debug em desenvolvimento
  }

  /**
   * Busca a API SCORM navegando pela hierarquia de janelas
   * @returns {object|null} - API SCORM ou null se não encontrada
   */
  findScormAPI() {
    if (this.api) return this.api;

    let api = null;
    let win = window;
    let attempts = 0;
    const maxAttempts = 500;

    // Tenta encontrar API na janela atual
    if (win.API) {
      api = win.API;
      if (this.debugMode)
        console.log("✅ API SCORM encontrada na window atual");
      return api;
    }

    // Navega pelos parent windows
    while (!api && win.parent && win.parent !== win && attempts < maxAttempts) {
      attempts++;

      try {
        if (win.parent.API) {
          api = win.parent.API;
          if (this.debugMode)
            console.log(`✅ API SCORM encontrada após ${attempts} tentativas`);
          break;
        }
        win = win.parent;
      } catch (e) {
        // Erro de cross-origin, continua tentando
        break;
      }
    }

    if (!api && this.debugMode) {
      console.warn(
        "⚠️ API SCORM não encontrada. Modo fallback ativado (localStorage).",
      );
    }

    this.api = api;
    return api;
  }

  /**
   * Inicializa a conexão com LMS
   * @returns {Promise<boolean>} - true se inicializado com sucesso
   */
  async initialize() {
    const api = this.findScormAPI();

    if (api) {
      const result = api.LMSInitialize("");
      this.initialized = result === "true";

      if (this.debugMode) {
        console.log(`🚀 SCORM Initialize: ${result}`);
        if (!this.initialized) {
          const error = api.LMSGetLastError();
          console.error(`❌ Erro na inicialização: ${error}`);
        }
      }

      return this.initialized;
    } else {
      // Fallback para desenvolvimento local
      if (this.debugMode) {
        console.log("🔧 Modo desenvolvimento: usando localStorage");
      }
      this.initialized = true;
      return true;
    }
  }

  /**
   * Obtém valor de um campo SCORM
   * @param {string} key - Chave SCORM (ex: "cmi.core.student_name")
   * @returns {string} - Valor do campo
   */
  getValue(key) {
    const api = this.findScormAPI();

    if (api) {
      const value = api.LMSGetValue(key);
      if (this.debugMode) {
        console.log(`📥 SCORM GetValue: ${key} = ${value}`);
      }
      return value;
    } else {
      // Fallback localStorage
      const value = localStorage.getItem(`scorm_${key}`) || "";
      if (this.debugMode) {
        console.log(`📥 LocalStorage GetValue: ${key} = ${value}`);
      }
      return value;
    }
  }

  /**
   * Define valor de um campo SCORM
   * @param {string} key - Chave SCORM
   * @param {string} value - Valor a ser definido
   * @returns {boolean} - true se sucesso
   */
  setValue(key, value) {
    const api = this.findScormAPI();

    if (api) {
      const result = api.LMSSetValue(key, String(value));

      if (this.debugMode) {
        console.log(`📤 SCORM SetValue: ${key} = ${value} (${result})`);
      }

      if (result !== "true") {
        const error = api.LMSGetLastError();
        console.error(`❌ Erro ao setar ${key}: ${error}`);
        return false;
      }

      return true;
    } else {
      // Fallback localStorage
      localStorage.setItem(`scorm_${key}`, String(value));
      if (this.debugMode) {
        console.log(`📤 LocalStorage SetValue: ${key} = ${value}`);
      }
      return true;
    }
  }

  /**
   * Confirma (salva) os dados no LMS
   * @returns {boolean} - true se sucesso
   */
  commit() {
    const api = this.findScormAPI();

    if (api) {
      const result = api.LMSCommit("");

      if (this.debugMode) {
        console.log(`💾 SCORM Commit: ${result}`);
      }

      if (result !== "true") {
        const error = api.LMSGetLastError();
        console.error(`❌ Erro no commit: ${error}`);
        return false;
      }

      return true;
    } else {
      // Em desenvolvimento, commit é automático (localStorage já salvou)
      if (this.debugMode) {
        console.log("💾 LocalStorage: dados já salvos automaticamente");
      }
      return true;
    }
  }

  /**
   * Finaliza a sessão SCORM
   * @returns {boolean} - true se sucesso
   */
  finish() {
    const api = this.findScormAPI();

    if (api && this.initialized) {
      const result = api.LMSFinish("");

      if (this.debugMode) {
        console.log(`🏁 SCORM Finish: ${result}`);
      }

      this.initialized = false;
      return result === "true";
    } else {
      if (this.debugMode) {
        console.log("🏁 LocalStorage: sessão encerrada");
      }
      return true;
    }
  }

  /**
   * Obtém último erro da API SCORM
   * @returns {string} - Código do erro
   */
  getLastError() {
    const api = this.findScormAPI();
    return api ? api.LMSGetLastError() : "0";
  }

  /**
   * Obtém descrição do último erro
   * @returns {string} - Descrição do erro
   */
  getErrorString(errorCode) {
    const api = this.findScormAPI();
    return api ? api.LMSGetErrorString(errorCode) : "";
  }

  // ========== Métodos de Conveniência ==========

  /**
   * Obtém nome do estudante
   */
  getStudentName() {
    return this.getValue("cmi.core.student_name");
  }

  /**
   * Obtém ID do estudante
   */
  getStudentId() {
    return this.getValue("cmi.core.student_id");
  }

  /**
   * Define score (0-100)
   */
  setScore(score) {
    const validScore = Math.max(0, Math.min(100, Math.round(score)));
    this.setValue("cmi.core.score.raw", validScore);
    this.commit();
  }

  /**
   * Obtém score atual
   */
  getScore() {
    const score = this.getValue("cmi.core.score.raw");
    return score ? parseInt(score, 10) : 0;
  }

  /**
   * Define status da lição
   * @param {string} status - "passed" | "failed" | "incomplete" | "browsed"
   */
  setLessonStatus(status) {
    const validStatuses = ["passed", "failed", "incomplete", "browsed"];

    if (!validStatuses.includes(status)) {
      console.warn(`Status inválido: ${status}. Usando 'incomplete'`);
      status = "incomplete";
    }

    this.setValue("cmi.core.lesson_status", status);
    this.commit();
  }

  /**
   * Obtém status da lição
   */
  getLessonStatus() {
    return this.getValue("cmi.core.lesson_status") || "incomplete";
  }

  /**
   * Define localização atual (bookmark)
   */
  setLessonLocation(location) {
    this.setValue("cmi.core.lesson_location", location);
    this.commit();
  }

  /**
   * Obtém localização salva
   */
  getLessonLocation() {
    return this.getValue("cmi.core.lesson_location");
  }

  /**
   * Define tempo de sessão (formato SCORM: HH:MM:SS)
   */
  setSessionTime(milliseconds) {
    const scormTime = this.msToScormTime(milliseconds);
    this.setValue("cmi.core.session_time", scormTime);
    this.commit();
  }

  /**
   * Define dados de suspensão (estado customizado em JSON)
   */
  setSuspendData(data) {
    const jsonString = typeof data === "string" ? data : JSON.stringify(data);
    this.setValue("cmi.suspend_data", jsonString);
    this.commit();
  }

  /**
   * Obtém dados de suspensão
   */
  getSuspendData() {
    return this.getValue("cmi.suspend_data");
  }

  /**
   * Define tipo de saída
   * @param {string} exitType - "suspend" | "logout" | "time-out" | ""
   */
  setExit(exitType) {
    this.setValue("cmi.core.exit", exitType);
  }

  // ========== Utilitários ==========

  /**
   * Converte milissegundos para formato SCORM (HH:MM:SS)
   */
  msToScormTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  /**
   * Converte formato SCORM (HH:MM:SS) para milissegundos
   */
  scormTimeToMs(scormTime) {
    const parts = scormTime.split(":");
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseInt(parts[2], 10) || 0;

    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  }
}

// Exporta instância única (singleton)
const scormService = new ScormService();
export default scormService;
