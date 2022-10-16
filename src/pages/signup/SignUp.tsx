import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header, Footer } from "../../components";
import styles from "./SignUp.module.scss";
import { apiURL } from "../../config";

export const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiURL}/signup`, {
        name: `${firstName.trim()} ${lastName.trim()}`,
        email,
        password,
      });

      console.log(data);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Information</h4>
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="form-control"
                id="firstName"
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="form-control"
                id="lastName"
                required
              />
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="email"
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid Password address for shipping updates.
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="address2" className="form-label">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                placeholder="Apartment or suite"
              />
            </div>
          </div>
          <hr className="my-4" />
          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Submit
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};
