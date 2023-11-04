"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SignUpForm, SignInForm } from "./AuthForm";
import { UserAuth } from "../hooks/authContext";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const { user, googleSignIn, googleSignOut } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await googleSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      {!user ? (
        <NavbarContainer>
          <NavBar>
            <Ul>
              <Li>
                <Link href="/">
                  <Logo>PlanNLog</Logo>
                </Link>
              </Li>
            </Ul>
            <Ul>
              <Li>
                <GetStared onClick={toggleModal}>Get Started</GetStared>
              </Li>
            </Ul>
          </NavBar>
        </NavbarContainer>
      ) : (
        <NavbarContainer>
          <NavBar>
            <Ul>
              <Li>
                <Link href="/">
                  <Logo>PlanNLog</Logo>
                </Link>
              </Li>
            </Ul>
            <Ul>
              <Li>
                <GetStared>Welcome,{user.displayName}</GetStared>
              </Li>
              <Li>
                <GetStared onClick={handleSignOut}>Sign Out</GetStared>
              </Li>
            </Ul>
          </NavBar>
        </NavbarContainer>
      )}

      {modal &&
        (isSignUp ? (
          <SignUpForm
            onClose={toggleModal}
            handleSignIn={handleSignIn}
            toggleForm={toggleForm}
          />
        ) : (
          <SignInForm
            onClose={toggleModal}
            handleSignIn={handleSignIn}
            toggleForm={toggleForm}
          />
        ))}
    </>
  );
}

const NavbarContainer = styled.nav`
  height: 50px;
  color: #283618;
  font-size: 24px;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
`;

const Li = styled.li``;

const Logo = styled.div`
  font-weight: 700;
`;

const GetStared = styled.button`
  background-color: transparent;
  cursor: pointer;
  color: #283618;
  border: 0;
  padding: 5px;
  border-radius: 15px;
`;
