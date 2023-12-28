import styled from "styled-components";

interface Props {
  type: string;
  infoContent: string;
}

export default function PlanInfo({ type, infoContent }: Props) {
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
