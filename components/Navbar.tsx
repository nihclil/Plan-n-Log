"use client";

import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import { SignUpForm, SignInForm } from "./AuthForm";
import { UserAuth } from "../hooks/authContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
                <Link href="/trips">
                  <NavbarButton>Trips</NavbarButton>
                </Link>
              </Li>
              <Li>
                <UserImg>
                  <Image src={user.photoURL} width={40} height={40} alt="" />
                </UserImg>
              </Li>
              <Li>
                <NavbarButton onClick={handleSignOut}>Sign Out</NavbarButton>
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
  display: flex;
  align-items: center;
  padding: 10px;
  height: 80px;
  position: relative;
  background-color: #e4ddd6;
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 1200px;
    border-bottom: 1px solid #d1bea9;
    height: 0;
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: auto;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  color: #6d5b48;
  font-weight: 700;
  font-size: 30px;
`;

const GetStared = styled.button`
  background-color: transparent;

  cursor: pointer;
  color: #fff;
  border: 0;
  font-size: 20px;
  background-color: #6d5b48;
  padding: 10px 20px;
  border-radius: 18px;
  margin-left: 30px;

  &:hover {
    background-color: #584a3b80;
  }
`;

const UserImg = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  overflow: hidden;
  margin-left: 30px;
  @media (min-width: 360px) and (max-width: 600px) {
    margin-left: 10px;
  }
`;

const NavbarButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: 0;
  color: #6d5b48;
  font-weight: 600;
  font-size: 20px;
  margin-left: 30px;

  @media (min-width: 360px) and (max-width: 600px) {
    margin-left: 10px;
  }
`;
