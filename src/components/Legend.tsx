import React from "react";

const Legend: React.FC = () => {
  return (
    <div
      className="absolute top-4 right-4 bg-white p-4 rounded shadow-lg z-[1000]"
      style={{ pointerEvents: "auto" }}
    >
      <h4 className="text-sm font-semibold mb-2">Map Legend</h4>
      <ul className="text-xs space-y-1">
        <li>
          <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span>
          Subduction (Convergent)
        </li>
        <li>
          <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
          Divergent
        </li>
        <li>
          <span className="inline-block w-3 h-3 bg-green-500 mr-2"></span>
          Transform
        </li>
        <li>
          <span className="inline-block w-3 h-3 bg-orange-500 mr-2"></span>
          Earthquake
        </li>
        <li>
            <span className="inline-block w-3 h-3 mr-2">
            <img src="/volcano-icon.png" alt="Volcano" className="w-full h-full" />
            </span>
          Volcano
        </li>
      </ul>
    </div>
  );
};

export default Legend;