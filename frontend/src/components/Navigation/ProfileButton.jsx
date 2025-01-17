import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../store/user-session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import ProfileLottie from "../../assets/lotties/profile.json";
import Lottie from "lottie-react";
import "./Navigation.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.userSession.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };
  return (
    <>
      <div className="profile-container" onClick={toggleMenu}>
        <Lottie animationData={ProfileLottie} />
      </div>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>
                <h3>Hello, {user.username}!</h3>
              </li>
              <li>
                <h3>{user.email}</h3>
              </li>
              <li>
                <button onClick={logout} className="logout-button">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText={<p style={{ cursor: "pointer" }}>Log In</p>}
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal navigate={navigate} />}
              />
              <OpenModalMenuItem
                itemText={<p style={{ cursor: "pointer" }}>Sign Up</p>}
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal navigate={navigate} />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
