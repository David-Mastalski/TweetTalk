import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { LoginDownText } from "../components/LoginDownText/LoginDownText";
import { LoginInput } from "../components/LoginInput/LoginInput";
import { LoginWrapper } from "../components/LoginWrapper/LoginWrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <LoginWrapper
      title="Login"
      describe="Please enter your Login and your Password"
      onSubmit={handleSubmit}
    >
      <LoginInput icon={faUser} type="email" placeholder="E-mail" />
      <LoginInput icon={faLock} type="password" placeholder="Password" />
      <button>Login</button>
      <LoginDownText linkTitle="Register!" to="/register">
        Not a member jet
      </LoginDownText>
    </LoginWrapper>
  );
}
