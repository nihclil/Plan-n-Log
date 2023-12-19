import styled from "styled-components";
import Image from "next/image";

export default function LoadingEffect() {
  return (
    <Wrapper>
      <CircleWrapper>
        <RedCircle />
        <GreenCircle />
        <OrangeCircle />
      </CircleWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e4ddd6;
`;

const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const RedCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #e15b64;
  border-radius: 50%;
`;

const GreenCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #abbd81;
  border-radius: 50%;
`;

const OrangeCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f8b26a;
  border-radius: 50%;
`;
