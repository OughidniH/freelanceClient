import {  Container } from "@mui/material";

import Login from "../../components/user/Login";
import NavBar from "../../components/NavBar";
// import HeroSection from "../../components/HeroSection";
import PageTitle from "../../components/PageTitle";
import AnimatedObject from "../../img/market-h1.png";

export default function Marketplace() {
  return (
    <Container>
      <div>
        <NavBar />
        <PageTitle title={"Marketplace"} AnimatedObject={AnimatedObject} />
        
      </div>
      <Login />
    </Container>
  );
}
