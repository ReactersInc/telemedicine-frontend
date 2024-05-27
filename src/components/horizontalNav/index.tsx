import React, { useState, useEffect } from "react";
import "./index.css";
import ModalSignin from "../modalSignin";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../features/modal/modalSlice";

function HorizontalNav() {
  const isModalOpen = useSelector(
    (state: { modal: { modalOpen: boolean; scroll: boolean } }) =>
      state.modal.modalOpen
  );
  const scrollable = useSelector(
    (state: { modal: { modalOpen: boolean; scroll: boolean } }) =>
      state.modal.scroll
  );
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(setModal());
  };

  useEffect(() => {
    // Disable horizontal scrolling on mount if screen width is less than 900px
    const handleResize = () => {
      if (window.innerWidth < 900 && !scrollable) {
        document.documentElement.style.overflowX = "hidden";
        document.body.style.overflowX = "hidden";
      } else {
        document.documentElement.style.overflowX = "auto";
        document.body.style.overflowX = "auto";
      }
    };

    handleResize(); // Call on mount

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollable]);

  const [menuOpen, setMenuOpen] = useState(false);

  // Function to scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional, smooth scrolling animation
    });
  };

  return (
    <>
      <div className="navbar">
        <div className="title">
          <a href="/#home">
            <img src=".././static/logo.svg" alt="Logo" />
          </a>
        </div>
        <div
          className="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={menuOpen ? "open" : ""}>
          <li>
            <a href="/#home" className="navLink">
              Home
            </a>
          </li>
          <li>
            <a href="/#service" className="navLink">
              Service
            </a>
          </li>
          <li>
            <a href="/#aboutUs" className="navLink">
              About Us
            </a>
          </li>
          <li>
            <a href="/#contact" className="navLink">
              Contact
            </a>
          </li>
          <li>
            <button className="signinBtn" onClick={toggleModal}>
              Sign in
            </button>
          </li>
          <li>
            <a href="/register">
              <button className="SignBtn">Register</button>
            </a>
          </li>
        </ul>
      </div>

      <div>{isModalOpen && <ModalSignin />}</div>

      {/* Back to Top button */}
      <button className="backToTopBtn" onClick={scrollToTop}>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20240227155250/up.png"
          alt="back to top"
        />
      </button>
    </>
  );
}

export default HorizontalNav;
