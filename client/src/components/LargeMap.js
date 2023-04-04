import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import { useEffect , useState } from "react";
import { useLocation } from 'react-router-dom';
mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW4xMjEiLCJhIjoiY2wzYmV2bW50MGQwbTNpb2lxdm56cGdpNyJ9.-wLLlz-sFhNPiXCyVCQ6kg';

const Map1 = (props) => {
    const location = useLocation()

    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 11
      });

      useEffect(() => {
        if (location.state.fetchedData && location.state.fetchedData.length > 0) {
        let totalLat = 0 
        let totalLong = 0 
        location.state.fetchedData.map(item => {
            totalLat = totalLat + Number(item.lat)
            totalLong = totalLong + Number(item.long)
        })
        setViewport({
            latitude: totalLat/location.state.fetchedData.length,
            longitude: totalLong/location.state.fetchedData.length,
            zoom: 11
        })
    }
      }, [location.state]);


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
    if (Array.isArray(location.state.fetchedData)){
        const lines1 = location.state.fetchedData.map(item => [item.long, item.lat])
        setLines(lines1)

        // Fit markers on map
        const bounds = new mapboxgl.LngLatBounds();
        location.state.fetchedData.forEach(item => {
          bounds.extend([item.long, item.lat]);
        });
        setViewport(viewport => ({
          ...viewport,
          latitude: bounds.getCenter().lat,
          longitude: bounds.getCenter().lng,
          zoom: viewport.zoom,
          transitionDuration: 500
        }));
    }
  },[props])


    const CustomMarker = ({ latitude, longitude, index }) => {
        return (
        <Marker key={index} longitude={longitude} latitude={latitude}>
            <div>
            <span style={{backgroundColor: index == location.state.fetchedData.length? "red": (
                        index == 1? "#1ec71e" : "#FF6400"), 
                        border: "none", fontSize:"13px"
                        }}>
                <b>{index}</b>
            </span>
            </div>
        </Marker>
        );
  };

  return (
    <div style={{height:"100vw", width:"100vw"}}>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={mapboxgl.accessToken}
        onMove={evt => setViewport(evt.viewport)}
      >
    {Array.isArray(location.state.fetchedData) && location.state.fetchedData.length > 0 && (
        location.state.fetchedData.map((item, index) => (
            <CustomMarker latitude={item.lat} longitude={item.long} index={location.state.fetchedData.length - index}
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
    </div>
  )
}

export default Map1;