import { useState, useEffect, useRef } from "react";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import LottieAnimation from "../components/utils/LottieAnimation";
import { NavigateFunction, useNavigate } from "react-router-dom";
import animationData from "../animations/chat-gif.json";
import { selectAppState } from "../store/slices/AppSlice";
import { selectFormfieldState } from "../store/slices/FormfieldSlice";
import type { SpanRef, UserType } from "../utils/AppTypes";
import { useAppSelector } from "../store/storeHooks";

const COPYRIGHT_YEAR = new Date().getFullYear();

const HomePage = () => {
  const { loggedInUser } = useAppSelector(selectAppState);
  const { disableIfLoading } = useAppSelector(selectFormfieldState);
  const appGif = useRef<HTMLSpanElement>();

  const [showLogin, setShowLogin] = useState(true);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    // localStorage persists data even after page refresh, unlike state
    const user: UserType = JSON.parse(
      localStorage.getItem("loggedInUser") as string
    );
    if (user && Date.now() < user.expiryTime) navigate("/chats");
  }, []);

  return (
    <>
      {!loggedInUser && (
        <section className="homepage container-fluid d-flex flex-column p-4">
          {/* <section className="homepage__header container pt-0 pb-2 ps-1 pe-4 mb-2 user-select-none">
            <LottieAnimation
              ref={appGif as SpanRef}
              className={"d-inline-block me-2"}
              style={{ width: "35px", height: "35px" }}
              animationData={animationData}
            />
            <span className="d-inline-block mt-2">GSG</span>
          </section> */}
          <section
            className={`app__body container p-2 mb-2 ${disableIfLoading}`}
            style={{marginTop: '5%', minHeight: '400px'}}
          >
            <div className="container d-flex justify-content-between">
              <button
                className={`app__btnToggle fs-4 btn ${
                  showLogin ? "btn-info" : "text-light"
                } col m-1 ${disableIfLoading}`}
                onMouseDown={() => setShowLogin(true)}
              >
                SignIn
              </button>
              <button
                className={`app__btnToggle fs-4 btn ${
                  showLogin ? "text-light" : "btn-info"
                } col m-1 ${disableIfLoading}`}
                onMouseDown={() => setShowLogin(false)}
              >
                SingUp
              </button>
            </div>
            <section
              className={`app__form container text-light p-2 ${disableIfLoading}`}
            >
              {showLogin ? <Login /> : <Register />}
            </section>
          </section>
        </section>
      )}
      {/* {showLogin && (
        <div className={`footer fs-5 w-75 text-light`}>
          &copy; {COPYRIGHT_YEAR} Made by &nbsp;
          <a
            id="footerLink"
            className="text-decoration-none"
            href="https://github.com/Genius21513"
            target="blank"
          >
            <strong>Genius</strong>
          </a>
        </div>
      )} */}
    </>
  );
};

export default HomePage;
