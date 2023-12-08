import styled from "styled-components";
import TripTitle from "./TripTitle";
import TripCity from "./TripCity";
import TripDate from "./TripDate";
import TripImage from "./TripImage";
import TripTaskLink from "./TripTaskLink";

export default function TripList({ item }) {
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
`;

const TripInfo = styled.div``;
