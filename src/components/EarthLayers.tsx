import React, { useRef, useState, useEffect } from "react";

const EarthLayers: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<{
    name: string;
    radius: number;
    color: string;
    description: string;
  } | null>(null);

  const layers = [
    {
      name: "Inner Core",
      color: "#FF6347",
      radius: 50,
      description: "Rigid solid composed of iron and nickel, located at Earth's center.",
    },
    {
      name: "Outer Core",
      color: "#FFA07A",
      radius: 100,
      description: "Liquid iron and nickel generating Earth's magnetic field.",
    },
    {
      name: "Mantle",
      color: "#FFD700",
      radius: 150,
      description:
        "Silicate minerals making up ~84% of Earth's volume. Includes the asthenosphere, a plastic layer aiding plate motion.",
    },
    {
      name: "Crust",
      color: "#87CEFA",
      radius: 200,
      description: "Basalt (oceanic) and granite (continental) rocks. Thickness varies from 5 to 70 km.",
    },
  ];

  const drawLayers = (ctx: CanvasRenderingContext2D) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    layers
      .slice()
      .reverse()
      .forEach((layer) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, layer.radius, 0, 2 * Math.PI);
        ctx.fillStyle = layer.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let detectedLayer = null;

    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      const distance = Math.sqrt(
        (mouseX - centerX) ** 2 + (mouseY - centerY) ** 2
      );

      if (distance <= layer.radius && (i === 0 || distance > layers[i - 1].radius)) {
        detectedLayer = layer;
        break;
      }
    }

    if (detectedLayer) {
      setHoveredLayer(detectedLayer);
    } else {
      setHoveredLayer(null);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawLayers(ctx);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow text-center max-w-4xl mx-auto">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className=" border-gray-300 rounded mx-auto mb-4"
        onMouseMove={handleMouseMove}
      />
      <div className="p-4 bg-gray-100 rounded-lg">
        {hoveredLayer ? (
          <>
            <h3 className="text-lg font-semibold">{hoveredLayer.name}</h3>
            <p>{hoveredLayer.description}</p>
          </>
        ) : (
          <p>Hover over a layer to see details.</p>
        )}
      </div>
    </div>
  );
};

export default EarthLayers;