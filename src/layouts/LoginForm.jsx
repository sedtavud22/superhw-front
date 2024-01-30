import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const { setUser } = useAuth();

  const [input, setInput] = useState({
    code: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let codeFor = input.code.toLowerCase().startsWith("t")
        ? "tCode"
        : "sCode";
      const data = {
        [codeFor]: input.code,
        password: input.password,
      };
      const result = await axios.post("http://localhost:8888/auth/login", data);
      console.log(result);
      localStorage.setItem("token", result.data.token);
      const result2 = await axios.get("http://localhost:8888/auth/me", {
        headers: { Authorization: `Bearer ${result.data.token}` },
      });
      setUser(result2.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="py-6">
            Lorem ipsum dolor sit amet abaanbharhakhariewejfweiojfwae
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your code</span>
              </label>
              <input
                type="text"
                name="code"
                value={input.code}
                placeholder="code"
                className="input input-bordered"
                pattern="^[st]\d{3}$"
                autoComplete="off"
                required
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
