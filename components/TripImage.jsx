import styled from "styled-components";
import Image from "next/image";

export default function TripImage({ item }) {
  return (
    <TripImageContainer>
      <ImageWrapper>
        <Image
          src={item.imageUrl}
          width={198}
          height={198}
          alt="tripImage"
        ></Image>
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
`;

const ImageWrapper = styled.div`
  width: 90%;
  height: 90%;
`;
