import styled from "styled-components";
import formatDate from "utils/formatDate";

interface Props {
  item: { [key: string]: string };
}

export default function TripDate({ item }: Props) {
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
