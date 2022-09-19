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
import demo1 from "../../assets/images/demo-1.jpg";

export const SignIn: React.FC = () => {
  const { loading, accessToken, error } = useSelector((s) => s.user);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken !== null) {
      navigate("/");
    }
  }, [accessToken]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(signin({ email, password }));
  };
  return (
    <>
      <Header />
      <div className="grid-container">
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
        <div className={styles.imgEdgeCover}>
          <img className={styles.bgImage} src={demo1} alt="bg_image" />
        </div>
      </div>

      <Footer />
    </>
  );
};
