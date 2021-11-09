import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Post() {
  let history = useHistory();
  const [post, setpost] = useState([]);
  const [msg, setsmg]=useState('');

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => setpost(res.data))
      .catch((err) => console.log(err));
  });

  function updatePost(id) {
    history.push("/update-post/" + id);
  }

  function deletePost(id) {
    axios
      .delete("http://localhost:5000/delete-post/" + id)
      .then((res) => {
        history.push("/posts");
        setsmg("Post Deleted!");
      })
      .catch((err) => console.log(err));

    // history.push("/update-post/"+id)
  }

  const columns = [
    { dataField: "title", text: "Design Title" },
    { dataField: "desc", text: "Design Description" },
    { dataField: "auth", text: "Designer", filter: textFilter() },
    {
      dataField: "link",
      text: "Action",

      formatter: (rowContent, row, rowIndex) => {
        const postId = row._id;
        return (
          <>
            <a style={{ cursor: "pointer" }} onClick={() => updatePost(postId)}>
              <Badge pill bg="info">
                Update
              </Badge>
            </a>
            <span>&nbsp;&nbsp;</span>
            <a
              className="danger"
              style={{ cursor: "pointer" }}
              onClick={() => deletePost(postId)}
            >
              {" "}
              <Badge pill bg="danger">
                Delete
              </Badge>
            </a>
          </>
        );
      },
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  return (
    <div>
      <Navbar />
      <h3 className="bg-primary text-center p-2">
        Hey! Checkout these Designs.
      </h3>
      <h3>{msg}</h3>
      <div className="table-box">
        <BootstrapTable
          bootstrap4
          keyField="_id"
          columns={columns}
          data={post}
          pagination={pagination}
          filter={filterFactory()}
        />
      </div>
      {/* {
        post.map((data,key)=>(
          <div className='container'>
              <h2>{data.title}</h2>
              <span className='badge badge-dark'>{data.auth}</span>
              <h6 className='text-white mt-4'>{data.desc}</h6>
              <hr style={{border:'1px dotted white'}}/>
          </div>
        ))
      } */}
    </div>
  );
}

export default Post;
