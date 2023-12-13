import styled from "styled-components";
import TripTitle from "./TripTitle";
import TripCity from "./TripCity";
import TripDate from "./TripDate";
import TripImage from "./TripImage";
import TripTaskLink from "./TripTaskLink";
import DeleteButton from "./DeleteButton";

export default function TripList({ item, onDelete }) {
  return (
    <TripListContainer>
      <TripInfo>
        <TripTitle item={item} />
        <TripCity item={item} />
        <TripDate item={item} />
        <TripTaskLink
          tripId={item.id}
          iconSrc="/iconmonstr-edit-11-24.png"
          linkTo="edit"
          text="Edit Trip Info"
        />
        <TripTaskLink
          tripId={item.id}
          iconSrc="/iconmonstr-edit-6-24.png"
          linkTo="write"
          text="Log Your Trip"
        />
        <DeleteButtonWrapper>
          <DeleteButton onClick={() => onDelete(item.id)} />
        </DeleteButtonWrapper>
      </TripInfo>
      <TripImage item={item} />
    </TripListContainer>
  );
}

const TripListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 4px 4px 30px 0px #aaaaaa;
  width: 100%;
  height: 300px;
  margin: 60px auto;
  background-color: #fff;
  padding: 40px 60px 40px 60px;
  border-radius: 20px;
  position: relative;

  @media (min-width: 800px) and (max-width: 1200px) {
    width: 80%;
  }
  @media (min-width: 600px) and (max-width: 800px) {
    width: 80%;
    padding: 40px 20px;
  }
  @media (min-width: 360px) and (max-width: 600px) {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 40px 20px;
  }
`;

const TripInfo = styled.div``;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;
