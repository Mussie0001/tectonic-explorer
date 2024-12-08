import React, { useState } from "react";
import Map from "./components/Map";
import EducationalSidebar from "./components/EducationalSidebar";
import WegenerAnimation from "./components/WegenerAnimation";
import CrossSection from "./components/CrossSection";
import EarthLayers from "./components/EarthLayers";
import InformationTabs from "./components/InformationTabs";

const App: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [showAnimation, setShowAnimation] = useState(true);

  const renderContent = () => {
    if (activeTab === "details") {
      if (!selectedFeature) {
        return (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">Click on a plate boundary, volcano, or earthquake to see details here.</p>
          </div>
        );
      }
      switch (selectedFeature.type) {
        case "plate":
          return (
            <>
              <div className="bg-blue-100 border border-blue-400 p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Plate Information</h2>
                <ul className="space-y-1 text-blue-900">
                  <li><strong>Name:</strong> {selectedFeature.Name}</li>
                  <li><strong>Plate A:</strong> {selectedFeature.PlateA}</li>
                  <li><strong>Plate B:</strong> {selectedFeature.PlateB}</li>
                  <li><strong>Type:</strong> {selectedFeature.Type || "Unknown"}</li>
                </ul>
              </div>
              <CrossSection type={selectedFeature.Type || "Unknown"} />
            </>
          );
        case "volcano":
          return (
            <div className="bg-red-100 border border-red-400 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-red-700 mb-2">Volcano Information</h2>
              <ul className="space-y-1 text-red-900">
                <li><strong>Name:</strong> {selectedFeature.Name}</li>
                <li><strong>Type:</strong> {selectedFeature.Type}</li>
              </ul>
            </div>
          );
        case "earthquake":
          return (
            <div className="bg-orange-100 border border-orange-400 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-orange-700 mb-2">Earthquake Information</h2>
              <ul className="space-y-1 text-orange-900">
                <li><strong>Magnitude:</strong> {selectedFeature.Magnitude}</li>
                <li><strong>Depth:</strong> {selectedFeature.Depth} km</li>
              </ul>
            </div>
          );
        default:
          return <p>No information available for the selected feature.</p>;
      }
    }
    return <EducationalSidebar />;
  };

  return (
    <div className="App flex flex-col bg-gray-50">
      {/* Section 1: Map and Feature Details */}
      <section className="flex flex-col items-center bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Explore Plate Tectonics</h2>
        <p className="text-gray-600 text-center max-w-3xl mb-6" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
          Use the map below to explore plate boundaries, volcanoes, and earthquakes. Click on features for detailed information.
        </p>
        <div className="flex h-[85vh] w-full max-w-7xl space-x-4">
          {/* Sidebar */}
            <aside className="w-1/3 bg-gray-100 shadow-lg h-full overflow-y-auto mr-4">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 py-2 rounded shadow transition ${activeTab === "details" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                Feature Details
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`px-4 py-2 rounded shadow transition ${activeTab === "education" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                Educational Content
              </button>
            </div>
            <div>{renderContent()}</div>
          </aside>

          {/* Map */}
          <div className="flex-1 h-full relative shadow-lg rounded-lg">
            <Map setSelectedFeature={setSelectedFeature} />
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Section 2: Wegener Animation */}
      <section className="p-8 bg-orange-100 shadow-inner">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Wegener's Earth History</h2>
          <p className="text-gray-600 text-center max-w-3xl mb-6" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
            Learn about the movement of tectonic plates over time, starting from the supercontinent Pangaea to present-day configurations.
          </p>
          <button
            onClick={() => setShowAnimation((prev) => !prev)}
            className="mb-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            {showAnimation ? "Hide Wegener Animation" : "Show Wegener Animation"}
          </button>
          {showAnimation && <WegenerAnimation />}
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Section 3: Earth's Layers */}
      <section className="p-8 bg-gray-100 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Earth's Layers</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-6" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
            Explore the Earth's internal structure, from the rigid crust to the molten core, and learn how each layer contributes to plate tectonics.
          </p>
        </div>
        <EarthLayers />
      </section>
      {/* Information Tabs Section */}
      <section className="p-8 bg-orange-100 shadow-inner">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>More Information</h2>
        </div>
        <InformationTabs />
      </section>
    </div>
  );
};

export default App;