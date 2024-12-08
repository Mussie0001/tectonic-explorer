import React, { useState } from "react";

const InformationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("plateTectonics");

  const tabs = [
    { id: "plateTectonics", label: "Plate Tectonics" },
    { id: "earthLayers", label: "Earth's Layers" },
    { id: "wegenersTheory", label: "Wegener's Theory" },
    { id: "seismicActivities", label: "Seismic Activities" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "plateTectonics":
        return (
          <div>
            <h3 className="text-xl font-bold mb-2">Plate Tectonics</h3>
            <p className="text-gray-600 mb-4">
              Plate tectonics is a scientific theory that explains how major landforms are created as a result of Earth's subterranean movements. It describes the movement of Earth's lithospheric plates on the semi-fluid asthenosphere.
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Plates move at a rate of a few centimeters per year.</li>
              <li>Interactions between plates cause earthquakes, volcanoes, and mountain formation.</li>
              <li>Key types of plate boundaries: divergent, convergent, and transform.</li>
            </ul>
          </div>
        );
      case "earthLayers":
        return (
          <div>
            <h3 className="text-xl font-bold mb-2">Earth's Layers</h3>
            <p className="text-gray-600 mb-4">
              The Earth is composed of several layers, each with unique properties:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                <strong>Crust:</strong> The outermost layer, composed of basalt (oceanic) and granite (continental).
              </li>
              <li>
                <strong>Mantle:</strong> A silicate-rich layer, constituting about 84% of Earth's volume.
              </li>
              <li>
                <strong>Core:</strong> Divided into the liquid outer core and solid inner core, composed of iron and nickel.
              </li>
            </ul>
          </div>
        );
      case "wegenersTheory":
        return (
          <div>
            <h3 className="text-xl font-bold mb-2">Wegener's Theory</h3>
            <p className="text-gray-600 mb-4">
              Alfred Wegener proposed the theory of continental drift, suggesting that continents were once part of a supercontinent called Pangaea.
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Evidence includes fossil distribution, matching geological formations, and ancient climate patterns.</li>
              <li>Wegener's ideas laid the foundation for modern plate tectonics.</li>
            </ul>
          </div>
        );
      case "seismicActivities":
        return (
          <div>
            <h3 className="text-xl font-bold mb-2">Seismic Activities</h3>
            <p className="text-gray-600 mb-4">
              Seismic activities are caused by the sudden release of energy within Earth's crust, often due to plate movements.
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                <strong>Earthquakes:</strong> Occur along fault lines due to the stress accumulation and release between tectonic plates.
              </li>
              <li>
                <strong>Volcanoes:</strong> Formed by the eruption of magma at hotspots or convergent boundaries.
              </li>
              <li>
                Tools like seismographs help detect and measure seismic activities.</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg shadow-md transition ${
              activeTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow">{renderContent()}</div>
    </div>
  );
};

export default InformationTabs;