import styled from "styled-components";

export default function TripCity({ item }) {
  return <TripCityContainer>{item.cityName}</TripCityContainer>;
}

const TripCityContainer = styled.div`
  margin-bottom: 15px;
  color: #6d5b48;
  font-size: 20px;
`;
