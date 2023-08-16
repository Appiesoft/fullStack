import React from "react";
import { NavLink } from "react-router-dom";
// import { Rating } from "react-simple-star-rating";
import "./Products.css";
// import axios from "axios";
const Products = ({ product }) => {
    // const [rating, setRating] = useState(null); // State for the rating

    // useEffect(() => {
    
    //   axios.get(`http://localhost:4000/api/v1/reviews/${product._id}`).then((response) => {
    
    //     setRating(response.data.rating);
    //   });
    // }, [product._id]);
  return (
    <div>
      <NavLink to={product._id}>
        <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <NavLink className="block relative h-48 rounded overflow-hidden">
        <img
                alt={product.name}
                className="object-cover object-center w-full h-full block"
                src={product.images[0].url } />
        </NavLink>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1"> {product.name}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
          <p className="mt-1">$16.00</p>
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
