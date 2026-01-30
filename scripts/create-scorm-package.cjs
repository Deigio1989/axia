const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");

async function createScormPackage() {
  const buildDir = path.join(__dirname, "../dist");
  const scormDir = path.join(__dirname, "../scorm-package");
  const zipPath = path.join(__dirname, "../axia-energia-scorm.zip");

  try {
    console.log("🚀 Iniciando criação do pacote SCORM...");

    // Remove arquivos anteriores
    await fs.remove(scormDir);
    await fs.remove(zipPath);
    await fs.ensureDir(scormDir);

    console.log("📦 Copiando arquivos do build...");
    // Copia build
    await fs.copy(buildDir, scormDir);

    console.log("📄 Copiando imsmanifest.xml...");
    // Copia manifest
    const manifestSrc = path.join(__dirname, "../public/imsmanifest.xml");
    await fs.copy(manifestSrc, path.join(scormDir, "imsmanifest.xml"));

    console.log("🗜️ Criando arquivo ZIP...");
    // Cria ZIP
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
      console.log(`✅ Pacote SCORM criado com sucesso!`);
      console.log(`📍 Local: ${zipPath}`);
      console.log(`📊 Tamanho: ${sizeInMB} MB`);
    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(output);
    archive.directory(scormDir, false);
    await archive.finalize();
  } catch (error) {
    console.error("❌ Erro ao criar pacote SCORM:", error);
    process.exit(1);
  }
}

createScormPackage();
