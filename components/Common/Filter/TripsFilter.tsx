"use client";

import styled from "styled-components";
import TripStatusButton from "components/Common/Buttons/TripStatusButton";

interface Props {
  selectedButton: string;
  setSelectedButton: React.Dispatch<React.SetStateAction<string>>;
}

export default function TripsFilter({
  selectedButton,
  setSelectedButton,
}: Props) {
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

  @media (min-width: 600px) and (max-width: 1200px) {
    width: 80%;
  }
  @media (min-width: 360px) and (max-width: 600px) {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
