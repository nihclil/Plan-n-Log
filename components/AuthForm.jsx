import { useState } from "react";
import styled from "styled-components";

export function SignUpForm({ onClose, toggleForm }) {
  return (
    <Container>
      <Overlay onClick={onClose}></Overlay>
      <Content>
        <Caption>Join the Adventure!</Caption>
        <CloseButton onClick={onClose}>x</CloseButton>
        <Button>Create an account with Google</Button>
        <Prompt>
          Already a PlanNLog user?
          <AuthToggle onClick={toggleForm}> Sign in</AuthToggle>
        </Prompt>
      </Content>
    </Container>
  );
}

export function SignInForm({ onClose, toggleForm }) {
  return (
    <Container>
      <Overlay onClick={onClose}></Overlay>
      <Content>
        <Caption>Keep on exploring!</Caption>
        <CloseButton onClick={onClose}>x</CloseButton>
        <Button>Sign in with Google</Button>
        <Prompt>
          Don&apos;t have an account?
          <AuthToggle onClick={toggleForm}> Create one</AuthToggle>
        </Prompt>
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
  background: rgba(49, 49, 49, 0.8);
`;

const Content = styled.div`
  color: #283618;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
  padding: 14px 28px;
  border-radius: 3px;
  max-width: 600px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
  cursor: pointer;
  border: 0;
`;

const Caption = styled.h2`
  padding: 30px;
`;

const Button = styled.button`
  border: 0;
  cursor: pointer;
  color: #283618;
`;

const Prompt = styled.div`
  padding: 30px;
`;

const AuthToggle = styled.button`
  border: 0;
  cursor: pointer;
  margin-left: 10px;
  color: #dda15e;
`;
