import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authentication, getUserDetails } from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./LoginPage.scss";
import useAuth from "../../hooks/useAuth";
import LoginContainer from "../../components/LoginContainer/LoginContainer";
interface Inputs {
  username: string;
  password: string;
}

interface Error {
  username: boolean;
  password: boolean;
}
const LoginPage = () => {
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    password: "",
  };

  const errorState = {
    username: false,
    password: false,
  };

  const [values, setValues] = useState<Inputs>(defaultValues);
  const [error, setError] = useState<Error>(errorState);
  const { username, password } = values;
  const { setAuth } = useAuth();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    setError({
      ...error,
      [name]: false,
    });
  };

  const onSumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "") {
      setError({ ...error, username: true });
      console.log(error);
      toast.warn("Username and password required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (password === "") {
      setError({ ...error, password: true });
      toast.warn("Username and password required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const loginRequest = async () => {
      try {
        const response = await authentication(username, password);
        if (response === "Invalid credentials") {
          toast.error("Invalid username or password", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          const authenticate = await authentication(username, password);
          if (authenticate.data.token) {
            const userDetails = await getUserDetails(authenticate.data.token);
            const { role, name } = userDetails?.data;
            setAuth({
              authorized: true,
              role: role,
              employeeName: name,
              accessToken: authenticate.data.token,
            });
            navigate("/dashboard");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    loginRequest();
  };

  return (
    <LoginContainer
      onChangeHandler={onChangeHandler}
      onSumbitHandler={onSumbitHandler}
      username={username}
      password={password}
      error={error}
    />
  );
};

export default LoginPage;
