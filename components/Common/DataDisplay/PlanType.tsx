import styled from "styled-components";

interface Props {
  item: { [key: string]: string };
}

export default function PlanType({ item }: Props) {
  return <PlanTypeContainer>{item.planName}</PlanTypeContainer>;
}

const PlanTypeContainer = styled.div`
  margin-bottom: 30px;
`;
