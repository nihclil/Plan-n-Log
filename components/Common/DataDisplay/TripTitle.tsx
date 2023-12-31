import styled from "styled-components";
import Link from "next/link";

interface Props {
  item: { [key: string]: string };
}

export default function TripTitle({ item }: Props) {
  return (
    <Link href={`/trips/${item.id}`}>
      <TripTitleContainer>{item.tripName}</TripTitleContainer>
    </Link>
  );
}

const TripTitleContainer = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: #c88756;
  margin-bottom: 20px;
`;
