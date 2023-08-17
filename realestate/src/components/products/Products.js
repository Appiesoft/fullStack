import React from "react";
import { NavLink } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Products.css";

const Products = ({ product }) => {
  const Options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth > 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };
  return (
    <div>
      <NavLink to={`/product/${product._id}`}>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <NavLink className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt={product.name}
                    className="object-cover object-center w-full h-full block"
                    src={product?.images[0]?.url}
                  />
                </NavLink>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {" "}
                    {product.name}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.category}
                  </h2>
                  <h2 className="text-gray-900 title-font text-lg font-medium flex">
                    <ReactStars {...Options} />{" "}
                    <span className="ms-3">{product.numOfReview} Review</span>
                  </h2>
                  <p className="mt-1"> {product.price}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </NavLink>
    </div>
  );
};

export default Products;
