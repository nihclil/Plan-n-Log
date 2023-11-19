"use client";

import styled from "styled-components";

export default function Home() {
  return (
    <Main>
      <IntroArea>
        <IntroContent></IntroContent>
      </IntroArea>
    </Main>
  );
}

const Main = styled.main`
  background-color: #e4ddd6;
`;

const IntroArea = styled.div`
  height: 90vh;
`;

const IntroContent = styled.div``;
