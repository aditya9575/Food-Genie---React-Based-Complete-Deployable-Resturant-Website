import React from "react";
import "./home.css";
import Header from "../header/Header";
import MenuItemsCard from "../menu-display-component/MenuItemsCard";
import Footer from "../footer-component/Footer";
import { useEffect } from "react";

const HomePage = () => {

  useEffect(() => {
    const hasReloaded = localStorage.getItem("homePageReloaded");

    if (!hasReloaded) {
      localStorage.setItem("homePageReloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div>
      <Header />
      <MenuItemsCard />
      <Footer />
    </div>
  );
};

export default HomePage;





