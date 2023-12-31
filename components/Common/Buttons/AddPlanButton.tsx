"use client";

import styled from "styled-components";

export default function AddPlanButton() {
  return (
    <PlanContainer>
      <PlanImg src="/iconmonstr-plus-6-24.png"></PlanImg>
      <PlanSpan>Add a Plan</PlanSpan>
    </PlanContainer>
  );
}

const PlanContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  background-color: #fff;
  padding: 20px 20px;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  bottom: -70px;
  transform: translate(-50%);
  box-shadow: 4px 4px 10px 0px #aaaaaa;
`;

const PlanImg = styled.img``;

const PlanSpan = styled.span`
  cursor: pointer;
  padding-left: 5px;
  color: #6a9066;
  font-size: 24px;
  font-weight: 600;

  &:hover {
    color: #70946c;
  }
`;
