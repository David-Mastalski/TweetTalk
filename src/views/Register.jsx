import { LoginInput } from "../components/LoginInput/LoginInput";
import { LoginWrapper } from "../components/LoginWrapper/LoginWrapper";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FileInput } from "../components/FileInput/FileInput";
import { LoginDownText } from "../components/LoginDownText/LoginDownText";

import { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

export function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <LoginWrapper
      title="Register"
      describe="Please enter your Name, Login and your Password"
      onSubmit={handleSubmit}
    >
      <LoginInput icon={faUser} type="text" placeholder="Username" />
      <LoginInput icon={faEnvelopeOpen} type="email" placeholder="E-mail" />
      <LoginInput icon={faLock} type="password" placeholder="Password" />
      <FileInput />
      <button>Sign Up</button>
      {err && <span>Something went wrong !!</span>}
      <LoginDownText linkTitle="Login !" to="/login">
        Already have an Account
      </LoginDownText>
    </LoginWrapper>
  );
}
