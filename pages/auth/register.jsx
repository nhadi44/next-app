import { useState } from "react";
import { unauthPage } from "../../middlewares/uthorizationPage";

export const getServerSideProps = async (ctx) => {
  await unauthPage(ctx);
  return { props: {} };
};

const Register = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("normal");

  const registerHandler = async (e) => {
    e.preventDefault();

    setStatus("loading");

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!registerReq.ok) return setStatus("error" + registerReq.status);

    const registerRes = await registerReq.json();

    setStatus("success");
    setFields({ email: "", password: "" });
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
      <h1>Register</h1>
      <div>
        <form onSubmit={registerHandler.bind(this)}>
          <div>
            <input
              type="text"
              placeholder="Email"
              onChange={fieldHandler.bind(this)}
              name="email"
              value={fields.email}
            />
          </div>
          <div>
            <input
              type="password"
              onChange={fieldHandler.bind(this)}
              name="password"
              placeholder="Password"
              value={fields.password}
            />
          </div>
          <button type="submit">Register</button>
          <div>{status}</div>
        </form>
      </div>
    </div>
  );
};

export default Register;
