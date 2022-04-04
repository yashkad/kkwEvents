import React, { useState } from "react";

const Login = ({ hideLogin, onLogin, handleLogout, isLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="px-6 has-text-left">
      <form onSubmit={(e) => e.preventDefault()} className="box">
        <h1 className="title has-text-black has-text-centered has-text-weight-medium is-family-primary">
          Login
        </h1>
        <hr />

        <div className="field p-3">
          <label className="label">Email</label>
          <div className="control">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              type="email"
              placeholder="e.g. alex@example.com"
            />
          </div>
        </div>

        <div className="field p-3">
          <label className="label">Password</label>
          <div className="control">
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="input"
              type="password"
              placeholder="********"
            />
          </div>
        </div>

        <button
          onClick={() => onLogin(email, pass)}
          className="button is-primary mt-3 p-3"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
