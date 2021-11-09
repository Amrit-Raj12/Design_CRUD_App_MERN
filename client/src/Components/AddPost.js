import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

function AddPost() {
  const [title, settitle] = useState("");
  const [auth, setauth] = useState("");
  const [desc, setdesc] = useState("");
  const [msg, setmsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const blog = {
      title: title,
      desc: desc,
      auth: auth,
    };
    axios
      .post("http://localhost:5000/add-post", blog)
      .then((res) => setmsg(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Navbar />
      <div className="container" mt-5>
        <h2 className="m-5 text-center">Add Design into this website</h2>
        <form className="col-md-6 mx-auto " onSubmit={handleSubmit}>
          <h5 className="p-3 text-center text-black">{msg}</h5>
          <div className="form-group">
            <label> Design Title</label>
            <input
              type="text"
              value={title}
              className="form-control"
              onChange={(e) => {
                settitle(e.target.value);
              }}
              placeholder="Enter Design Title"
              required
            />
          </div>
          <div className="form-group">
            <label>Design Description</label>
            <textarea
              type="text"
              value={desc}
              className="form-control"
              onChange={(e) => {
                setdesc(e.target.value);
              }}
              rows="8"
              placeholder="Enter Design Description"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Designer Name</label>
            <input
              type="text"
              value={auth}
              className="form-control"
              onChange={(e) => {
                setauth(e.target.value);
              }}
              placeholder="Enter Designer Name"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/posts" className="btn btn-dark ml-4">
            Back to Home{" "}
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
