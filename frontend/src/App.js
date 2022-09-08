import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Apply from './pages/Apply';
import Home from './pages/Home';
function App() {
  return (
    
     <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/job/:jobId/:title' element={<Apply/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/:skill/:country/:remote/:language' element={<Home/>}></Route>
      </Routes>
      </BrowserRouter>
      </div>
    
   
  );
}

export default App;
