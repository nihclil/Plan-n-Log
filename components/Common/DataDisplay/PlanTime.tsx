import styled from "styled-components";

interface Props {
  time: string;
}

export default function PlanTime({ time }: Props) {
  return <PlanTimeContainer>{time}</PlanTimeContainer>;
}

const PlanTimeContainer = styled.div`
  font-weight: 600;
  font-size: 30px;
`;
