import styled from "styled-components";
import calculateDuration from "utils/calculateDuration";

interface Props {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export default function PlanDuration({
  startDate,
  endDate,
  startTime,
  endTime,
}: Props) {
  return (
    <PlanDurationContainer>
      Duration {calculateDuration(startDate, endDate, startTime, endTime)}
    </PlanDurationContainer>
  );
}

const PlanDurationContainer = styled.div`
  font-weight: 600;
  margin-top: 50px;
`;
