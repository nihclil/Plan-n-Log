import styled from "styled-components";
import TripTitle from "components/Common/DataDisplay/TripTitle";
import TripCity from "components/Common/DataDisplay/TripCity";
import TripDate from "components/Common/DataDisplay/TripDate";
import TripImage from "components/Common/DataDisplay/TripImage";
import TripTaskButton from "components/Common/Buttons/TripTaskButton";
import DeleteButton from "components/Common/Buttons/DeleteButton";

interface Props {
  item: { [key: string]: string };
  onDelete: (id: string) => void;
}

export default function TripList({ item, onDelete }: Props) {
  return (
    <TripListContainer>
      <TripInfo>
        <TripTitle item={item} />
        <TripCity item={item} />
        <TripDate item={item} />
        <TripTaskButton
          tripId={item.id}
          iconSrc="/iconmonstr-edit-11-24.png"
          linkTo="edit"
          text="Edit Trip Info"
        />
        <TripTaskButton
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

  @media (min-width: 950px) and (max-width: 1200px) {
    width: 80%;
  }
  @media (min-width: 600px) and (max-width: 950px) {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
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
