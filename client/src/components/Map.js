import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import { useEffect , useState } from "react";
mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW4xMjEiLCJhIjoiY2wzYmV2bW50MGQwbTNpb2lxdm56cGdpNyJ9.-wLLlz-sFhNPiXCyVCQ6kg';

const Map1 = (props) => {

   const [viewport, setViewport] = useState({
    width: "100vw",
    height: "27vh",
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });

  useEffect(()=>{
    if (Array.isArray(props.fetchedData)){
       setViewport({
        width: "100vw",
        height: "27vh",
        latitude: props.fetchedData[0].lat,
        longitude: props.fetchedData[0].long,
        zoom: 10,
       },[props])
    }
  },[props])

  const [lines, setLines] = useState([[0,0]])

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

    const CustomMarker = ({ latitude, longitude, index }) => {
        return (
        <Marker key={index} longitude={longitude} latitude={latitude}>
            <div>
            <span style={{backgroundColor: index == props.fetchedData.length? "red": (
                        index == 1? "#1ec71e" : "#FF6400"), 
                        border: "none", fontSize:"13px"
                        }}>
                <b>{index}</b>
            </span>
            </div>
        </Marker>
        );
  };

  const changeView = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const lat = (((Number(lines[1][1]) - Number(lines[0][1]))/15)*i) + Number(lines[0][1])
        const long = (((Number(lines[1][0]) - Number(lines[0][0]))/15)*i) + Number(lines[0][0])
        setViewport({
          width: "100vw",
          height: "27vh",
          latitude: lat,
          longitude: long,
          zoom: 10
        });
      }, 150 * i / 20);
    }
  };

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={mapboxgl.accessToken}
        onMove={evt => setViewport(evt.viewport)}
      >
    {Array.isArray(props.fetchedData) && props.fetchedData.length > 0 && (
        props.fetchedData.map((item, index) => (
            <CustomMarker latitude={item.lat} longitude={item.long} index={props.fetchedData.length - index}
            style={{
                width: "30px", 
                height: "30px", 
                borderRadius: "50%",
                border: "none", 
                transform: "translate(-50%, -50%)",
                }}>
            </CustomMarker>
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
      <button onClick={changeView}>Map moves</button>
    </>
  )
}

export default Map1;



