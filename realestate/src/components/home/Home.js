import React, { useEffect, useRef } from "react";
import Products from "../products/Products";
import home1 from "../static/home1.webp";
import "./Home.css";
import home4 from "../static/home4.webp";
import MetaData from "../layout/meta/MetaData";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
// api import
import { getProduct } from "../../thunk/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const scrollRef = useRef(null);
  const handleScrollClick = () => {
    // Scroll to the target element
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Real Estate" />
          <Header />
          <section className="text-gray-600 body-font  bgImage h-screen">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-center md:text-center mb-16 md:mb-0 items-center text-start">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  Before they sold out
                  {/* <br className="hidden lg:inline-block" /> */}
                  readymade gluten
                </h1>
                <p className="mb-8 leading-relaxed text-center text-lg">
                  Copper mug try-hard pitchfork pour-over freegan heirloom
                  neutra air plant cold-pressed tacos poke beard tote bag.
                  Heirloom echo park mlkshk tote bag selvage hot chicken
                  authentic tumeric truffaut hexagon try-hard chambray.
                </p>
                <div className="flex justify-center">
                  <button className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-blue-400 rounded text-lg">
                    Contact Us
                  </button>
                  <button
                    className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                    onClick={handleScrollClick}
                  >
                    More Details
                  </button>
                </div>
              </div>
              {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src={home4}
                />
              </div> */}
            </div>
          </section>
          {/* <section className="banner"></section> */}
          <div ref={scrollRef} />
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className=" flex justify-content-evenly flex-wrap -m-4">
                  {products &&
                    products.map((product) =>
                    <>
                    <div className="lg:w-1/4 md:w-1/2 p-4 w-full ">
                    <Products product={product}
                     />
                     </div>
                    </>
                   )}
              </div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
