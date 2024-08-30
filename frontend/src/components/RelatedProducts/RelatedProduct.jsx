import React, { useEffect,useState } from 'react'
import "./RelatedProduct.css"
import data_product from "../Assets/data"
import Item from "../item/Item.jsx"

export default function RelatedProduct({ product }) {

  const [relatedproducts, setrelatedproducts] = useState([])

  useEffect(() => {
    const category = product.category;
    fetch("http://localhost:6004/relatedproducts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({category:category})
    }).then((res)=>res.json())
    .then((data)=>setrelatedproducts(data))
  }, [])


  useEffect(()=>{
    console.log(relatedproducts)
  },[relatedproducts])

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {
          relatedproducts.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}></Item>
          })
        }
      </div>
    </div>
  )
}
