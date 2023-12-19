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
  @media (min-width: 360px) and (max-width: 950px) {
    margin-top: 20px;
  }
`;

const ImageWrapper = styled.div`
  width: 90%;
  height: 90%;
  position: relative;
`;
