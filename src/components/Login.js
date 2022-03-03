import React from "react";

const Login = ({ hideLogin }) => {
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
              className="input"
              type="email"
              placeholder="e.g. alex@example.com"
            />
          </div>
        </div>

        <div className="field p-3">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="********" />
          </div>
        </div>

        <button className="button is-primary mt-3 p-3">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
