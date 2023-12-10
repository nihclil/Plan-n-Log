import { useState } from "react";
import styled from "styled-components";

export function SignUpForm({ onClose, toggleForm, handleSignIn }) {
  return (
    <Container>
      <Overlay onClick={onClose}></Overlay>
      <Content>
        <Caption>Join the Adventure!</Caption>
        <CloseButton onClick={onClose}>x</CloseButton>
        <Button onClick={handleSignIn}>Create an account with Google</Button>
        <Prompt>
          Already a PlanNLog user?
          <AuthToggle onClick={toggleForm}> Sign in</AuthToggle>
        </Prompt>
      </Content>
    </Container>
  );
}

export function SignInForm({ onClose, toggleForm, handleSignIn }) {
  return (
    <Container>
      <Overlay onClick={onClose}></Overlay>
      <Content>
        <Caption>Keep on exploring!</Caption>
        <CloseButton onClick={onClose}>x</CloseButton>
        <Button onClick={handleSignIn}>Sign in with Google</Button>
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
  z-index: 5;
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
  color: #6d5b48;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
  padding: 14px 28px;
  border-radius: 5px;
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
  border: 1px solid #6d5b48;
  padding: 10px 20px;
  border-radius: 18px;
  cursor: pointer;
  color: #6d5b48;
`;

const Prompt = styled.div`
  padding: 30px;
`;

const AuthToggle = styled.button`
  border: 0;
  cursor: pointer;
  margin-left: 10px;
  color: #f2a365;
  font-weight: 600;
`;
