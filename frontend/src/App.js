import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Apply from './pages/Apply';
import Home from './pages/Home';
import Login from './pages/Login';
import SavedJobs from './pages/SavedJobs';

function App() {
  return (
    
     <div className="App">
       
      <BrowserRouter>
   
      <Routes>
        <Route path='/job/:jobId/:title' element={<Apply/>}></Route>
        <Route path='/saved-jobs/:email' element={<SavedJobs/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route exact path='/:skill/:country/:remote/:language' element={<Home/>}></Route>
        <Route path='/:skill/:country/:remote/:language?skip' element={<Home/>}></Route>
      </Routes>
      </BrowserRouter>
      </div>
    
   
  );
}

export default App;
