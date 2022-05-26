/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { authPage } from "../../middlewares/uthorizationPage";
import Router from "next/router";

export const getServerSideProps = async (ctx) => {
  const { token } = await authPage(ctx);
  return { props: { token } };
};

const createPage = (props) => {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  const [status, setStatus] = useState("normal");

  const handleForm = async (e) => {
    e.preventDefault();

    setStatus("loading");

    const token = props.token;

    const create = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });

    if (!create.ok) return setStatus("error" + create.status);
    const res = await create.json();
    setStatus("success");

    Router.push("/posts");
  };

  const fieldHandler = (e) => {
    const name = e.target.getAttribute("name");
    setInput({
      ...input,
      [name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Create Page</h1>
      <div>
        <form style={{ margin: "10px" }} onSubmit={handleForm.bind(this)}>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={fieldHandler.bind(this)}
          />
          <br />
          <br />
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            onChange={fieldHandler.bind(this)}
          ></textarea>
          <br />
          <br />
          <button type="submit">Submit</button>
          <div>{status}</div>
        </form>
      </div>
    </div>
  );
};
export default createPage;
