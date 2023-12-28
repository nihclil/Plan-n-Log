import styled from "styled-components";
import TripImage from "components/Common/DataDisplay/TripImage";
import TripCity from "components/Common/DataDisplay/TripCity";
import TripDate from "components/Common/DataDisplay/TripDate";
import TripTitle from "components/Common/DataDisplay/TripTitle";

interface Props {
  item: { [key: string]: string };
}

export default function TripColumn({ item }: Props) {
  return (
    <TripColumnContainer>
      <Title>Your Trip Details</Title>
      <TripImage item={item} />
      <TripTitle item={item} />
      <TripCity item={item} />
      <TripDate item={item} />
    </TripColumnContainer>
  );
}

const TripColumnContainer = styled.div`
  width: 400px;
  padding: 10px 20px;
  background-color: #e3d7d7;
  @media (min-width: 360px) and (max-width: 600px) {
    width: auto;
    background-color: #e4ddd6;
  }
`;

const Title = styled.div`
  color: #6d5b48;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;
