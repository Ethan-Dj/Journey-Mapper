import './App.css';
import UploadNew from './components/UploadNew';
import UploadNewJourney from './components/UploadNewJourney';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home';

function App() {

  return(
    <>
    <Routes>
      <Route path="/uploadnew" element={<UploadNewJourney/>} />
      <Route path="/upload" element={<UploadNew/>} />
      <Route path="/" element={<Home/>} />
    </Routes>
    </>
  )
}

export default App;
