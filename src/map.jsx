import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhc2FpdWIiLCJhIjoiY21oY3hnNWMyMGswMzJpczhmYnpwcnJvdiJ9.jQujRkpXJPv_VMua8SpHtA";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // prevent reinitialization

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [73.7898, 19.9975], // Nashik
      zoom: 11,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([73.7898, 19.9975])
        .addTo(map.current);

      const route = [
        [73.7898, 19.9975],
        [73.795, 20.0],
        [73.8, 20.005],
        [73.805, 20.008],
        [73.81, 20.01],
      ];

      let i = 0;
      function moveMarker() {
        if (i < route.length) {
          marker.setLngLat(route[i]);
          i++;
          setTimeout(moveMarker, 1000);
        }
      }
      moveMarker();
    });
  }, []);

  // ✅ Use inline styles to ensure visibility
  return (
    <div
      ref={mapContainer}
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default Map;
