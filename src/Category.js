import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CategoryTable = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/inventory/categories/')
        .then(response => response.json())
        .then(data =>{
            setCategories(data);
        })
        .catch(err => console.error('Error while fetching categories: ', err))
    },[])

    const handleAccept = (categoryID) =>{
        console.log(categoryID)
    }
    const handleReject = (categoryID) =>{
        console.log(categoryID)
    }


    return (
        <div>
            <center>
                <h3>CategoryTable</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Category Type</th>
                            <th>Category Owners</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.category_id}>
                                <td>{category.category_name}</td>
                                <td>{category.category_type}</td>
                                <td>{category.category_owner}</td>
                                <td>
                                    <button onClick={() => handleAccept(category.category_id)}>Accept</button>
                                    <button onClick={() => handleReject(category.category_id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    )
}


const Category = () => {

  const [category, setCategory] = useState({
    category_name:'',
    category_type:'',
    category_owner:[]
  })

  const [categoryTypes, setcategoryTypes] = useState([])
  const [users, setUsers] = useState([])



  useEffect(() => {
    const categorytypes = ['Product','Service'];
    setcategoryTypes(categorytypes)
  },[])


  // to fetch the Users from users API
  useEffect(() =>{
    fetch('http://127.0.0.1:8000/inventory/users_all/')
    .then(response => response.json())
    .then(data => {
        setUsers(data);
    }).catch(err => console.error('Error while retriving the data: ',err))
  },[])


  const changeHandler = async (e) =>{
    if (e.target.name === 'category_owner'){
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value))
      setCategory({...category, [e.target.name]: selectedOptions})
    } else {
      setCategory({...category, [e.target.name]:e.target.value});
    }
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    console.table(category)
    fetch('http://127.0.0.1:8000/inventory/categories/',
    {
      method:'POST',
      body: JSON.stringify(category),
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      }
    }).then(res => {
      if(res.ok){
        alert('Category Created Successfully!!')
        setCategory({
          category_name:'',
          category_type:'',
          category_owner:[]
        })
      }else {
        throw new Error('Network response was not ok')
      }
    }).catch(err => console.log(err))

  }


  return (
    <div>
      <center>
        <Link to="/">Back to home</Link>
        <h3>Category Master</h3><br />
        <form onSubmit={submitHandler}>
          <label>Category Name</label>
          <input type='text' name="category_name" onChange={changeHandler} /> <br /><br />

          <label>Category Type</label>
          <select name="category_type" onChange={changeHandler}>
            <option value="">Select Category Type</option>
            { categoryTypes.map((type,index) =>(
                <option key={index} value={type}>{type}</option>
            ))}
          </select><br /><br />

          <label>Category Owner</label>
          <select name="category_owner" onChange={changeHandler} multiple>
            <option value="">Select Category Owner</option>
            { users.map((user,index) =>(
                <option key={index} value={user.id}>{user.username}</option>
            ))}
          </select><br /><br />
          
          <input type='submit' value='Save' />
        </form>

        <div>
          <center>
            <CategoryTable />
          </center>
        </div>
      </center>
    </div>
  )
}


export default Category;