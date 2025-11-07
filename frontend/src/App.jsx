import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./components/ui/custom/Hero.jsx";
import Header from "./components/ui/custom/Header";
import { JHero2 } from "./landingPage/JHero2.jsx";
import { JPopularDestination } from "./landingPage/JPopularDestination.jsx";
import { JEffortless } from "./landingPage/JEffortless.jsx";
import { JTransform } from "./landingPage/JTransform.jsx";
import { JDiscount } from "./landingPage/JDiscount.jsx";
import { JFooter } from "./landingPage/JFooter.jsx";



function App({ logOut }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (logOut) {
      navigate("/"); // Redirect to the desired route on logout
    }
  }, [logOut, navigate]);

  return (
    <>
      {/* <Header /> */}
      {/* <Hero /> */}


      <JHero2 />
      <JPopularDestination />
      <JEffortless />
      <JTransform />
      <JDiscount />
      <JFooter /> 

     
    </>
  );
}

export default App;


