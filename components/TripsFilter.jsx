"use client";

import styled from "styled-components";
import TripStatusButton from "./TripStatusButton";

export default function TripsFilter({ selectedButton, setSelectedButton }) {
  return (
    <TripsButtonContainer>
      <TripStatusButton
        onClick={() => setSelectedButton("upcoming")}
        isSelected={selectedButton === "upcoming"}
      >
        Upcoming Trips
      </TripStatusButton>
      <TripStatusButton
        onClick={() => setSelectedButton("past")}
        isSelected={selectedButton === "past"}
      >
        Past Trips
      </TripStatusButton>
    </TripsButtonContainer>
  );
}

const TripsButtonContainer = styled.div`
  margin: 40px auto;
  width: 100%;

  @media (min-width: 360px) and (max-width: 1200px) {
    width: 80%;
  }
`;
