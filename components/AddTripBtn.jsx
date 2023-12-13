"use client";

import Link from "next/link";
import styled from "styled-components";

export default function AddTripBtn() {
  return (
    <AddArea>
      <Link href="/plan">
        <AddLink>
          <PlusImg src="/iconmonstr-plus-6-24.png"></PlusImg>
          <AddSpan>Add a trip</AddSpan>
        </AddLink>
      </Link>
    </AddArea>
  );
}

const AddArea = styled.div`
  margin: 40px auto;
  width: 100%;
  @media (min-width: 360px) and (max-width: 1200px) {
    width: 80%;
  }
`;

const AddLink = styled.div`
  display: flex;
  align-items: center;
`;

const PlusImg = styled.img``;

const AddSpan = styled.span`
  cursor: pointer;
  padding-left: 5px;
  color: #6a9066;
  font-size: 24px;
  font-weight: 600;

  &:hover {
    color: #70946c;
  }
`;
