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

  const [menuOpen, setMenuOpen] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="bg-[#f5f9fe] py-4 px-5 ">
        <div className="menu flex justify-between items-center px-4 py-2 xl:hidden ">
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
            <p>Telehealth</p>
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

        <div
          className={`flex flex-col xl:flex-row justify-end xl:w-auto xl:static transition-transform transform bg-[#f5f9fe] ${
            menuOpen ? "flex" : "hidden"} xl:flex xl:justify-between  rounded-2xl  xl:w-full xl:-right-0 xl:px-36 xl:top-0 xl:py-2 p-5 absolute top-[90px]  md:right-[115px] right-[70px] bg-[#f5f9fe]  overflow-hidden xl:fixed  shadow-md shadow-slate-200`}
        >
          <div className="xl:block items-center hidden ">
            <a
              href="/#home"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <img
                src=".././static/logo.svg"
                alt="Logo"
                className="w-20 h-20"
              />
            </a>
          </div>
          <div className="w-40 xl:w-auto flex flex-col xl:flex-row items-center xl:text-base text-xs xl:space-x-12 gap-4 xl:gap-0 xl:space-y-0  py-5 xl:py-0">
            <a
              href="/#service"
              onClick={() => {
                setMenuOpen(!menuOpen);

              }}
              className=" block text-black font-medium relative  xl:mx-1 m-0 p-0 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
            >
              Service
            </a>
            <a
              href="/#aboutUs"
              onClick={() => {
                setMenuOpen(!menuOpen);

              }}
              className=" block text-black font-medium relative  xl:mx-1 m-0 p-0 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
            >
              About Us
            </a>
            <a
              href="/#contact"
              onClick={() => {
                setMenuOpen(!menuOpen);

              }}
              className=" block text-black font-medium relative  xl:mx-1 m-0 p-0 bg-[#f5f9fe] hover:text-[#2cda6d] hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#2cda6d] after:transition-all after:duration-300"
            >
              Contact
            </a>
            <button
              className="border-2 border-solid border-[#2cda6d] rounded-3xl bg-white text-[#2cda6d] px-4  h-10 xl:w-34 xl:h-12"
              onClick={() => {
                setMenuOpen(!menuOpen);

                toggleModal();
              }}
            >
              Sign in
            </button>
            <a
              href="/register"
              onClick={() => {
                setMenuOpen(!menuOpen);

              }}
            >
              <button className="SignBtn border-solid border-[#2cda6d] bg-[#2cda6d] text-white px-4 rounded-3xl  h-10 xl:w-34 xl:h-12">
                Register
              </button>
            </a>
          </div>
        </div>
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
