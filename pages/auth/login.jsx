import { useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { unauthPage } from "../../middlewares/uthorizationPage";
export const getServerSideProps = async (ctx) => {
  await unauthPage(ctx);
  return { props: {} };
};

const Login = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");

  const loginHandler = async (e) => {
    e.preventDefault();

    setStatus("loading");

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!loginReq.ok) return setStatus("error" + loginReq.status);

    const loginRes = await loginReq.json();
    setStatus("success");
    setFields({ email: "", password: "" });
    Cookies.set("token", loginRes.token);

    Router.push("/posts");
  };

  const fieldHandler = (e) => {
    const name = e.target.getAttribute("name");

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };
  return (
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={loginHandler.bind(this)}>
          <input
            type="text"
            placeholder="username"
            onChange={fieldHandler.bind(this)}
            name="email"
            value={fields.email}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={fieldHandler.bind(this)}
            name="password"
            value={fields.password}
          />
          <br />
          <button type="submit">Login</button>
          <div>{status}</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
