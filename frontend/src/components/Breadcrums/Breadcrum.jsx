import React from 'react'
import "./Breadcrum.css"
import arrow_icon from "../Assets/breadcrum_arrow.png";

export default function Breadcrum({ product }) {
  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> 
      {product?.category || "Loading..."} <img src={arrow_icon} alt="" /> {product?.name || "Loading..."}
    </div>
  );
}
