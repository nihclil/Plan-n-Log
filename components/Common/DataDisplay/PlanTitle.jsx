import styled from "styled-components";

export default function PlanTitle({ item }) {
  return <PlanTitleContainer>{item.eventName}</PlanTitleContainer>;
}

const PlanTitleContainer = styled.div`
  font-size: 32px;
  color: #c88756;
  font-weight: 600;
  margin-bottom: 30px;
`;
