"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SignUpForm } from "./AuthForm";

export default function Navbar() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
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

      {modal && <SignUpForm onClose={toggleModal} />}
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
