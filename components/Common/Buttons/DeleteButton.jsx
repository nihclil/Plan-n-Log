import styled from "styled-components";
import Image from "next/image";

export default function DeleteButton({ onClick }) {
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
