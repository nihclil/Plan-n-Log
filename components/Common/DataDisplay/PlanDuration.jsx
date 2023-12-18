import styled from "styled-components";
import calculateDuration from "utils/calculateDuration";

export default function PlanDuration({
  startDate,
  endDate,
  startTime,
  endTime,
}) {
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
