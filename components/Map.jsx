import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getCenter } from "geolib"; // get and calculate and data related to distance

const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [sameItemClick, setSameItemClick] = useState(false);
  console.log(selectedLocation);
  //Transform the searchResults into an array of objects with latitude and longitude
  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));

  //Get the center of the coordinates
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 10,
    width: "100%",
    height: "100%",
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/jimmyverson1/cl15egwtw000314nxif5nhkoc"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onMove={(event) => setViewport(event.viewState)}
      onDblClick={() => setSelectedLocation({})}
    >
      {searchResults.map((result, i) => (
        <div key={i}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetTop={-10}
            offsetLeft={-20}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              🏠
            </p>
          </Marker>

          {selectedLocation.long === result.long && (
            <Popup
              closeOnClick={false}
              closeButton={false}
              latitude={result.lat}
              longitude={result.long}
              anchor="top"
            >
              {result.title}
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
