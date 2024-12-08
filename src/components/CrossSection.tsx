import React, { useEffect, useRef } from "react";

type CrossSectionProps = {
  type: string | null;
};

const CrossSection: React.FC<CrossSectionProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawDivergent = (ctx: CanvasRenderingContext2D, tick: number) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Ocean background
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 50, ctx.canvas.width, ctx.canvas.height - 50);

    // Mid-ocean ridge
    ctx.fillStyle = "#8B4513";
    ctx.beginPath();
    ctx.moveTo(150 - tick, 150);
    ctx.lineTo(175, 50);
    ctx.lineTo(200 + tick, 150);
    ctx.closePath();
    ctx.fill();

    // Oceanic plates moving apart
    ctx.fillStyle = "#228B22";
    ctx.fillRect(0, 150, 150 - tick, 50); // Left plate
    ctx.fillRect(200 + tick, 150, canvasRef.current!.width - 200 - tick, 50); // Right plate

    // Add labels
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText("Oceanic Plate", 50, 140);
    ctx.fillText("Oceanic Plate", 250, 140);
    ctx.fillText("Mid-Ocean Ridge", 150, 40);
  };

  const drawTransform = (ctx: CanvasRenderingContext2D, tick: number) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Land background
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, 100, ctx.canvas.width, 200);

    // Transform fault line
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 300);
    ctx.stroke();

    // Plates sliding past each other
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50 + tick, 200); // Left plate moves up
    ctx.lineTo(150 + tick, 100);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(250 - tick, 300); // Right plate moves down
    ctx.lineTo(350 - tick, 200);
    ctx.stroke();

    // Add labels
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText("Transform Fault", 150, 50);
  };

  const animate = (ctx: CanvasRenderingContext2D, type: string, tick: number) => {
    if (type.toLowerCase() === "divergent") {
      drawDivergent(ctx, tick);
    } else if (type.toLowerCase() === "transform") {
      drawTransform(ctx, tick);
    } else {
      // For unknown or unsupported types
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "gray";
      ctx.font = "18px Arial";
      ctx.textAlign = "center";
      ctx.fillText("No cross-section available.", ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !type) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let tick = 0;
    const maxTick = 20; // Control the magnitude of movement
    const speed = 50; // Speed in milliseconds
    let direction = 1; // 1 for forward, -1 for backward

    const interval = setInterval(() => {
      animate(ctx, type, tick);

      tick += direction;
      if (tick === maxTick || tick === 0) {
        direction *= -1; // Reverse direction
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [type]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Plate Boundary Cross-Section</h2>
      <canvas ref={canvasRef} width={400} height={300} className="border border-gray-300 rounded shadow" />
    </div>
  );
};

export default CrossSection;