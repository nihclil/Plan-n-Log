"use client";

import styled from "styled-components";
import Navbar from "components/Navbar";

export default function Home() {
  return (
    <Main>
      <Wrapper>
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
      </Wrapper>
    </Main>
  );
}

const Main = styled.main`
  background-color: #e4ddd6;
  width: 1200px;
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
