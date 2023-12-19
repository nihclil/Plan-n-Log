import styled from "styled-components";
import formatDate from "utils/formatDate";

export default function PlanDate({ date, option }) {
  return <PlanDateContainer>{formatDate(date, option)}</PlanDateContainer>;
}

const PlanDateContainer = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;
