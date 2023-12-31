import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

interface Props {
  tripId: string;
  text: string;
  iconSrc: string;
  linkTo: string;
}

export default function TripTaskLink({ tripId, text, iconSrc, linkTo }: Props) {
  return (
    <TripEditContainer>
      <Link href={`/trips/${tripId}/${linkTo}`}>
        <LinkWrapper>
          <Image src={iconSrc} width={24} height={24} alt="edit-11-24"></Image>
          <EditLabel>{text}</EditLabel>
        </LinkWrapper>
      </Link>
    </TripEditContainer>
  );
}

const TripEditContainer = styled.div`
  color: #6d5b48;
  width: 150px;
`;

const EditLabel = styled.span`
  padding-left: 8px;
  color: #6a9066;
  font-size: 20px;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
