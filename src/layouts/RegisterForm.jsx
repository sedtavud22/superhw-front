import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [input, setInput] = useState({
    sCode: "",
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInput = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        "http://localhost:8888/auth/register",
        input
      );
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Register</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student Code</span>
              </label>
              <input
                type="text"
                name="sCode"
                value={input.sCode}
                placeholder="code"
                className="input input-bordered"
                autoComplete="off"
                required
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="firstname"
                value={input.firstname}
                placeholder="firstname"
                className="input input-bordered"
                autoComplete="off"
                required
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                placeholder="email"
                className="input input-bordered"
                autoComplete="off"
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={input.password}
                placeholder="password"
                className="input input-bordered"
                required
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={input.confirmPassword}
                placeholder="confirm password"
                className="input input-bordered"
                required
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
