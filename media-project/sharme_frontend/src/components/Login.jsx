import { useEffect } from "react";
import { gapi } from "gapi-script";

import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import sahreVideo from "../assets/s.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const navigate = useNavigate();

  const responseGoogle = async (response) => {

    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = await response.profileObj;
    

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full '>
        <video
          src={sahreVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay'>
          <div className='p-5'>
            {" "}
            <img src={logo} width={"130px"} alt='logo' />{" "}
          </div>
          <div className='shadow-2x1'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type='button'
                  className='bg-mainColor flex justify-center items-center p-3 outline-none cursor-pointer rounded-lg'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}>
                  <FcGoogle className='mr-4' />
                  Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy='single_host_origin'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
