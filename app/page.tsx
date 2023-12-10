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
      {/* <Wrapper>
        <ProductInfo>
          <Title>PlanNLog</Title>
          <Caption>
            PlanNLog helps you keep track of your travels, ensuring you remember
            the important details of your journey.
          </Caption>
        </ProductInfo>
        <DemoContainer></DemoContainer>
      </Wrapper>
      <Wrapper>
        <ProductInfo>
          <Caption>
            Add details to your travel plans like where you&apos;ll stay, your
            flight info, and the fun stuff you&apos;ll do.
          </Caption>
        </ProductInfo>
        <DemoContainer></DemoContainer>
      </Wrapper>
      <Wrapper>
        <ProductInfo>
          <Caption>
            You can write down your travel stories and record the beautiful
            memories
          </Caption>
        </ProductInfo>
        <DemoContainer></DemoContainer>
      </Wrapper> */}
    </Main>
  );
}

const Main = styled.main`
  background-color: #e4ddd6;
  margin: auto;
`;

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  margin: auto;
`;

// const WhiteWrapper = styled.div`
//   height: 90vh;
//   display: flex;
//   margin: auto;
//   background-color: #fff;
// `;

const ProductInfo = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

const Caption = styled.div`
  color: #6d5b48;
  line-height: 1.6;
  font-size: 24px;
`;

const Title = styled.div`
  color: #6a9066;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const DemoContainer = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  padding: 20px;
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
`;
