"use client";

import Link from "next/link";
import styled from "styled-components";

export default function AddTripBtn() {
  return (
    <Main>
      <AddArea>
        <Link href="/plan">
          <AddLink>
            <PlusImg src="/icon-plus-circle.png"></PlusImg>
            <AddSpan>Add a trip</AddSpan>
          </AddLink>
        </Link>
      </AddArea>
    </Main>
  );
}

const Main = styled.main`
  padding-top: 30px;
  margin: auto;
  width: 1200px;
`;

const AddArea = styled.div``;

const AddLink = styled.div`
  display: flex;
`;

const PlusImg = styled.img``;

const AddSpan = styled.span`
  cursor: pointer;
  padding-left: 5px;
`;
