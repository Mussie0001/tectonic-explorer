import React, { useState } from "react";

const EducationalSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("forces");

  const renderContent = () => {
    switch (activeTab) {
      case "forces":
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold text-blue-600 mb-2">Forces Driving Plate Motion</h2>
            <img src="/forces.png" alt="Forces driving plate motion" className="mb-4 rounded shadow-lg" />
            <p className="text-sm text-gray-700">
              Plate motion is driven by convection currents in the mantle, slab pull at subduction zones, and ridge push
              at mid-ocean ridges. Convection cells circulate molten rock, creating drag forces on the overlying plates.
            </p>
          </div>
        );
      case "asthenosphere":
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold text-green-600 mb-2">Asthenosphere and Lithosphere</h2>
            <img src="/asthenosphere.gif" alt="Asthenosphere and Lithosphere" className="mb-4 rounded shadow-lg" />
            <p className="text-sm text-gray-700">
              The lithosphere is the rigid outer layer of the Earth, floating atop the ductile asthenosphere. This
              softer layer allows tectonic plates to move.
            </p>
          </div>
        );
      case "magnetic":
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold text-purple-600 mb-2">Magnetic Stripes</h2>
            <img src="/magnetic.png" alt="Magnetic Stripes" className="mb-4 rounded shadow-lg" />
            <p className="text-sm text-gray-700">
              Magnetic stripes on the ocean floor provide evidence for seafloor spreading. As molten rock rises and
              solidifies, it records Earth's magnetic field, forming symmetrical patterns on either side of mid-ocean
              ridges.
            </p>
          </div>
        );
      default:
        return <p>Select a topic to learn more.</p>;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setActiveTab("forces")} className="px-4 py-2 bg-blue-500 text-white rounded shadow">
          Forces
        </button>
        <button onClick={() => setActiveTab("asthenosphere")} className="px-4 py-2 bg-green-500 text-white rounded shadow">
          Asthenosphere
        </button>
        <button onClick={() => setActiveTab("magnetic")} className="px-4 py-2 bg-purple-500 text-white rounded shadow">
          Magnetic Stripes
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default EducationalSidebar;