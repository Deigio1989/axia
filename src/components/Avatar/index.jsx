import { AvatarWrapper } from "./styles";

/**
 * Componente Avatar reutilizável
 * @param {string} type - 'M' ou 'H' (Masculino ou Feminino)
 * @param {boolean} epi - Se está com EPI (Equipamento de Proteção Individual)
 * @param {string} size - 'small', 'medium', 'large'
 * @param {boolean} selected - Se está selecionado
 * @param {boolean} selectionScreen - Se está na tela de seleção (ativa hover e animações)
 * @param {function} onClick - Callback ao clicar
 */
export function Avatar({
  type,
  epi = false,
  size = "medium",
  selected = false,
  selectionScreen = false,
  onClick,
}) {
  const imageSuffix = epi
    ? `-${type.toLowerCase()}-epi`
    : `-${type.toLowerCase()}`;

  return (
    <AvatarWrapper
      $size={size}
      $selected={selected}
      $selectionScreen={selectionScreen}
      onClick={onClick}
    >
      <img className="circle" src="/images/avatar-circle.png" alt="" />
      <img
        className="face"
        src={`/images/avatar${imageSuffix}.png`}
        alt={`Avatar ${type === "M" ? "Masculino" : "Feminino"}${epi ? " com EPI" : ""}`}
      />
    </AvatarWrapper>
  );
}

export default Avatar;
