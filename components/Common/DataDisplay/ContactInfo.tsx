import styled from "styled-components";
import Image from "next/image";

interface Props {
  contactContent: string;
  imageSrc: string;
  imageAlt: string;
}

export default function ContactInfo({
  contactContent,
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <ContactInfoContainer>
      <Image src={imageSrc} width={16} height={16} alt={imageAlt} />
      <Content>{contactContent}</Content>
    </ContactInfoContainer>
  );
}

const ContactInfoContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const Content = styled.span`
  color: #6a9066;
  margin-left: 10px;
`;
