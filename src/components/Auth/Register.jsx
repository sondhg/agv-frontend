import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  PasswordLockIconSVG,
  UsernameIconSVG,
} from "../../assets/SVGs/svgAuth";
import { HA_postRegister } from "../../services/HA_apiServices";
import "./Auth.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleRegister = async () => {
    // Validate email
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      emailRef.current?.parentElement.classList.add("incorrect");
      return;
    }

    // Validate password
    if (password.length < 8) {
      toast.error("Password must have at least 8 characters");
      passwordRef.current?.parentElement.classList.add("incorrect");
      return;
    }

    // Validate repeat password
    if (password !== repeatPassword) {
      passwordRef.current?.parentElement.classList.add("incorrect");
      repeatPasswordRef.current?.parentElement.classList.add("incorrect");
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Call API for registration
    let res = await HA_postRegister(email, password, name);

    if (res && res.email[0] !== "user with this email already exists.") {
      toast.success("Register successfully");
      setIsLoading(false);
      navigate("/login");
    } else if (res && res.email[0] === "user with this email already exists.") {
      toast.error(res.email[0]);
      setIsLoading(false);
    }
  };

  const handleInputChange = (event, setState, ref) => {
    setState(event.target.value);
    ref.current?.parentElement.classList.remove("incorrect");
  };

  const handleKeyDown = (event) => {
    if (event && event.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="login-register-container">
      <div className="wrapper h-screen space-y-6">
        <h1 className="text-5xl font-black uppercase text-neutral">Register</h1>
        <div className="login-register-form">
          <div className="div-to-label">
            <label htmlFor="username-input">
              <UsernameIconSVG />
            </label>
            <input
              type="text"
              name="username"
              id="username-input"
              placeholder="Username"
              value={name}
              onChange={(event) => handleInputChange(event, setName, null)}
            />
          </div>
          <div className="form-group div-to-label">
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
          <div className="div-to-label">
            <label htmlFor="repeat-password-input">
              <PasswordLockIconSVG />
            </label>
            <input
              type="password"
              name="repeat-password"
              id="repeat-password-input"
              placeholder="Repeat Password"
              value={repeatPassword}
              ref={repeatPasswordRef}
              onChange={(event) =>
                handleInputChange(event, setRepeatPassword, repeatPasswordRef)
              }
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <button onClick={handleRegister} disabled={isLoading}>
          <div className="btn btn-primary btn-wide">
            {isLoading && <i className="fa-solid fa-spinner loader-icon"></i>}
            <span>Register</span>
          </div>
        </button>
        <p
          className="btn btn-ghost link link-primary btn-wide"
          onClick={() => navigate("/login")}
        >
          Already had an account? Login
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
