import { useState, useEffect, useRef } from "react";
import {
  Container,
  Title,
  HeliceContainer,
  NetworkCanvas,
  Controls,
  ControlButton,
} from "./styles";

const Test = () => {
  const [rotation, setRotation] = useState(0);
  const [showNetwork, setShowNetwork] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.2);

  const networkCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const networkNodesRef = useRef([]);

  // Rotação da hélice
  useEffect(() => {
    const animate = () => {
      setRotation((prev) => (prev + rotationSpeed) % 360);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [rotationSpeed]);

  // Inicializar nós da rede neural
  useEffect(() => {
    const nodes = [];
    const centerX = 250;
    const centerY = 250;
    const radius = 180;

    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const distance = radius + Math.random() * 60;
      nodes.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [],
      });
    }
    networkNodesRef.current = nodes;
  }, []);

  // Desenhar estrela de 3 pontas (Mercedes-style)
  const drawMercedesStar = (ctx, x, y, size, rotation, opacity) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Estrela de 3 pontas
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#ecfbff";

    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const angle = (i * 120 - 90) * (Math.PI / 180);
      const x1 = Math.cos(angle) * size;
      const y1 = Math.sin(angle) * size;

      if (i === 0) ctx.moveTo(x1, y1);
      else ctx.lineTo(x1, y1);

      // Ponta interna
      const innerAngle = (i * 120 + 60 - 90) * (Math.PI / 180);
      const x2 = Math.cos(innerAngle) * (size * 0.3);
      const y2 = Math.sin(innerAngle) * (size * 0.3);
      ctx.lineTo(x2, y2);
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  // Animar rede neural
  useEffect(() => {
    if (!showNetwork) return;

    const canvas = networkCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const nodes = networkNodesRef.current;

    const animate = () => {
      ctx.clearRect(0, 0, 500, 500);

      // Atualizar posições
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Manter dentro dos limites
        if (node.x < 50 || node.x > 450) node.vx *= -1;
        if (node.y < 50 || node.y > 450) node.vy *= -1;
      });

      // Desenhar conexões
      ctx.strokeStyle = "rgba(164, 196, 255, 0.9)";
      ctx.lineWidth = 5;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Desenhar estrelas Mercedes nos nós
      nodes.forEach((node, index) => {
        const starRotation = rotation * 0.02 + index * 0.3;
        drawMercedesStar(ctx, node.x, node.y, 25, starRotation, 0.5);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [showNetwork, rotation]);

  return (
    <Container>
      <Title>Estrela Generativa Axia</Title>

      <HeliceContainer>
        {showNetwork && (
          <NetworkCanvas ref={networkCanvasRef} width={500} height={500} />
        )}
      </HeliceContainer>
    </Container>
  );
};

export default Test;
