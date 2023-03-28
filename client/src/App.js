import './App.css';
import UploadNew from './components/UploadNew';
import {Route, Routes} from 'react-router-dom'

function App() {

  return(
    <>
    <Routes>
      <Route path="/" element={<UploadNew/>} />
    </Routes>
    </>
  )
}

export default App;
