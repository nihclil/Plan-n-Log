"use client";

import Image from "next/image";
import Link from "next/link";
import activity from "public/iconmonstr-friend-4-32.png";
import lodging from "public/iconmonstr-bed-2-32.png";
import flight from "public/iconmonstr-airport-2-32.png";
import styled from "styled-components";

export default function Home({ params }) {
  return (
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
  );
}

const PlansContainer = styled.div`
  width: 1000px;
  margin: 50px auto;
  display: flex;
  gap: 20px;
`;

const PlanButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 40px;
  color: #6d5b48;

  &:hover {
    border: 2px solid #6d5b48;
  }
`;

const PlanSpan = styled.span`
  margin-left: 10px;
  font-size: 24px;
`;
