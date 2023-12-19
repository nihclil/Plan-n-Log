import styled from "styled-components";
import PlanTitle from "components/Common/DataDisplay/PlanTitle";
import PlanType from "components/Common/DataDisplay/PlanType";
import PlanTime from "components/Common/DataDisplay/PlanTime";
import PlanDate from "components/Common/DataDisplay/PlanDate";
import PlanInfo from "components/Common/DataDisplay/PlanInfo";
import ContactInfo from "components/Common/DataDisplay/ContactInfo";
import PlanDuration from "components/Common/DataDisplay/PlanDuration";
import PlanDetailsTitle from "components/Common/DataDisplay/PlanDetailsTitle";
import DeleteButton from "components/Common/Buttons/DeleteButton";

export default function ActivityInfo({ item, onDelete }) {
  return (
    <PlanContainer>
      <PlanTitle item={item} />
      <PlanType item={item} />
      <PlanInfoContainer>
        <PlanDetailsTitle />
        <FlexContainer>
          <PlanScheduleContainer>
            <PlanDate date={item.startDate} option={true} />
            <PlanTime time={item.startTime} />
          </PlanScheduleContainer>
          <PlanScheduleContainer>
            <PlanDate date={item.endDate} option={true} />
            <PlanTime time={item.endTime} />
          </PlanScheduleContainer>
        </FlexContainer>
        <PlanInfo type={item.confirmation} infoContent="confirmation：" />
        <PlanInfo type={item.venue} infoContent="venue：" />
        <ContactInfo
          contactContent={item.address}
          imageSrc="/iconmonstr-location-1-16.png"
          imageAlt="location"
        />
        <ContactInfo
          contactContent={item.phone}
          imageSrc="/iconmonstr-phone-1-16.png"
          imageAlt="phone"
        />
        <ContactInfo
          contactContent={item.email}
          imageSrc="/iconmonstr-email-1-16.png"
          imageAlt="email"
        />
        <ContactInfo
          contactContent={item.website}
          imageSrc="/iconmonstr-globe-5-16.png"
          imageAlt="globe"
        />
        <PlanDuration
          startDate={item.startDate}
          endDate={item.endDate}
          startTime={item.startTime}
          endTime={item.endTime}
        />
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

  @media (min-width: 600px) and (max-width: 1200px) {
    width: 100%;
  }
  @media (min-width: 360px) and (max-width: 600px) {
    width: 100%;
    border: 0;
    padding: 5px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 100px;
  margin-bottom: 40px;
  @media (min-width: 360px) and (max-width: 600px) {
    display: block;
  }
`;

const PlanScheduleContainer = styled.div`
  @media (min-width: 360px) and (max-width: 600px) {
    margin-bottom: 40px;
  }
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;
