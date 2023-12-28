import styled from "styled-components";
import PlanTitle from "components/Common/DataDisplay/PlanTitle";
import PlanType from "./PlanType";
import PlanDetailsTitle from "components/Common/DataDisplay/PlanDetailsTitle";
import PlanDate from "components/Common/DataDisplay/PlanDate";
import PlanTime from "components/Common/DataDisplay/PlanTime";
import PlanInfo from "components/Common/DataDisplay/PlanInfo";
import DeleteButton from "components/Common/Buttons/DeleteButton";
import calculateTimeUntil from "utils/calculateTimeUntil";

interface Props {
  item: {
    [key: string]: string;
  };
  onDelete: (id: string) => void;
}

export default function FlightInfo({ item, onDelete }: Props) {
  return (
    <PlanContainer>
      <PlanTitle item={item} />
      <PlanType item={item} />
      <DetailText>
        Departs in {calculateTimeUntil(item.startDate, item.startTime)}
      </DetailText>
      <PlanInfoContainer>
        <PlanDetailsTitle />
        <PlanScheduleContainer>
          <PlanDate date={item.startDate} option={false} />
          <PlanTime time={item.startTime} />
          <DetailText>{` Seats ${item.seats} `} </DetailText>
          <DetailText>
            {` Terminal ${item.departureTerminal} • Gate ${item.departureGate}`}
          </DetailText>
        </PlanScheduleContainer>
        <PlanScheduleContainer>
          <PlanDate date={item.endDate} option={false} />
          <PlanTime time={item.endTime} />
          <DetailText>{` Terminal ${item.arrivalTerminal} • Gate ${item.arrivalGate}`}</DetailText>
        </PlanScheduleContainer>
        <PlanInfo type={item.confirmation} infoContent="confirmation：" />
      </PlanInfoContainer>
      <DeleteButtonWrapper>
        <DeleteButton onClick={() => onDelete(item.id)} />
      </DeleteButtonWrapper>
    </PlanContainer>
  );
}

const PlanContainer = styled.div`
  padding: 40px 30px;
  width: 1000px;
  background-color: #fff;
  color: #6d5b48;
  margin-top: 50px;
  border-radius: 10px;
  position: relative;
  word-wrap: break-word;
  @media (min-width: 360px) and (max-width: 1200px) {
    width: 90%;
    margin: 50px auto 0px auto;
  }
`;

const PlanInfoContainer = styled.div`
  width: 800px;
  border: 1px solid #e0e0e0;
  padding: 40px 30px;
  margin-top: 20px;
  @media (min-width: 600px) and (max-width: 1200px) {
    width: 100%;
  }
  @media (min-width: 360px) and (max-width: 600px) {
    width: 100%;
    border: 0;
    padding: 5px;
  }
`;

const PlanScheduleContainer = styled.div`
  font-weight: 600;
  margin-bottom: 40px;
  /* @media (min-width: 360px) and (max-width: 600px) {
    margin-bottom: 40px;
  } */
`;

const DetailText = styled.div`
  font-weight: 400;
  color: #8f8989;
  margin-top: 10px;
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;
