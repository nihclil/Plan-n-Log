import styled from "styled-components";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export default function CurrentPlansButton({ isOpen, onClick }: Props) {
  return (
    <CurrentPlansButtonContainer onClick={onClick}>
      <ButtonSpan>Current Plans</ButtonSpan>
      <Image
        src={
          isOpen
            ? "/iconmonstr-caret-down-circle-lined-24.png"
            : "/iconmonstr-caret-up-circle-lined-24.png"
        }
        width={24}
        height={24}
        alt="currentPlans"
      />
    </CurrentPlansButtonContainer>
  );
}

const CurrentPlansButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  background-color: #fff;
  padding: 20px 20px;
  border-radius: 20px;
  cursor: pointer;
`;

const ButtonSpan = styled.span`
  margin-right: 10px;
  color: #6a9066;
  font-size: 24px;
  font-weight: 600;
  &:hover {
    color: #70946c;
  }
`;
