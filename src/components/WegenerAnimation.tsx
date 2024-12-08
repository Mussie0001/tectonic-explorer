import React, { useRef, useEffect, useState } from "react";

const WegenerAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  const frames = [
    { year: "200 million years ago", description: "Pangea, the supercontinent, starts to break apart.", backgroundColor: "#d1e0ff" },
    { year: "180 million years ago", description: "Laurasia and Gondwana begin to separate.", backgroundColor: "#ffebcc" },
    { year: "65 million years ago", description: "Continents drift further into recognizable forms.", backgroundColor: "#ccffcc" },
    { year: "Present Day", description: "Modern continents fully take shape.", backgroundColor: "#ffffff" },
  ];

  const drawFrame = (ctx: CanvasRenderingContext2D, frame: number) => {
    const { year, description, backgroundColor } = frames[frame];

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw Earth (circular ocean)
    const globeCenterX = ctx.canvas.width / 2;
    const globeCenterY = ctx.canvas.height / 2;
    const globeRadius = 150;

    ctx.fillStyle = "#87CEEB"; // Ocean color
    ctx.beginPath();
    ctx.arc(globeCenterX, globeCenterY, globeRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Draw continents
    ctx.fillStyle = "#228B22"; // Land color
    if (frame === 0) {
      // Pangaea (supercontinent)
      ctx.beginPath();
      ctx.moveTo(globeCenterX - 50, globeCenterY - 30);
      ctx.lineTo(globeCenterX + 50, globeCenterY - 30);
      ctx.lineTo(globeCenterX + 20, globeCenterY + 40);
      ctx.lineTo(globeCenterX - 60, globeCenterY + 30);
      ctx.closePath();
      ctx.fill();
    } else if (frame === 1) {
      // Laurasia and Gondwana split
      // Laurasia
      ctx.beginPath();
      ctx.moveTo(globeCenterX - 70, globeCenterY - 50);
      ctx.lineTo(globeCenterX - 20, globeCenterY - 60);
      ctx.lineTo(globeCenterX - 40, globeCenterY - 20);
      ctx.lineTo(globeCenterX - 80, globeCenterY - 10);
      ctx.closePath();
      ctx.fill();

      // Gondwana
      ctx.beginPath();
      ctx.moveTo(globeCenterX + 10, globeCenterY + 30);
      ctx.lineTo(globeCenterX + 60, globeCenterY + 50);
      ctx.lineTo(globeCenterX + 30, globeCenterY + 90);
      ctx.lineTo(globeCenterX - 20, globeCenterY + 70);
      ctx.closePath();
      ctx.fill();
    } else if (frame === 2) {
      // Continents drift further apart
      // North America
      ctx.beginPath();
      ctx.moveTo(globeCenterX - 90, globeCenterY - 70);
      ctx.lineTo(globeCenterX - 50, globeCenterY - 50);
      ctx.lineTo(globeCenterX - 70, globeCenterY - 30);
      ctx.closePath();
      ctx.fill();

      // South America
      ctx.beginPath();
      ctx.moveTo(globeCenterX - 50, globeCenterY + 30);
      ctx.lineTo(globeCenterX - 30, globeCenterY + 60);
      ctx.lineTo(globeCenterX - 60, globeCenterY + 90);
      ctx.lineTo(globeCenterX - 80, globeCenterY + 50);
      ctx.closePath();
      ctx.fill();

      // Africa
      ctx.beginPath();
      ctx.moveTo(globeCenterX + 10, globeCenterY + 10);
      ctx.lineTo(globeCenterX + 50, globeCenterY + 20);
      ctx.lineTo(globeCenterX + 30, globeCenterY + 50);
      ctx.lineTo(globeCenterX - 10, globeCenterY + 40);
      ctx.closePath();
      ctx.fill();

      // Australia
      ctx.beginPath();
      ctx.moveTo(globeCenterX + 90, globeCenterY + 70);
      ctx.lineTo(globeCenterX + 110, globeCenterY + 90);
      ctx.lineTo(globeCenterX + 80, globeCenterY + 100);
      ctx.closePath();
      ctx.fill();

      // Asia
      ctx.beginPath();
      ctx.moveTo(globeCenterX + 50, globeCenterY - 40);
      ctx.lineTo(globeCenterX + 90, globeCenterY - 20);
      ctx.lineTo(globeCenterX + 70, globeCenterY + 10);
      ctx.lineTo(globeCenterX + 30, globeCenterY - 10);
      ctx.closePath();
      ctx.fill();
    } else if (frame === 3) {
      // Modern continents
      // North America
      ctx.beginPath();
      ctx.moveTo(globeCenterX - 110, globeCenterY - 60);
      ctx.lineTo(globeCenterX - 80, globeCenterY - 40);
      ctx.lineTo(globeCenterX - 100, globeCenterY - 20);
      ctx.closePath();
      ctx.fill();

      // South America
      ctx.beginPath();
      ctx.moveTo(globeCenterX - 70, globeCenterY + 40);
      ctx.lineTo(globeCenterX - 50, globeCenterY + 70);
      ctx.lineTo(globeCenterX - 90, globeCenterY + 100);
      ctx.closePath();
      ctx.fill();

      // Africa
      ctx.beginPath();
      ctx.moveTo(globeCenterX + 20, globeCenterY);
      ctx.lineTo(globeCenterX + 60, globeCenterY + 20);
      ctx.lineTo(globeCenterX + 40, globeCenterY + 50);
      ctx.closePath();
      ctx.fill();

      // Asia
      ctx.beginPath();
      ctx.moveTo(globeCenterX + 70, globeCenterY - 50);
      ctx.lineTo(globeCenterX + 120, globeCenterY - 20);
      ctx.lineTo(globeCenterX + 100, globeCenterY + 10);
      ctx.closePath();
      ctx.fill();

      // Australia
      ctx.beginPath();
      ctx.moveTo(globeCenterX + 110, globeCenterY + 60);
      ctx.lineTo(globeCenterX + 140, globeCenterY + 80);
      ctx.lineTo(globeCenterX + 100, globeCenterY + 90);
      ctx.closePath();
      ctx.fill();
    }

    // Add year and description
    ctx.fillStyle = "#000000";
    ctx.font = "18px Arial";
    ctx.fillText(year, 20, 30);

    ctx.font = "14px Arial";
    ctx.fillText(description, 20, 50);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawFrame(ctx, currentFrame);
  }, [currentFrame]);

  const handleNextFrame = () => {
    setCurrentFrame((prev) => (prev + 1) % frames.length);
  };

  const handlePreviousFrame = () => {
    setCurrentFrame((prev) => (prev - 1 + frames.length) % frames.length);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow">
      <canvas ref={canvasRef} width={500} height={400} className="border border-gray-300 rounded mb-4" />
      <div className="flex space-x-4">
        <button
          onClick={handlePreviousFrame}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          onClick={handleNextFrame}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WegenerAnimation;