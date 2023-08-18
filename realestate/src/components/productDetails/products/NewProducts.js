import React, { useEffect } from 'react'
import Header from '../../layout/header/Header'
import Footer from '../../layout/footer/Footer'
import MetaData from '../../layout/meta/MetaData'
import Loader from '../../layout/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../../thunk/actions/productAction'
import ProductDetails from '../../productDetails/ProductDetails'

const NewProducts = () => {

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
      
            {products &&
                    products.map((product) =>
                    <>
                    <div className="lg:w-1/4 md:w-1/2 p-4 w-full ">
                    <ProductDetails key={product._id} product={product}
                     />
                     </div>
                    </>
                   )}
      

          <Footer />
        </>
      )}
    </>
  )
}

export default NewProducts
//not working