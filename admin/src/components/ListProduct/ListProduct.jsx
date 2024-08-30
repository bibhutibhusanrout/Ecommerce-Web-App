import React from 'react'
import './ListProduct.css'
import { useState,useEffect } from 'react'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  const [allProducts, setallProducts] = useState([])

  const fetchinfo = async()=>{
    await fetch('https://fullstack-ecommerce-app-gw43.onrender.com/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setallProducts(data)})
  }
  useEffect(() => {
   fetchinfo();
  }, [])
  
  const removeiconhandler = async(id)=>{
    await fetch('https://fullstack-ecommerce-app-gw43.onrender.com/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:id}),
    })
    // console.log("delete");
    console.log(id);
    await fetchinfo();
  }
  const url="https://fullstack-ecommerce-app-gw43.onrender.com"
  
  return (
    <div className='list-product'>
      <h1>All Product Details</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Name</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
       {allProducts.map((product,index)=>{
          return <div key={index} className="listproduct-format-main listproduct-format">
                  <img src={url+"/images/"+product.image} className='listproduct-product-icon' alt="" />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img onClick={()=>{removeiconhandler(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
          </div>
       })}
      </div>
    </div>
  )
}

export default ListProduct
