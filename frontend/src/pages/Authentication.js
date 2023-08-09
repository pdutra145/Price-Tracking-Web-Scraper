import React, { useContext } from "react";
import useOAuth from "../hooks/Auth";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoadingContext } from "../context/Loading";
import { CircularProgress } from "@mui/material";
import AuthForm from "../components/Form/AuthForm";

const AuthenticationPage = () => {
  const { onSuccessGoogle, onFailure } = useOAuth();
  const { loading, setLoading } = useContext(LoadingContext);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="flex justify-center text-center mt-10">
        <LoginSocialGoogle
          client_id={process.env.REACT_APP_GG_APP_ID}
          onResolve={onSuccessGoogle}
          onReject={onFailure}
          scope="profile email"
        >
          <GoogleLoginButton onClick={() => setLoading(true)} />
        </LoginSocialGoogle>
      </div>

      <p className="text-center my-10">Or</p>
      <AuthForm />
      <div className="flex justify-center align-center text-center my-5">
        {" "}
        {loading && <CircularProgress />}
      </div>

      {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
    </div>
  );
};

export default AuthenticationPage;
