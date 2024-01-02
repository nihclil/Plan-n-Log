"use client";

import styled from "styled-components";
import Image from "next/image";

export default function Home() {
  return (
    <Main>
      <ImageContainer>
        <Overlay></Overlay>
        <ImageTitle>PlanNLog</ImageTitle>
        <ImageText>Plan and Capture Your Adventures</ImageText>
        <Image
          src="/neom-gOqBe7ropxM-unsplash.jpg"
          fill={true}
          priority={true}
          alt="hompage-image"
          style={{ objectFit: "cover" }}
        />
      </ImageContainer>
    </Main>
  );
}

const Main = styled.main`
  background-color: #e4ddd6;
  margin: auto;
`;

const ImageContainer = styled.div`
  width: 100vw;
  height: 90vh;
  position: relative;
  object-fit: "contain";
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const ImageTitle = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  z-index: 2;
  color: #e8e4e4;
  font-size: 50px;
  font-weight: 600;
`;

const ImageText = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  z-index: 2;
  color: #e8e4e4;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;
