import './App.css';
import UploadNew from './components/UploadNew';
import UploadNewJourney from './components/UploadNewJourney';
import {Route, Routes} from 'react-router-dom'

function App() {

  return(
    <>
    <Routes>
      <Route path="/" element={<UploadNewJourney/>} />
    </Routes>
    </>
  )
}

export default App;
