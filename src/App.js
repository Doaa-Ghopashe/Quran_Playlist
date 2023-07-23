import './App.css';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/jquery/dist/jquery.min.js";
import Home from './pages/Home';
import Playlist from './pages/Playlist';
import PlayAudio from './pages/PlayAudio';

function App() {
  return (
    <div className="App">
      <div className='Appheader'>
          <div className='col-xl-3 col-lg-3 col-sm-12 p-0'>
            <Sidebar/>
          </div>
          <div className='col-xl-9 col-lg-9 col-sm-12 p-0 App-body'>  
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='playlist/:readername' element={<Playlist/>}/>
              <Route path='playlist/:readername/:surahname' element={<PlayAudio/>}/>
            </Routes>
          </div>
      </div>
    </div>
  );
}

export default App;
