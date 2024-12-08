import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FeatureCollection } from "geojson";
import plateBoundaryData from "../data/plateBoundaries.json";
import earthquakesData from "../data/earthquakes.json";
import volcanoesData from "../data/volcanoes.json";
import Legend from "./Legend";

const plateBoundaries: FeatureCollection = plateBoundaryData as FeatureCollection;

type MapProps = {
  setSelectedFeature: React.Dispatch<any>;
};

const Map: React.FC<MapProps> = ({ setSelectedFeature }) => {
  //const center: LatLngExpression = [20, 0];
  const mapRef = useRef<L.Map>(null);

  const boundaryStyle = (feature: any) => {
    const type = feature.properties?.Type || "Unknown";
    switch (type.toLowerCase()) {
      case "subduction":
        return { color: "blue", weight: 2, opacity: 0.8 };
      case "divergent":
        return { color: "red", weight: 2, opacity: 0.8 };
      case "transform":
        return { color: "green", weight: 2, opacity: 0.8 };
      default:
        return { color: "gray", weight: 1, opacity: 0.5 };
    }
  };

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const defaultStyle = boundaryStyle(feature);

    if (feature.properties && feature.properties.Name) {
      const { Name, Type, PlateA, PlateB } = feature.properties;

      layer.bindPopup(
        `<strong>${Name}</strong><br>Type: ${Type || "Unknown"}<br>Plates: ${PlateA} - ${PlateB}`
      );

      layer.on("click", () => {
        setSelectedFeature({
          type: "plate",
          Name,
          Type,
          PlateA,
          PlateB,
        });
      });

      layer.on({
        mouseover: (e) => {
          const target = e.target;
          target.setStyle({ color: "yellow", weight: 3, opacity: 1 });
        },
        mouseout: (e) => {
          const target = e.target;
          target.setStyle(defaultStyle);
        },
      });
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      const bounds = new L.LatLngBounds([]);

      // Add plate boundary bounds
      plateBoundaries.features.forEach((feature) => {
        if (feature.geometry.type === "LineString") {
          feature.geometry.coordinates.forEach((coord: number[]) => {
            bounds.extend([coord[1], coord[0]]);
          });
        }
      });

      // Add earthquake bounds
      earthquakesData.forEach((quake) => {
        bounds.extend([quake.lat, quake.lng]);
      });

      // Add volcano bounds
      volcanoesData.forEach((volcano) => {
        bounds.extend([volcano.lat, volcano.lng]);
      });

      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        ref={mapRef}
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          noWrap={true}
        />
        <GeoJSON
          data={plateBoundaries}
          style={boundaryStyle}
          onEachFeature={onEachFeature}
        />
        {/* Render Earthquakes */}
        {earthquakesData.map((quake, index) => (
          <Circle
            key={index}
            center={[quake.lat, quake.lng]}
            radius={quake.magnitude * 10000}
            pathOptions={{ color: "orange", weight: 1, opacity: 0.8 }}
            eventHandlers={{
              click: () => {
                setSelectedFeature({
                  type: "earthquake",
                  Magnitude: quake.magnitude,
                  Depth: quake.depth,
                });
              },
            }}
          >
            <Popup>
              <strong>Earthquake</strong>
              <br />
              Magnitude: {quake.magnitude}
              <br />
              Depth: {quake.depth} km
            </Popup>
          </Circle>
        ))}
        {/* Render Volcanoes */}
        {volcanoesData.map((volcano, index) => (
          <Marker
            key={index}
            position={[volcano.lat, volcano.lng]}
            icon={L.icon({
              iconUrl: "volcano-icon.png",
              iconSize: [25, 25],
            })}
            eventHandlers={{
              click: () => {
                setSelectedFeature({
                  type: "volcano",
                  Name: volcano.name,
                  Type: volcano.type,
                });
              },
            }}
          >
            <Popup>
              <strong>{volcano.name}</strong>
              <br />
              Type: {volcano.type}
            </Popup>
          </Marker>
        ))}
        <Legend />
      </MapContainer>
    </div>
  );
};

export default Map;