import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import formatDate from "utils/formatDate";

export default function PlanList({ plan, params }) {
  return (
    <PlanContainer>
      <DateColumn>
        <StartDate>{formatDate(plan.startDate, false)}</StartDate>
        <StartTime>{plan.startTime}</StartTime>
      </DateColumn>
      <ImageColumn>
        <Image src={plan.src} width={32} height={32} alt="" />
      </ImageColumn>
      <Link href={`${params.slug}/${plan.planName}/${plan.id}`}>
        <PlanTitle>{plan.eventName}</PlanTitle>
      </Link>
    </PlanContainer>
  );
}

const PlanContainer = styled.div`
  color: #6d5b48;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e6ddd4;
  @media (min-width: 360px) and (max-width: 700px) {
    padding: 10px;
  }
`;

const DateColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  width: 150px;
`;

const StartDate = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

const StartTime = styled.div``;

const ImageColumn = styled.div`
  background-color: #d1bea9;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 30px;
  @media (min-width: 360px) and (max-width: 700px) {
    display: none;
  }
`;

const PlanTitle = styled.div`
  font-size: 24px;
  color: #c88756;
  font-weight: 600;
`;
