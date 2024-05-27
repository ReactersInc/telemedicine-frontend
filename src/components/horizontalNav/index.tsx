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
            menuOpen ? "dispaly" : "hidden"
          } xl:flex xl:justify-between xl:space-x-3 space-y-4 xl:space-y-0  xl:bg-transparent  xl:relative xl:left-auto xl:py-0  xl:pl-0  rounded-2xl md:w-60 w-40 xl:w-auto absolute top-[90px]  md:right-[115px] right-[70px] xl:top-auto xl:right-auto  bg-[#f5f9fe]  overflow-hidden`}
        >
          <div className="xl:flex items-center hidden">
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
          <div className="flex flex-col xl:flex-row items-center xl:text-base text-xs ">
            <li className="list-none bg-[#f5f9fe]">
              <a
                href="/#home"
                className="navLink block text-black font-medium relative xl:p-2.5 xl:mx-1 m-0 p-0 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
              >
                Home
              </a>
            </li>
            <li className="list-none bg-[#f5f9fe]">
              <a
                href="/#service"
                className="navLink block text-black font-medium relative xl:p-2.5 xl:mx-1 m-0 p-0 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
              >
                Service
              </a>
            </li>
            <li className="list-none bg-[#f5f9fe]">
              <a
                href="/#aboutUs"
                className="navLink block text-black font-medium relative xl:p-2.5 xl:mx-1 m-0 p-0 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
              >
                About Us
              </a>
            </li>
            <li className="list-none bg-[#f5f9fe]">
              <a
                href="/#contact"
                className="navLink block text-black font-medium relative xl:p-2.5 xl:mx-1 m-0 p-0 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
              >
                Contact
              </a>
            </li>
            <li className=" bg-[#f5f9fe] xl:mt-0 -mt-3 ">
              <button
                className="signinBtn border-solid border-[#2cda6d] bg-white text-[#2cda6d] py-3 px-4 rounded-md w-20 h-10 xl:w-34 xl:h-14"
                onClick={toggleModal}
              >
                Sign in
              </button>
            </li>
            <li className=" bg-[#f5f9fe] xl:mt-0 -mt-5">
              <a href="/register">
                <button className="SignBtn border-solid border-[#2cda6d] bg-[#2cda6d] text-white py-3 px-4 rounded-md w-20 h-10 xl:w-34 xl:h-14">
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
