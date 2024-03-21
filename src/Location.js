import React, { useEffect, useState,Suspense } from 'react';
import { Link } from 'react-router-dom';




export const LocationTable = () => {

    const [locations, setLocations] = useState([])

    useEffect(() => {
      fetch('http://127.0.0.1:8000/inventory/locations')
      .then(response => response.json())
      .then(data => {
        setLocations(data)
      }).catch(err => console.log('Error while fetching location data: ', err))
    },[])

    const handleAccept = (locationId) => {
      console.log(locationId)
    }

    const handleReject = (locationId) => {
      console.log(locationId)
    }

    
    return (
      <div>
        <center>
        <h3>Location Table</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Location Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map(location => (
                            <tr key={location.location_id}>
                                <td>{location.location_name}</td>
                                
                                <td>
                                    <button onClick={() => handleAccept(location.location_id)}>Accept</button>
                                    <button onClick={() => handleReject(location.location_id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

        </center>
      </div>
    )
}




const Location = () => {

  const [location, setLocation] = useState({
    location_name:''
  })

  const changeHandler = (e) =>{
    setLocation({...location, [e.target.name]:e.target.value});
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    fetch('http://127.0.0.1:8000/inventory/locations/',
    {
      method:'POST',
      body: JSON.stringify(location),
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      }
    }
    ).then(res => res.json())
    .then(data => {
      alert('Location Created Successfully!!')
      setLocation({ location_name: ''});
    })
    .catch(err => console.log('Error while posting location master component: ',err))
  }

  return (
    <div>
      <center>
      <Link to="/">Back to home</Link>
      <h3>Location Master</h3>
        <form onSubmit={submitHandler}>
          <label>Location Name</label>
          <input type='text' name="location_name" onChange={changeHandler} /> <br />
          <input type='submit' value='Save' />
        </form>

        <div>
          <LocationTable />
        </div>
      </center>
    </div>
  )
}

export default Location;