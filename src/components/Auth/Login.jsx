import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PasswordLockIconSVG } from "../../assets/SVGs/svgAuth";
import { doLogin } from "../../redux/userSlice";
import { HA_postLogin } from "../../services/HA_apiServices";
import "./Auth.scss";

export default function Login() {
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleLogin = async () => {
    console.log("account : ", account, "isAuthenticated: ", isAuthenticated);

    // validate
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid email");
      emailRef.current?.parentElement.classList.add("incorrect");
      return;
    }

    if (!password) {
      toast.error("Must enter password");
      passwordRef.current?.parentElement.classList.add("incorrect");
      return;
    }

    setIsLoading(true);

    // submit api
    let data = await HA_postLogin(email.trim(), password); // remove spaces
    console.log(">>> check res: ", data);
    if (data && data.jwt) {
      dispatch(doLogin(data));
      toast.success("Login successful!");
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(data.detail || "Login failed");
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  const handleInputChange = (event, setState, ref) => {
    setState(event.target.value);
    ref.current?.parentElement.classList.remove("incorrect");
  };

  return (
    <div className="login-register-container">
      <div className="wrapper h-screen space-y-6">
        <h1 className="text-5xl font-black uppercase text-neutral">Login</h1>
        <div className="login-register-form">
          <div className="div-to-label">
            <label htmlFor="email-input">
              <span>@</span>
            </label>
            <input
              type="email"
              name="email"
              id="email-input"
              placeholder="Email"
              value={email}
              ref={emailRef}
              onChange={(event) => handleInputChange(event, setEmail, emailRef)}
            />
          </div>
          <div className="div-to-label relative">
            <label htmlFor="password-input">
              <PasswordLockIconSVG />
            </label>
            <input
              name="password"
              id="password-input"
              placeholder="Password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              ref={passwordRef}
              onChange={(event) =>
                handleInputChange(event, setPassword, passwordRef)
              }
              onKeyDown={handleKeyDown}
            />
            {isShowPassword ? (
              <span
                className="icons-eye"
                onClick={() => setIsShowPassword(false)}
              >
                <i className="fa-solid fa-eye text-black"></i>
              </span>
            ) : (
              <span
                className="icons-eye"
                onClick={() => setIsShowPassword(true)}
              >
                <i className="fa-regular fa-eye-slash text-black"></i>
              </span>
            )}
          </div>
        </div>
        <button
          className="btn btn-primary btn-wide"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading && <i className="fa-solid fa-spinner loader-icon"></i>}
          <span>Login</span>
        </button>
        <p
          className="btn btn-ghost link link-primary btn-wide"
          onClick={() => navigate("/register")}
        >
          New here? Register an account
        </p>
        <button
          className="btn btn-secondary btn-wide"
          onClick={() => navigate("/")}
        >
          &#60;&#60; Back to Home page
        </button>
      </div>
    </div>
  );
}
