import { LevelContainer } from "./styles";

export function MapLevel({
  levelNumber,
  row,
  isUnlocked = false,
  onClick,
  top,
  left,
  size,
  type = "normal",
  isSelected = false,
  numberTop,
  numberLeft,
}) {
  const handleClick = () => {
    if (isUnlocked && onClick) {
      onClick(levelNumber);
    }
  };

  return (
    <LevelContainer
      $isUnlocked={isUnlocked}
      onClick={handleClick}
      $top={top}
      $left={left}
      $size={size}
      $type={type}
      $isSelected={isSelected}
      $numberTop={numberTop}
      $numberLeft={numberLeft}
    >
      <img
        className="level"
        src={`/images/C${levelNumber}-f${row}.png`}
        alt={`Level ${levelNumber}`}
      />
      <img
        className="number"
        src={`/images/${levelNumber}.png`}
        alt={`Number ${levelNumber}`}
      />
    </LevelContainer>
  );
}
