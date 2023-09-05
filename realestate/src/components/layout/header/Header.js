import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <>
<header className=" body-font text-white header-banner position-relative">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
    <NavLink className="flex title-font font-medium items-center text-gray-900  md:mb-0 ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-white-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl text-white">Real Estate</span>
    </NavLink>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-xl justify-center">
      <NavLink to="/" className="mr-5 hover:text-gray-900">Home</NavLink>
      <NavLink className="mr-5 hover:text-gray-900">About Us</NavLink>
      <NavLink to='/products'className="mr-5 hover:text-gray-900">Product</NavLink>
      <NavLink className="mr-5 hover:text-gray-900">Contact Us</NavLink>
      
    </nav>
    <NavLink to="/search" >
    <span className="inline-flex items-center border-0 py-1 px-3  text-xl  md:mt-0 text-gray-700">Search<i className="ms-3 fa fa-search" aria-hidden="true"></i>
    </span></NavLink>
  </div>
</header>
    </>
  )
}

export default Header
