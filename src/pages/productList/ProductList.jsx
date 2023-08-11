import React, { useEffect, useState } from "react";
import SectionHeader from "../../components/sectionHeader/SectionHeader";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.js")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  console.log(products);
  return (
    <div>
      <SectionHeader title={"Product list"}></SectionHeader>
    </div>
  );
};

export default ProductList;
