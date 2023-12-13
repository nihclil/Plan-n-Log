import styled from "styled-components";
import Image from "next/image";

export default function TripImage({ item }) {
  return (
    <TripImageContainer>
      <ImageWrapper>
        <Image fill src={item.imageUrl} alt="tripImage"></Image>
      </ImageWrapper>
    </TripImageContainer>
  );
}

const TripImageContainer = styled.div`
  width: 220px;
  height: 220px;
  background-color: #e4ddd6;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 600px) and (max-width: 800px) {
    width: 200px;
    height: 200px;
  }
  @media (min-width: 360px) and (max-width: 600px) {
    width: 200px;
    height: 200px;
  }
`;

const ImageWrapper = styled.div`
  width: 90%;
  height: 90%;
  position: relative;
`;
