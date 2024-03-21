import React, { useEffect, useState } from 'react'

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

export default CategoryTable;