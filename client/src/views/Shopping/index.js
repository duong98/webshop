import React, { useEffect, useState } from "react";
import ProductCard from "views/Shopping/ProductCard";
import * as productServices from "services/product.services";

export default function ShoppingScreen() {
  const products = useProductData();
  return (
    <div className="flex flex-wrap justify-around p-10">
      {products.map((product, index) => (
        <ProductCard key={`index-${index}`} {...product} />
      ))}
    </div>
  );
}

function useProductData() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let mouted = true;
    productServices.getAll().then(data => mouted && setProducts(data));
    return () => (mouted = false);
  }, []);
  return products;
}
