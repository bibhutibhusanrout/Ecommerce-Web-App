import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setimage] = useState(false);
  const [productdetails, setproductdetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "",
    image: "",
  });

  const producthandler = (e) => {
    setproductdetails({ ...productdetails, [e.target.name]: e.target.value });
  };
  const imagehandler = (e) => {
    setimage(e.target.files[0]);
  };

  const addbuttonhandler = async () => {
    console.log(productdetails);
    let responseData;
    let product = productdetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("https://fullstack-ecommerce-app-gw43.onrender.com/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);

      await fetch("https://fullstack-ecommerce-app-gw43.onrender.com/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
          setproductdetails({
            name: "",
            old_price: "",
            new_price: "",
            category: "",
          });
          setimage(false);
        });
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productdetails.name}
          onChange={producthandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="add-product-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productdetails.old_price}
            onChange={producthandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productdetails.new_price}
            onChange={producthandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productdetails.category}
          onChange={producthandler}
          name="category"
          className="add-product-selector"
        >
          <option value="select">Select</option>
          <option value="men">MEN</option>
          <option value="women">WOMEN</option>
          <option value="kid">KID</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imagehandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          addbuttonhandler();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
