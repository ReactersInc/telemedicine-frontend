import React , {useState} from "react";
import './index.css'
import ModalSignin from "../modalSignin";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../features/modal/modalSlice";
function HorizontalNav(){
    const isModalOpen = useSelector((state: {modal: {modalOpen: boolean, scroll: boolean}})=> state.modal.modalOpen)
    const scrollable = useSelector((state: {modal: {modalOpen: boolean, scroll: boolean}})=> state.modal.scroll)
    const dispatch = useDispatch()

    const toggleModal = () =>{
        dispatch(setModal())
    }

    if(!scrollable){
        document.body.style.overflowY="hidden"
    }
    else{
        document.body.style.overflowY="auto"
    }
    
    return(
    <>
    <div className="navContainer">
    <div className="navbar">
            <div className="logo" >
                Navalogy
            </div>
            <div className="btns">
                <a href="/#home" className="navLink">Home</a>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <a href="/#service" className="navLink">Service</a>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <a href="/#aboutUs" className="navLink">About us</a>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <a href="/#contact" className="navLink">Contact</a> 
                &nbsp;&nbsp; 
                &nbsp;&nbsp;
                <button className="signinBtn" onClick={toggleModal}>Sign in</button>
                &nbsp;&nbsp;
                <a href="/register"><button className="submitBtn">Sign up</button></a>
            </div>
        </div>
    </div>
        
    <div>
    {
        isModalOpen && (
            
                <ModalSignin/>
            
        )
    }
    </div>
        
        
    </>
        
    )
}

export default HorizontalNav