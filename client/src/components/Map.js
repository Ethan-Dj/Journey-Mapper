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
    zoom: 14
  });
  
  useEffect(() => {
    if (props.fetchedData && props.fetchedData.length > 0) {
      setViewport(prevViewport => ({
        ...prevViewport,
        latitude: props.fetchedData[0].lat,
        longitude: props.fetchedData[0].long,
      }));
    }
  }, [props.fetchedData]);

  const [mount, didMount] = useState(false)

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

  const [prevProps, setPrevProps] = useState(0)


  useEffect(()=>{
    if (mount == true ) {
      if (lines[props.track.homa] !== undefined) {
      const data1 = props.track.homa
      if (props.track.homa === 0 && prevProps ===0 ){
        setViewport({
          width: "100vw",
          height: "27vh",
          latitude:  Number(lines[0][1]),
          longitude: Number(lines[0][0]),
          zoom: 14
        })
      } else if (props.track.homa === 0 && prevProps === props.fetchedData.length-1){
        setViewport({
          width: "100vw",
          height: "27vh",
          latitude:  Number(lines[0][1]),
          longitude: Number(lines[0][0]),
          zoom: 14
        })
        setPrevProps(props.track.homa)
      }else if (props.track.homa < prevProps){
        changeView(data1)
        setPrevProps(props.track.homa)
      } 
      else if(props.track.homa > prevProps) {
        changeView(data1)
        setPrevProps(props.track.homa)
      }
      
    } 
    } else {
      didMount(true)

    }
  }, [props])

  const [mapTest, setMapTest]= useState({})

  const changeView = (data1, dataMinus) => {
    if(Object.keys(mapTest).length !== 0){
      console.log(mapTest)
      mapTest.flyTo({
      center: [Number(lines[data1][0]),Number(lines[data1][1])],
      essential: true,
      duration: 1000
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
          console.log(map.target)
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
