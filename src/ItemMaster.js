import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const ItemMasterTable = () => {

    const [items, setItems ] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/inventory/itemmasters/')
        .then(response => response.json())
        .then(data =>{
            setItems(data)
        }).catch(err => console.log('Error while fetching item data: ',err))
    },[])

    const handleAccept = (itemID) => {
        console.log(itemID)
      }
  
    const handleReject = (itemID) => {
        console.log(itemID)
    }

    return (
        <div>
            <center>
                <h3>Item Master Table</h3>
                <table>
                  <thead>
                      <tr>
                          <th>Item Name</th>
                          <th>Item Code</th>
                          <th>Specification</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {items.map(item => (
                          <tr key={item.item_id}>
                              <td>{item.item_name}</td>
                              <td>{item.item_code}</td>
                              <td>{item.specification}</td>
                              <td>
                                  <button onClick={() => handleAccept(item.item_id)}>Accept</button>
                                  <button onClick={() => handleReject(item.item_id)}>Reject</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
                </table>
            </center>
        </div>
    )
}



const ItemMaster = () => {

    const [ item, setItem ] = useState({
        category:'',
        item_name:'',
        item_code:'',
        specification:'',
        item_file:''
    })

    const [categorys, setCategorys] = useState([])


    useEffect(() => {
        fetch('http://127.0.0.1:8000/inventory/categories/')
        .then(response => response.json())
        .then(data =>{
            setCategorys(data)
        }).catch(err => console.error('Error while retriving the categories: ',err))
    },[])


    const changeHandler = async (e) => {
        if (e.target.name === 'item_file'){
            setItem({...item, [e.target.name]: e.target.files[0]})
        } else{
            setItem({...item, [e.target.name]:e.target.value})
        }
    }

    const submitHandler = async e =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('category',item.category)
        formData.append('item_name',item.item_name)
        formData.append('item_code',item.item_code)
        formData.append('specification',item.specification)
        formData.append('item_file',item.item_file)

        try {
            const response = await fetch('http://127.0.0.1:8000/inventory/itemmasters/', {
                method: 'POST',
                body: formData,
            });
            // const responseData = await response.json();
            // console.log(response.error,responseData)
            if (response.ok) {
                alert('Item Created Successfully!!')
            } else{
                alert('Error occured to create item')
                // alert(response)
            }
        } catch (error) {
            console.error('Error: ', error)
        }
        
    }


    return (
        <div>
            <center>
                <Link to="/">Back to home</Link>
                <h3>Item Master</h3>
                <form onSubmit={submitHandler}>

                    <label>Category</label>
                    <select name="category" onChange={changeHandler}>
                        <option value="">Select Category Type</option>
                        { categorys.map((categoryObj,index) =>(
                            <option key={index} value={categoryObj.category_id}>{categoryObj.category_name}</option>
                        ))}
                    </select><br />

                    <label>Item Name</label>
                    <input type='text' name='item_name' onChange={changeHandler} /><br />

                    <label>Item Code</label>
                    <input type='text' name='item_code' onChange={changeHandler} /><br />

                    <label>Item Specification</label>
                    <input type='text' name='specification' onChange={changeHandler} /><br />

                    <label>Item File</label>
                    <input type='file' name='item_file' onChange={changeHandler} /><br />

                    <input type='submit' value='Save' />

                </form>

                <div>
                    <ItemMasterTable />
                </div>
            </center>
        </div>
    )
}

export default ItemMaster;