import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [msg, setmsg] = useState("");
  const history = useHistory();

  function LoginCheck(e) {
    e.preventDefault();
    let data = {
      email: email,
      password: pass,
    };

    axios
      .post("http://localhost:5000/login", data)
      .then((resp) => {
        if (resp.data === "1") history.push("/posts");
        else if (resp.data === "0") setmsg("Invalid credentials");
        else setmsg("No user Found! Click on Register");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <h2 className="m-5 text-center">Login into MERN Project</h2>
      <form onSubmit={(e) => LoginCheck(e)} className="col-md-5 mx-auto ">
        <h5 className="p-3 text-center text-white">{msg}</h5>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            value={email}
            class="form-control"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            value={pass}
            className="form-control"
            onChange={(e) => {
              setpass(e.target.value);
            }}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mb-5">
          Login
        </button>
      </form>
      <Link
        to="/register"
        style={{ textDecoration: "none", color: "#000" }}
        className="text-center mt-5"
      >
        <h5>
          <span>👉</span>Not a Member? Register Here<span>👈</span>
        </h5>
      </Link>
    </div>
  );
}

export default Login;
