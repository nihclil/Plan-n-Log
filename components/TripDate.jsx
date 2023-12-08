import styled from "styled-components";
import formatDate from "utils/formatDate";

export default function TripDate({ item }) {
  return (
    <TripDateContainer>
      {formatDate(item.startDate)} - {formatDate(item.endDate)}
    </TripDateContainer>
  );
}

const TripDateContainer = styled.div`
  margin-bottom: 15px;
  color: #6d5b48;
  font-size: 20px;
`;
