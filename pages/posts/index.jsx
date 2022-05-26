/* eslint-disable react-hooks/rules-of-hooks */
import cookies from "next-cookies";
import { authPage } from "../../middlewares/uthorizationPage";
import Router from "next/router";
import { useState } from "react";

export const getServerSideProps = async (ctx) => {
  const { token } = await authPage(ctx);
  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const post = await postReq.json();

  console.log(post);

  return {
    props: {
      data: post.data,
      token,
    },
  };
};

const postIndex = (props) => {
  const [posts, setPosts] = useState(props.data);

  const createPostLink = (e) => {
    e.preventDefault();
    Router.push("/posts/create");
  };

  const deletePost = async (id, e) => {
    e.preventDefault();
    const { token } = props;

    const ask = confirm("Are you sure?");

    if (ask) {
      const deletePost = await fetch(`/api/posts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await deletePost.json();

      const postFiltered = posts.filter((post) => {
        return post.id !== id && post;
      });
      setPosts(postFiltered);
    }
  };
  return (
    <div>
      <h1>POST</h1>
      <button onClick={createPostLink.bind(this)}>Create Post</button>
      <br />
      <br />
      <table border="1">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button style={{ marginRight: "10px" }}>Edit</button>
                  <button onClick={deletePost.bind(this, post.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default postIndex;
