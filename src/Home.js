import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
        <center>
            <Link to="/category">Category Master</Link><br />
            <Link to="/location">Location Master</Link><br />
            <Link to="/itemmaster">Item Master</Link><br />
            <Link to="/inventory">Inventory Master</Link><br />
        </center>
    </div>
  )
}

export default Home