"use client";

import styled from "styled-components";

export default function DeleteModal({ toggleModal, deleteData, id, caption }) {
  const handleDelete = () => {
    deleteData(id);
    toggleModal();
  };

  return (
    <Container>
      <Overlay onClick={toggleModal}></Overlay>
      <Content>
        <Caption>Delete the {caption}</Caption>
        <CloseButton onClick={toggleModal}>x</CloseButton>
        <Prompt>
          This will permanently delete this {caption} and its contents from
          PlanNLog. You will not be able to access the {caption}. Once deleted,
          this data cannot be recovered.
        </Prompt>
        <ButtonsColumn>
          <CancelButton onClick={toggleModal}>Cancel</CancelButton>

          <DeleteButton onClick={handleDelete}>Delete {caption}</DeleteButton>
        </ButtonsColumn>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(49, 49, 49, 0.6);
`;

const Content = styled.div`
  color: #6d5b48;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.6;
  background: #f1f1f1;
  padding: 30px;
  border-radius: 5px;
  max-width: 700px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const Caption = styled.h2`
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
  cursor: pointer;
  border: 0;
`;

const Prompt = styled.div``;

const ButtonsColumn = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: 0;
  color: #6a9066;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  border: 0;
  color: #e05144;
  font-weight: 600;
  background-color: #f0d6d3;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
