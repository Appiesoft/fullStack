import React, { useEffect } from "react";
import MetaData from "../../layout/meta/MetaData";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../layout/loader/Loader";

const ProfileDetails = () => {
const navigate = useNavigate();
    const {user,isAuthenticated,loading} = useSelector(state=>state.user);

    useEffect(() => {
     if (isAuthenticated ===false) {
        navigate('/login')
     }
    
   
    }, [navigate,isAuthenticated])
    
  return (
    <>
    {loading? (<Loader/>):(<>
        <MetaData title={`${user.name}'s Profile`} />
      <section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img class="object-cover object-center rounded" alt="hero"   src={user?.avatar?.url ? user?.avatar?.url : "/profile.png"}/>
      <NavLink to='/me/update'><h5>Edit Profile</h5></NavLink>
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Full Name</h1>
      <p class="mb-8 leading-relaxed">{user.name}</p>    
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Email</h1>
      <p class="mb-8 leading-relaxed">{user.email}</p>    
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Join On</h1>
      <p class="mb-8 leading-relaxed">{String(user.createdAt).substr(0,10)}</p>   
      <NavLink to='/orders'><h5>My Orders</h5></NavLink>
      <NavLink to='/password/update'><h5>Change password</h5></NavLink>
    </div>

  </div>
</section>
    </>
    
    )
};
</>
  )

}

export default ProfileDetails;
