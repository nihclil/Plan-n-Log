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
  margin-bottom: 40px;
`;
