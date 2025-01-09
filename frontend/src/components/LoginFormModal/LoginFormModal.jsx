import { useState } from "react";
import { thunkLogin } from "../../store/user-session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal({ navigate }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await dispatch(
        thunkLogin({
          credential,
          password,
        })
      );
      closeModal();
      navigate("/home");
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-modal-form">
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Email or Username"
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <div className="login-btn-container">
          <button className="login-btn" type="submit">
            Log In
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
