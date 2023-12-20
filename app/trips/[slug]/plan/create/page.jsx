"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import useAuthRedirect from "hooks/useAuthRedirect";
import PlanTypeButton from "components//Common/Buttons/PlanTypeButton";

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
        <PlanTypeButton
          linkHref={`/trips/${params.slug}/activity/create`}
          ImageSrc="/iconmonstr-friend-4-32.png"
          ImageAlt="activity"
          span="Activity"
        />
        <PlanTypeButton
          linkHref={`/trips/${params.slug}/lodging/create`}
          ImageSrc="/iconmonstr-bed-2-32.png"
          ImageAlt="lodging"
          span="Lodging"
        />
        <PlanTypeButton
          linkHref={`/trips/${params.slug}/flight/create`}
          ImageSrc="/iconmonstr-airport-2-32.png"
          ImageAlt="flight"
          span="Flight"
        />
      </PlansContainer>
    </Main>
  );
}

const Main = styled.div`
  width: 1000px;
  margin: 50px auto;
  @media (min-width: 360px) and (max-width: 1200px) {
    width: auto;
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  @media (min-width: 360px) and (max-width: 1200px) {
    width: 90%;
    margin: 0 auto 60px auto;
  }
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
  @media (min-width: 360px) and (max-width: 1200px) {
    width: 90%;
    margin: 0 auto 30px auto;
  }
`;

const PlansContainer = styled.div`
  display: flex;
  gap: 40px;
  @media (min-width: 700px) and (max-width: 1200px) {
    width: 90%;
    margin: auto;
  }
  @media (min-width: 360px) and (max-width: 700px) {
    width: 90%;
    flex-direction: column;
    width: 180px;
    margin: 0 auto 0 auto;
  }
`;
