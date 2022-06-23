import React, { useEffect, useState } from "react";
import "./MyMap.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import { ReactComponent as LocationSVG } from "../../assest/icons/locationIcon.svg";
const MyMap = () => {
  // Set bounds to New York, New York
  var bounds = [
    [-74.04728500751165, 40.68392799015035], // Southwest coordinates
    [-73.91058699000139, 40.87764500765852] // Northeast coordinates
  ];
  const [viewport, setViewport] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    width: "100%",
    height: "100%",
    zoom: 14
  });

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 33.5651,
    longitude: 73.0169,
    width: "100%",
    height: "100%",
    zoom: 20
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCurrentPosition({
          ...currentPosition,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        console.log(currentPosition);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        alert("Error Code = " + error.code + " - " + error.message);
      }
    );

    //   setViewport({...viewport, latitude:position.coords.latitude,longitude:position.coords.longitude})
  }, []);

  const mapStyleList = [
    "mapbox://styles/mapbox/light-v10",
    "mapbox://styles/khattak01/ckin72hib3jwv17uji6qbpy08",
    "mapbox://styles/khattak01/ckin70xzq3k7s17qop4ul5j4k",
    "mapbox://styles/mapbox/satellite-v9",
    "mapbox://styles/mapbox/satellite-streets-v11",
    "mapbox://styles/mapbox/outdoors-v11"
  ];

  let mapStyle = mapStyleList[1];
  return (
    <div className="visualization">
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle}
        mapboxApiAccessToken="pk.eyJ1Ijoia2hhdHRhazAxIiwiYSI6ImNraW4zY3R5bDB6NWUycXBrcWt4ZXBjMDQifQ.ivSEkmuiwjcWf3qZEQv6bg"
        maxBounds={bounds}
        minZoom={6}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker
          latitude={parseFloat(viewport.latitude)}
          longitude={parseFloat(viewport.longitude)}
        >
          <img
            src="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"
            alt="location icon"
          />
          {currentPosition && (
            <Popup
              latitude={parseFloat(viewport.latitude)}
              longitude={parseFloat(viewport.longitude)}
              onClose={() => setCurrentPosition(null)}
            >
              <h3>latitude : {viewport.latitude}</h3>
              <h4>latitude : {viewport.longitude}</h4>
            </Popup>
          )}
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default MyMap;
