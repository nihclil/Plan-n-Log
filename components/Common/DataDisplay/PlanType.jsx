import styled from "styled-components";

export default function PlanType({ item }) {
  return <PlanTypeContainer>{item.planName}</PlanTypeContainer>;
}

const PlanTypeContainer = styled.div`
  margin-bottom: 30px;
`;
