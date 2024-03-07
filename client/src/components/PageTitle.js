import styled from "@emotion/styled";
import React from "react";

const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20%;
  padding-top: 10%;
  font-size: 50px;
  font-weight: 600;
  position: relative;

  @media (max-width: 1024px) {
    padding: 5% 20%;
    fontsize: 10px;
  }

  @media (max-width: 768px) {
    padding-left: 5px;
    fontsize: 10px;
    display: block;
  }
`;

const AnimatedObjectImage = styled.img`
  position: absolute;
  top: 50px;
  right: 10%;
  width: 200px;
  animation: moveObject 5s infinite linear;

  @media (max-width: 1024px) {
    right: 15%;
    width: 180px;
  }

  @media (max-width: 768px) {
    right: 5%;
    width: 120px;
  }
`;

const PageTitle = ({ title, AnimatedObject }) => {
  return (
    <PageTitleWrapper className="title-section">
      <AnimatedObjectImage src={AnimatedObject} alt="Animated Object" />
      <div className="page-title">{title}</div>
    </PageTitleWrapper>
  );
};

export default PageTitle;
