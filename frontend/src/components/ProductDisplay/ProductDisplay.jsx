import React, { useContext,useEffect } from 'react'
import "./ProductDisplay.css"
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../context/ShopContext'

export default function ProductDisplay({product}) {
  // console.log(product);
  useEffect(() => {
    console.log("Product details:", product);
  }, [product]);
  
  const { addtoCart } = useContext(ShopContext);
  const url="https://fullstack-ecommerce-app-gw43.onrender.com"

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {product?.image ? (
            <>
              <img src={url+"/images/"+product.image} alt="" />
              <img src={url+"/images/"+product.image} alt="" />
              <img src={url+"/images/"+product.image} alt="" />
              <img src={url+"/images/"+product.image} alt="" />
            </>
          ) : (
            <p>Loading images...</p>
          )}
        </div>
        <div className="productdisplay-img">
          {product?.image ? (
            <img className='productdiplay-main-img' src={url+"/images/"+product.image} alt="" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product?.name || "Loading..."}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>{122}</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product?.old_price || "Loading..."}
          </div>
          <div className="productdisplay-right-price-new">
            ${product?.new_price || "Loading..."}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
        </div>
        <div className='productdisplay-right-size'>
          <h1>select size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
          <button onClick={() => { addtoCart(product?.id) }}>ADD TO CART</button>
          <p className='productdisplay-right-category'><span>Category :</span> {product?.category || "Loading..."}</p>
          <p className='productdisplay-right-category'><span>Tags :</span> Modern , Latest</p>
        </div>
      </div>
    </div>
  );
}
