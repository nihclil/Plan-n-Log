import styled from "styled-components";
import Image from "next/image";

interface Props {
  onClick: () => void;
}

export default function DeleteButton({ onClick }: Props) {
  return (
    <DeleteButtonContainer onClick={onClick}>
      <Image
        src="/iconmonstr-trash-can-lined-24.png"
        width={24}
        height={24}
        alt="trash-can-lined--24"
      ></Image>
    </DeleteButtonContainer>
  );
}

const DeleteButtonContainer = styled.div``;
