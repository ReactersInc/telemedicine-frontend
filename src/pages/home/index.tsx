import React from "react";
import HorizontalNav from "./../../components/horizontalNav/index";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../features/modal/modalSlice";

function Home() {
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(setModal());
  };
  return (
    <div>
      <HorizontalNav />
      <div className={styles.homeBanner} id="home">
        <div className={styles.homeBannerText}>
          <h1>
            Find the Good Life With <span>Good Health.</span>
          </h1>
          <p>
            Experience top-tier services without leaving your home. We bring
            convenience right to your doorstep!
          </p>
          <div className={styles.homeBannerBtn} onClick={toggleModal}>
            Book Appointment
          </div>
        </div>
        <div className={styles.homeBannerImage}>
          <img src="./static/home_banner.svg" alt="" />
        </div>
      </div>

      <div className={styles.homeService} id="service">
        <h2 className="text-2xl font-semibold">Services</h2>
        <h1>Experienced in multiple medical practices</h1>
        <div className={styles.homeServiceShow}>
          <div className={styles.homeServiceCard}>
            <img src="./static/home_service_icon.png" alt="" />
            <h4>Medical</h4>
            <p>
              Experience top-quality medical services without the hassle. Our
              offerings include Telemedicine Consultations.
            </p>
          </div>
          <div className={styles.homeServiceCard}>
            <img src="./static/home_service_icon.png" alt="" />
            <h4>Indiviual and family</h4>
            <p>Personalized Health Solutions for You and Your Loved Ones.</p>
          </div>
          <div className={styles.homeServiceCard}>
            <img src="./static/home_service_icon.png" alt="" />
            <h4>Employer</h4>
            <p>
              Empowering Your Workforce with Quality Healthcare with our
              tailored healthcare services.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.homeAboutUs} id="aboutUs">
        <h2 className="text-2xl font-semibold">About Us</h2>
        <div className={styles.homeAboutContainer}>
          <div className={styles.homeAboutVideo}>
            <video width="100%" height="auto" autoPlay muted>
              <source src="./static/aboutUs.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={styles.homeAboutText}>
            <p>
              We are a freelancer group enjoying research and development till
              now in a non-profit way. Thanks to MeitY and Tezpur University
              that we formed our lab. Currently, we work on IoT, SDN, web and
              mobile app developments, fog-edge computing, machine learning and
              blockchain. Our club aims to monitor a healthy project environment
              and perform good research. Currently we are focused on developing
              things for healthcare sector. Who knows when we kick in !!!
            </p>
          </div>
        </div>
      </div>
      <div className={styles.homeContactContainer} id="contact">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <div className={styles.homeContacts}>
          <div className={styles.homeContactLineContainer}>
            <div className={styles.homeContactLine}>
              <img src="./static/home_location.png" alt="" />
              <div>
                <div>
                  <h3>Location:</h3>
                  <p>Tezpur University, Napaam, Tezpur 784028</p>
                </div>
              </div>
            </div>
            <div className={styles.homeContactLine}>
              <img src="./static/home_email.png" alt="" />
              <div>
                <div>
                  <h3>Email:</h3>
                  <p>team.navalogy@gmail.com</p>
                </div>
              </div>
            </div>
            <div className={styles.homeContactLine}>
              <img src="./static/home_call.png" alt="" />
              <div>
                <div>
                  <h3>Call:</h3>
                  <p>+91 9365981955</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.homeContactMap}>
            <iframe
              title="Google Map"
              height="100%"
              style={{ border: 0, height: "200%", width: "100%" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.253955578815!2d92.82484217537781!3d26.70433277677198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3744ebb0aeec46fb%3A0x58910c2e9e88cb03!2sDepartment%20of%20Computer%20Science%20%26%20Engineering%2C%20Tezpur%20University!5e0!3m2!1sen!2sin!4v1701298739067!5m2!1sen!2sin"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
