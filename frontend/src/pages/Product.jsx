import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../components/Breadcrums/Breadcrum.jsx';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay.jsx';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox.jsx';
import RelatedProduct from '../components/RelatedProducts/RelatedProduct.jsx';

export default function Product() {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  
  const product = all_product?.find((e) => e.id === Number(productId));

  useEffect(() => {
    console.log(product);
  }, [product]);

  if (!product) {
    return <div>Product not found or loading...</div>; // Fallback if product is not found
  }

  return (
    <div>
      <Breadcrum product={product}></Breadcrum>
      <ProductDisplay product={product}></ProductDisplay>
      <DescriptionBox></DescriptionBox>
      <RelatedProduct product={product}></RelatedProduct>
    </div>
  );
}
