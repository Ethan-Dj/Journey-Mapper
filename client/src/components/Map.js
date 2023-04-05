import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import { useEffect , useState } from "react";
mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW4xMjEiLCJhIjoiY2wzYmV2bW50MGQwbTNpb2lxdm56cGdpNyJ9.-wLLlz-sFhNPiXCyVCQ6kg';

const Map1 = (props) => {

  const [mount, didMount] = useState(false)

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "27vh",
    latitude: 0,
    longitude: 0,
    zoom: 15
  });
  
  useEffect(() => {
    if (props.fetchedData && props.fetchedData.length > 0) {
      console.log("this is data that was sent", props.fetchedData)
      console.log("this is track", props.track)
      setViewport(prevViewport => ({
        ...prevViewport,
        latitude: props.fetchedData[0].lat,
        longitude: props.fetchedData[0].long,
      }));
    }
  }, [props.fetchedData]);

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
    console.log(props.track)
    if (Array.isArray(props.fetchedData)){
        const lines1 = props.fetchedData.map(item => [item.long, item.lat])
        setLines(lines1)
    }
  },[props])

    const CustomMarker = ({ latitude, longitude, index }) => {
        return (
        <Marker key={index} longitude={longitude} latitude={latitude}>
            <div>
            <span style={{backgroundColor: props.fetchedData.length - index == 0? "#1ec71e": (
                        props.fetchedData.length - index + 1 == props.fetchedData.length == 0? "red" : "#FF6400"), 
                        border: "none", fontSize:"13px"
                        }}>
                <b>{props.fetchedData.length - index + 1}</b>
            </span>
            </div>
        </Marker>
        );
  };

  // const [prevProps, setPrevProps] = useState(0)


  useEffect(()=>{
    if (mount == true){
      changeView()
      console.log("Wpaoskdjfklajsdflkjasdf", props.fetchedData)
      console.log("askjfnaksdjfka:", props.track)
    } else {
      didMount(true)
    }

  }, [props])

  const [mapTest, setMapTest]= useState({})

  const changeView = () => {
    if(Object.keys(mapTest).length !== 0){
      mapTest.flyTo({
      center: [props.fetchedData[props.track[0]].long, props.fetchedData[props.track[0]].lat],
      essential: true,
      duration: 1300,
      zoom:15
      });
    }
  }
  

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={mapboxgl.accessToken}
        onMove={evt => setViewport(evt.viewport)}
        onLoad={(map)=>{
          setMapTest(map.target)
        }}
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
              "line-opacity" : 1
            }}
          />
        </Source>
      </ReactMapGL>
    </>
  )
}

export default Map1;



  // const changeView = (data1, dataMinus) => {
  //   if (true){
  //   for (let i = 0; i < 11; i++) {
  //     setTimeout(() => {
  //       const lat = (((Number(lines[data1][1]) - Number(lines[dataMinus][1]))/10)*i) + Number(lines[dataMinus][1])
  //       const long = (((Number(lines[data1][0]) - Number(lines[dataMinus][0]))/10)*i) + Number(lines[dataMinus][0])
  //       setViewport({
  //         width: "100vw",
  //         height: "27vh",
  //         latitude: lat,
  //         longitude: long,
  //         zoom: 14
  //       });
  //     }, 300 * i / 10);
  //   }} 
  // };
