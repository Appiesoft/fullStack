import React, { useEffect, useRef } from "react";
import Products from "../products/Products";
import home1 from '../static/home1.webp'
import './Home.css'
import home4 from '../static/home4.webp'
import MetaData from "../layout/meta/MetaData";

// api import 
import {getProduct} from '../../thunk/actions/productAction'
import { useSelector,useDispatch} from "react-redux"

const product = {
  name: "big home luxury",
  images: [{ url: home1 }],
  price: "$99",
  _id: "abhishelk",
};

const Home = () => {


  const dispatch = useDispatch();

  const scrollRef = useRef(null);

  const handleScrollClick = () => {
    // Scroll to the target element
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
  dispatch(getProduct())
  }, [dispatch])
  
  return (
    <>
    <MetaData title="Real Estate"/>
      <section className="text-gray-600 body-font  ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-start">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Before they sold out
              <br className="hidden lg:inline-block" />
              readymade gluten
            </h1>
            <p className="mb-8 leading-relaxed">
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra
              air plant cold-pressed tacos poke beard tote bag. Heirloom echo
              park mlkshk tote bag selvage hot chicken authentic tumeric
              truffaut hexagon try-hard chambray.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-400 rounded text-lg"  >
          Contact Us
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"  onClick={handleScrollClick}>
              More Details
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={home4}
            />
          </div>
        </div>
      </section>
      <section className="banner"></section>
      <div ref={scrollRef} />
      <Products product={product} />
     
    </>
  );
};

export default Home;


