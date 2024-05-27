import React, { useState, useEffect } from "react";
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
    const handleResize = () => {
      if (window.innerWidth < 1280 && !scrollable) {
        document.documentElement.style.overflowX = "hidden";
        document.body.style.overflowX = "hidden";
      } else {
        document.documentElement.style.overflowX = "auto";
        document.body.style.overflowX = "auto";
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollable]);

  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="bg-[#f5f9fe] py-4 px-5 ">
        <div className="menu flex justify-between items-center px-4 py-2 xl:hidden">
          <div>
            <a href="/#home">
              <img
                src=".././static/logo.svg"
                alt="Logo"
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            </a>
          </div>
          <div className="text-lg sm:text-xl font-bold my-auto">
            <p>Telemedicine</p>
          </div>
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <img
              src=".././static/navbar.svg"
              alt="Menu"
              className="w-full h-full"
            />
          </div>
        </div>

        <ul
          className={`flex flex-col xl:flex-row justify-end w-full xl:w-auto xl:static transition-transform transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
          } xl:flex xl:justify-between xl:space-x-4 space-y-4 xl:space-y-0 bg-[#f5f9fe] xl:bg-transparent fixed xl:relative top-16 xl:top-0 left-0 xl:left-auto xl:py-0 py-8 xl:pl-0 pl-4`}
        >
          <div className="flex items-center">
            <li className="bg-[#f5f9fe]">
              <a href="/#home">
                <img
                  src=".././static/logo.svg"
                  alt="Logo"
                  className="w-20 h-20"
                />
              </a>
            </li>
          </div>
          <div className="flex flex-col xl:flex-row items-center">
            <li className="list-none bg-[#f5f9fe]">
              <a
                href="/#home"
                className="navLink block text-black font-medium relative p-2.5 mx-1 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
              >
                Home
              </a>
            </li>
            <li className="list-none bg-[#f5f9fe]">
              <a
                href="/#service"
                className="navLink block text-black font-medium relative p-2.5 mx-1 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
              >
                Service
              </a>
            </li>
            <li className="list-none bg-[#f5f9fe]">
              <a
                href="/#aboutUs"
                className="navLink block text-black font-medium relative p-2.5 mx-1 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
              >
                About Us
              </a>
            </li>
            <li className="list-none bg-[#f5f9fe]">
              <a
                href="/#contact"
                className="navLink block text-black font-medium relative p-2.5 mx-1 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
              >
                Contact
              </a>
            </li>
            <li className="list-none bg-[#f5f9fe] mt-4 xl:mt-0">
              <button
                className="signinBtn border-solid border-[#2cda6d] bg-white text-[#2cda6d] py-3 px-4 rounded-md"
                onClick={toggleModal}
              >
                Sign in
              </button>
            </li>
            <li className="list-none bg-[#f5f9fe] mt-4 xl:mt-0">
              <a href="/register">
                <button className="SignBtn border-solid border-[#2cda6d] bg-[#2cda6d] text-white py-3 px-4 rounded-md">
                  Register
                </button>
              </a>
            </li>
          </div>
        </ul>
      </div>

      <div>{isModalOpen && <ModalSignin />}</div>

      <button
        className="backToTopBtn fixed bottom-7 right-5 p-0 bg-none border-none cursor-pointer z-50"
        onClick={scrollToTop}
      >
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20240227155250/up.png"
          alt="back to top"
          className="w-10"
        />
      </button>
    </>
  );
}

export default HorizontalNav;
