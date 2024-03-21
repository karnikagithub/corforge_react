import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Location from './Location';
import Category from './Category';
import ItemMaster from './ItemMaster';
import Inventory from './Inventory'
import CategoryTable from './CategoryTable';
import Home from './Home';

function App() {
  return (
    // <div className="App">
      
    // </div>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/location" element={ <Location />} />
          <Route path="/category" element={ <Category />} />
          <Route path="/categorytable" element={ <CategoryTable />} />
          <Route path="/itemmaster" element={ <ItemMaster />} />
          <Route path="/inventory" element={ <Inventory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
