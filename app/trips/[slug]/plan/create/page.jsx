"use client";

import Image from "next/image";
import Link from "next/link";
import activity from "public/iconmonstr-friend-4-32.png";
import lodging from "public/iconmonstr-bed-2-32.png";
import flight from "public/iconmonstr-airport-2-32.png";
import styled from "styled-components";
import useAuthRedirect from "hooks/useAuthRedirect";

export default function Home({ params }) {
  useAuthRedirect();

  return (
    <Main>
      <Nav>
        <Link href={`/trips/${params.slug}`}>
          <Image
            src="/iconmonstr-arrow-left-lined-24.png"
            width={24}
            height={24}
            alt="arrow"
          ></Image>
          <NavSpan>Back to Trip Summary</NavSpan>
        </Link>
      </Nav>
      <Caption>Most Popular</Caption>
      <PlansContainer>
        <Link href={`/trips/${params.slug}/activity/create`}>
          <PlanButton>
            <Image src={activity} alt="" />
            <PlanSpan>Activity</PlanSpan>
          </PlanButton>
        </Link>

        <Link href={`/trips/${params.slug}/lodging/create`}>
          <PlanButton>
            <Image src={lodging} alt="" />
            <PlanSpan>Lodging</PlanSpan>
          </PlanButton>
        </Link>

        <Link href={`/trips/${params.slug}/flight/create`}>
          <PlanButton>
            <Image src={flight} alt="" />
            <PlanSpan>Flight</PlanSpan>
          </PlanButton>
        </Link>
      </PlansContainer>
    </Main>
  );
}

const Main = styled.div`
  width: 1000px;
  margin: 50px auto;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
`;

const NavSpan = styled.span`
  margin-left: 5px;
  font-size: 24px;
  font-weight: 600;
  color: #6a9066;
  &:hover {
    color: #70946c;
  }
`;

const Caption = styled.div`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
  color: #6d5b48;
`;

const PlansContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const PlanButton = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 40px;
  color: #6d5b48;
  transition: border 0.2s;
  &:hover {
    border: 1px solid #6d5b48;
  }
`;

const PlanSpan = styled.span`
  margin-left: 10px;
  font-size: 24px;
`;
