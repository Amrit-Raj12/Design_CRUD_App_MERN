import Axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const UpdatePost = (props) => {
  const [title, settitle] = useState("");
  const [auth, setauth] = useState("");
  const [desc, setdesc] = useState("");
  const [msg, setmsg] = useState("");

  let history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    Axios.get("http://localhost:5000/posts/" + id).then((res) => {
      settitle(res.data.title);
      setauth(res.data.auth);
      setdesc(res.data.desc);
    });
    return function cleanup() {
      
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const id = props.match.params.id;
    const blog = {
      title: title,
      desc: desc,
      auth: auth,
    };
    Axios.put("http://localhost:5000/update-post/" + id, blog).then((res) => {
      history.push("/posts");
      setmsg("Updated Successfully!")
    });
  }

  return (
    <div>
      <Navbar />
      <div className="container" mt-5>
        <h2 className="m-5 text-center">Add Design into this website</h2>
        <form
          className="col-md-6 mx-auto "
          onSubmit={handleSubmit}
          method="put"
        >
          <h5 className="p-3 text-center text-white">{msg}</h5>
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
            <label>Author Name</label>
            <input
              type="text"
              value={auth}
              className="form-control"
              onChange={(e) => {
                setauth(e.target.value);
              }}
              placeholder="Enter Author Name"
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
};

export default UpdatePost;
