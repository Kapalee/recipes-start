import { useState } from "react";
import { useLocation } from "react-router-dom";
import { User } from "../services/authFacade";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.tsx";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [err, setErr] = useState(null);

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData) as unknown as User;

    setErr(null);
    console.log(err);
    alert("Login: " + JSON.stringify(user));
    auth
      .signIn(user)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setErr(err);
      });
  }

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="login-form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
