import React from "react";
import { products } from "../../data/data";
import Product from "./Product/Product";
import "./styles/style.css";
function Main() {
  return (
    <div className="mainDiv">
      <hr className="hrh" />
      <div>
        <p className="title-main">Popular Wordpress Plugins</p>
        <div className="flex">
          {products.map((product, index) => (
            <Product
              key={index}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
      <hr className="hrf" />
    </div>
  );
}

export default Main;
