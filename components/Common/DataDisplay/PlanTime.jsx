import styled from "styled-components";

export default function PlanTime({ time }) {
  return <PlanTimeContainer>{time}</PlanTimeContainer>;
}

const PlanTimeContainer = styled.div`
  font-weight: 600;
  font-size: 30px;
`;
