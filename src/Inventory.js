import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const InventoryTable = () => {

    const [inventorydata, setInventorydata] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/inventory/inventorymasters/')
        .then(res => res.json())
        .then(data => {
            setInventorydata(data)
        }).catch(err => console.log('Error while fetching Inventory data: ', err))
    },[])

    const handleAccept = (inventoryID) => {
        console.log(inventoryID)
      }
  
    const handleReject = (inventoryID) => {
        console.log(inventoryID)
    }

    return (
        <div>
            <center>
                <h3>Inventory Master Table</h3>
                <table>
                  <thead>
                      <tr>
                          <th>Inventory Code</th>
                          <th>Inventory Type</th>
                          <th>Item Type</th>
                          <th>Item Name</th>
                          <th>Batch No.</th>
                          <th>Expiry Date</th>
                          <th>Quantity</th>
                          <th>Quantity Type</th>
                          <th>Location</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {inventorydata.map(inventory => (
                          <tr key={inventory.inventory_stock_id}>
                              <td>{inventory.inventory_code}</td>
                              <td>{inventory.inventory_type}</td>
                              <td>{inventory.item_type}</td>
                              <td>{inventory.item_var.item_name}</td>
                              <td>{inventory.batch_no}</td>
                              <td>{inventory.expiry_date}</td>
                              <td>{inventory.quantity}</td>
                              <td>{inventory.quantity_type}</td>
                              <td>{inventory.location.location_name}</td>
                              <td>
                                  <button onClick={() => handleAccept(inventory.inventory_stock_id)}>Accept</button>
                                  <button onClick={() => handleReject(inventory.inventory_stock_id)}>Reject</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
                </table>
            </center>
        </div>
    )
}



const Inventory = () => {

    const [inventorydata, setInventorydata] = useState({

        inventory_code:'',
        inventory_type:'',
        item_type:'',
        batch_no:'',
        item_var:'',
        quantity:'',
        quantity_type:'',
        location:'',
        expiry_date:'',

    })

    const [ inventoryTypes, setInventoryTypes ] = useState([]);
    const [ itemQuantity, setItemQuantity ] = useState([]);
    const [ itemType, setItemType ] = useState([]);
    const [ locations, setLocations ] = useState([]);
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        const inventorytypes = ['Grn_add','Add_invent','Return','From_loc','To_loc']
        setInventoryTypes(inventorytypes)
    },[])

    useEffect(() => {
        const itemquantity = ['Kg','Lt','Box','One','Strip']
        setItemQuantity(itemquantity)
    },[])

    useEffect(() => {
        const itemtypes = ['Raw','Finished','Made-in']
        setItemType(itemtypes)
    },[])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/inventory/locations/")
        .then(response => response.json())
        .then(data => {
            setLocations(data)
        }).catch(err => console.log('Error while fetching Locations into Inventory component: ',err))
    },[])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/inventory/itemmasters/")
        .then(response => response.json())
        .then(data => {
            setItems(data)
        }).catch(err => console.log('Error while fetching Items into Inventory component: ',err))
    },[])


    const changeHandler = async (e) => {
        setInventorydata({...inventorydata, [e.target.name]:e.target.value})
    }

    const submitHandler = (e) =>{
        console.table(inventorydata)
        e.preventDefault()
        fetch('http://127.0.0.1:8000/inventory/inventorymasters/',
        {
            method:'POST',
            body: JSON.stringify(inventorydata),
            headers:{
                "content-type":"application/json; charset=UTF-8"
            }
        }).then(res => alert('Inventory created successfully!!')).catch(err => console.log('Error while posing the inventory master: ',err))
    }

    return (
        <div>
            <center>
                <Link to="/">Back to home</Link>
                <h3>Inventory Master</h3>
                <form onSubmit={submitHandler}>
                    <label>Inventory Code</label>
                    <input type="text" name='inventory_code' onChange={changeHandler} /><br /><br />

                    <label>Inventory Type</label>
                    <select name='inventory_type' onChange={changeHandler}>
                        <option value=""> Select Inventory Type</option>
                        { inventoryTypes && inventoryTypes.map((type,index) => (
                            <option key={index} value={type}>{type}</option>
                        )) }
                    </select><br /><br />

                    <label>Item type</label>
                    <select name='item_type' onChange={changeHandler}>
                        <option value=""> Select Inventory Type</option>
                        { itemType && itemType.map((type,index) => (
                            <option key={index} value={type}>{type}</option>
                        )) }

                    </select><br /><br />

                    <label>Batch No.</label>
                    <input type="text" name='batch_no' onChange={changeHandler} /><br /><br />

                    <label>Expiry Date</label>
                    <input type="date" name='expiry_date' onChange={changeHandler} /><br /><br />

                    <label>Item Name</label>
                    <select name='item_var' onChange={changeHandler}>
                        <option value="" >Select Item Name</option>
                        { items && items.map((itemObj,index) => (
                            <option value={itemObj.item_id} key={index}>{itemObj.item_name}
                            {itemObj.specification}</option>
                        ))}
                    </select><br /><br />

                    <label>Quantity</label>
                    <input type="number" name='quantity' onChange={changeHandler} /><br /><br />

                    <label>Quantity type</label>
                    <select name='quantity_type' onChange={changeHandler}>
                        <option value="" >Select Quantity Type</option>
                        { itemQuantity && itemQuantity.map((type,index) => (
                            <option value={type} key={index}>{type}</option>
                        ))}
                    </select><br /><br />

                    <label>Location</label>
                    <select name='location' onChange={changeHandler}>
                        <option value="" >Select Location</option>
                        { locations && locations.map((locationObj,index) => (
                            <option value={locationObj.location_id} key={index}>{locationObj.location_name}</option>
                        ))}
                    </select><br /><br />

                    <input type='submit' value='Save' />

                </form>

                <div>
                    <InventoryTable />
                </div>
            </center>
        </div>
    )
}

export default Inventory;