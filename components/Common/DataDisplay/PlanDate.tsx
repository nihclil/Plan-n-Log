import styled from "styled-components";
import formatDate from "utils/formatDate";

interface Props {
  date: string;
  option: boolean;
}

export default function PlanDate({ date, option }: Props) {
  return <PlanDateContainer>{formatDate(date, option)}</PlanDateContainer>;
}

const PlanDateContainer = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;
