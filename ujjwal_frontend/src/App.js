import './App.css';
import List from './List';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<List />} />
          <Route exact path='/userlist' element={<List />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
