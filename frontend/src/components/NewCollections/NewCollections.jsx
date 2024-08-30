import React, { useEffect, useState } from 'react'
import "./NewCollections.css"
import Item from '../item/Item'


export default function NewCollections() {

  const [new_collection, setnew_collection] = useState([]);

  useEffect(() => {
    fetch("https://fullstack-ecommerce-app-gw43.onrender.com/newcollections")
    .then((res)=>res.json())
    .then((data)=>setnew_collection(data));
  }, [])
  

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}></Item>
        })}
      </div>
    </div>
  )
}
