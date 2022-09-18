import React, { useState } from "react";
import axios from "axios";
import { Header, Footer } from "../../components";
import styles from "./SignIn.module.scss";
import { Button } from "../../components/button/button";
import { signin } from "../../redux/auth/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

export const SignIn: React.FC = () => {
  const { loading, token, error } = useSelector((s) => s.user);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(signin({ email, password }));
      const { data } = await axios.post(`http://localhost:8000/api/signin`, {
        email,
        password,
      });

      if (data.error) {
        console.log(data.error);
      } else {
        window.localStorage.setItem("auth", JSON.stringify(data));
      }
    } catch (err) {}
  };
  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className={styles.form_signin + " w-100 m-auto"}
      >
        {/* <img className="mb-4" src={logo} alt="logo" width={72} /> */}
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="remember-me" /> Remember me
          </label>
        </div>
        <Button text="Sign in" />
      </form>

      <Footer />
    </>
  );
};
