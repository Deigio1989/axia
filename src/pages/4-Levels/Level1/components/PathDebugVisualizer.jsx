import { PathVisualization } from "../styles";

/**
 * Componente para visualizar o caminho do player (debug mode)
 * @param {Array} path - Array de pontos {x, y}
 */
export function PathDebugVisualizer({ path = [] }) {
  if (path.length === 0) return null;

  return (
    <PathVisualization>
      <polyline
        points={path.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="rgba(255, 0, 0, 0.5)"
        strokeWidth="3"
        strokeDasharray="5,5"
      />
      {path.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r="3" fill="red" />
      ))}
    </PathVisualization>
  );
}
