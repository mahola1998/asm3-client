import { Form, Link, redirect, useActionData } from "react-router-dom";
import styles from "./LoginPageAndRegisterPage.module.css";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [err, setErr] = useState([]);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      setErr(actionData.message || []);
    }
  }, [actionData]);

  useEffect(() => {
    if (err) {
      if (err.length >= 1) {
        err.forEach((el) => {
          if (el.path === "email") {
            setEmailErr(true);
          } else {
            setPasswordErr(true);
          }
        });
      }
    }
  }, [err]);

  return (
    <div className={styles.background}>
      <div className="row w-100 justify-content-center">
        <div className="col-lg-7">
          <div className="d-flex justify-content-center ">
            <div className="bg-white d-inline p-5 m-4 shadow rounded w-50">
              <h1 className="d-flex justify-content-center p-5 mb-5 fw-light text-secondary fst-italic">
                Sign In
              </h1>
              <div className=" w-100">
                {err.length >= 1 && (
                  <div>
                    {err.map((msg) => (
                      <div className={styles.error}>{msg.msg}</div>
                    ))}
                  </div>
                )}
                <Form method="post" action="/login">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className={
                      emailErr
                        ? styles.err + " d-block p-4 w-100"
                        : "d-block border border-light-subtle p-4 w-100"
                    }
                    required
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className={
                      passwordErr
                        ? styles.err + " d-block p-4 w-100"
                        : "d-block border border-light-subtle p-4 w-100"
                    }
                    required
                  />
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-dark w-100 rounded-0 my-3 w-100 p-3">
                      SIGN IN
                    </button>
                  </div>
                </Form>
              </div>
              <div className="d-flex justify-content-center p-4 mt-4">
                <p className="text-secondary fst-italic">
                  Register?{" "}
                  <span>
                    <Link
                      to="/register"
                      className="link-offset-2 link-underline link-underline-opacity-0"
                    >
                      Click
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

export async function action({ request }) {
  const formData = await request.formData();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch(
    "https://asm3-sever-app.onrender.com/auth/login",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok === false) {
    const error = await response.json();
    console.log(error);
    return error;
  }
  return redirect("/");
}
