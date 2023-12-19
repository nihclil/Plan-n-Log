import styled from "styled-components";

export default function PlanInfo({ type, infoContent }) {
  return (
    <PlanInfoContainer>
      {infoContent}
      {type}
    </PlanInfoContainer>
  );
}

const PlanInfoContainer = styled.div`
  margin-bottom: 40px;
  font-weight: 600;
`;
