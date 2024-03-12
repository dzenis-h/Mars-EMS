import { NavLink, useNavigate } from "react-router-dom";
import logo from "/assets/img/logo.png";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { CREATE_USER } from "../const/endpoints";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${baseURL}${CREATE_USER}`, {
        token: credentialResponse?.credential,
      });
      toast.success(res?.data?.message);
      dispatch(login({ token: res?.data?.data?.token }));
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <div className="container">
      <div className="container container__login">
        <div className="login__section">
          <img
            src={logo}
            alt="EMS Mars logo"
            className="login__section__logo"
          />
          <h4>Welcome to Mars EMS! </h4>
          <p className="no-data" style={{ marginBottom: "-.25rem" }}>
            Please sign in with your Google account!
          </p>
          <br />
          <br />
          <GoogleLogin
            className="btn-primary btn-login"
            onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <div className="intro">
            <ul>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/privacy">Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink to="/terms">Terms And Conditions</NavLink>
              </li>
              <li style={{ marginTop: ".6rem" }}>Made by Dzenis H.</li>
              <li>&copy; {new Date().getFullYear()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
