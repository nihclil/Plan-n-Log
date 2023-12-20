import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

interface Props {
  linkHref: string;
  ImageSrc: string;
  ImageAlt: string;
  span: string;
}

export default function PlanTypeButton({
  linkHref,
  ImageSrc,
  ImageAlt,
  span,
}: Props) {
  return (
    <PlanTypeButtonContainer>
      <Link href={linkHref}>
        <LinkContainer>
          <Image src={ImageSrc} width={32} height={32} alt={ImageAlt} />
          <PlanSpan>{span}</PlanSpan>
        </LinkContainer>
      </Link>
    </PlanTypeButtonContainer>
  );
}

const PlanTypeButtonContainer = styled.div`
  border: 1px solid transparent;
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 40px;
  color: #6d5b48;
  transition: border 0.2s;
  cursor: pointer;
  &:hover {
    border: 1px solid #6d5b48;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PlanSpan = styled.span`
  margin-left: 10px;
  font-size: 24px;
`;
