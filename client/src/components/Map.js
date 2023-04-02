import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import { useEffect , useState } from "react";
mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW4xMjEiLCJhIjoiY2wzYmV2bW50MGQwbTNpb2lxdm56cGdpNyJ9.-wLLlz-sFhNPiXCyVCQ6kg';

const Map1 = (props) => {

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "27vh",
    latitude: 32.086978083560936,
    longitude: 34.801720704888070,
    zoom: 10,
  });

  const [lines, setLines] = useState([[0,0]])

  const handleViewportChange = (newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  };

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: lines
    }
  };

  useEffect(()=>{
    if (Array.isArray(props.fetchedData)){
        const lines1 = props.fetchedData.map(item => [item.long, item.lat])
        setLines(lines1)
    }

  },[props])

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={mapboxgl.accessToken}
        onMove={evt => setViewport(evt.viewport)}
      >
        {Array.isArray(props.fetchedData) && props.fetchedData.length > 0 && (
            props.fetchedData.map(item => (
                <Marker latitude={item.lat} longitude={item.long} className=""
                style={{
                    width: "30px", 
                    height: "30px", 
                    borderRadius: "50%",
                    border: "none", 
                    backgroundColor: "orange",
                    transform: "translate(-50%, -50%)",
                    marker: false

                }}>
                </Marker>
            ))
        )}
        <Source id="polylineLayer" type="geojson" data={dataOne}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": "#FF6400",
              "line-width": 8,
              "line-opacity" : 0.7
            }}
          />
        </Source>
      </ReactMapGL>
    </>
  )
}

export default Map1;
