import React, { useRef, useState ,useEffect} from "react";
import Loader from "../layout/loader/Loader";
import { NavLink ,useHistory} from "react-router-dom";
import "./LoginSignUp.css";
import profile from "../static/home1.webp";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login } from "../../thunk/actions/userAction";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  // const history = useHistory(); 
  // for login
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  // for register
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user; // Destructure properties of the user object

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/logo192.png");


  const switcherTab = useRef(null);
  const registerTab = useRef(null);
  const loginTab = useRef(null);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword))
    console.log("loginSubmit");
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myFrom = new FormData();
    myFrom.set("name", name);
    myFrom.set("email", email);
    myFrom.set("password", password);
    myFrom.set("avatar", avatar);
    console.log("registerSubmit");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const { loading,error ,isAuthenticated} = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // if (isAuthenticated) {
    //   history.push("/account");
    // }
  }, [dispatch, error, alert, isAuthenticated]);


  return (
    <>{loading ?   <Loader />: <div className="LoginSignUpContainer ">
    <div className="LoginSignUpBox rounded-2">
      <div>
        <div className="Login_SignUp_Toggle">
          <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
          <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
        </div>
        <button className='border_bottom' ref={switcherTab}></button>
      </div>
      <form className="loginForms" ref={loginTab} onSubmit={loginSubmit}>
        <div className="loginEmail">
          <i class="fa fa-envelope" aria-hidden="true"></i>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            name="email"
            required
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div className="loginPassword">
          <i class="fa fa-key" aria-hidden="true"></i>
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            name="password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <NavLink
          to="/password/forgot"
          className="text-black border-0 py-2  rounded text-sm"
          ref={switchTabs}
        >
          Forgot Password ?
        </NavLink>
        <input type="submit" value="Login" className="loginBtn" />
      </form>
      <form
        className="signUpForms"
        ref={registerTab}
        encType="multipart/form-data"
        onSubmit={registerSubmit}
      >
        <div className="signUpName">
        <i class="fa fa-user" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Name"
            value={name}
            name="name"
            onChange={registerDataChange}
          />
        </div>

        <div className="signUpEmail">
          <i class="fa fa-envelope" aria-hidden="true"></i>
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={registerDataChange}
          />
        </div>
        <div className="signUpPassword">
          <i class="fa fa-key" aria-hidden="true"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={registerDataChange}
          />
        </div>
        <div id="registerImage">
          <img src={profile} alt="error" />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="ms-3"
            onChange={registerDataChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="signUpBtn"
          disabled={loading ? true : false}
        />
      </form>
    </div>
  </div>}
    </>
  );
};
export default LoginSignUp;