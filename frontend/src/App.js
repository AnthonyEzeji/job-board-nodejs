import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Apply from './pages/Apply';
import Home from './pages/Home';
import Login from './pages/Login';
import SavedJobs from './pages/SavedJobs';
import Register from './pages/Register';

function App() {
  return (
    
     <div className="App">
       
      <BrowserRouter>
   
      <Routes>
        <Route exact path='/job/:jobId/:title' element={<Apply/>}></Route>
        <Route exact path='/saved-jobs/:email' element={<SavedJobs/>}></Route>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/register' element={<Register/>}></Route>
        <Route exact path='/:skill/:country/:remote/:language' element={<Home/>}></Route>
        
      </Routes>
      </BrowserRouter>
      </div>
    
   
  );
}

export default App;
