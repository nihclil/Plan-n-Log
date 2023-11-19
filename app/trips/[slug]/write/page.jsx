"use client";

import Tiptap from "components/Tiptap";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <TripInfo></TripInfo>
      <Tiptap />
    </Container>
  );
}

const Container = styled.div`
  width: 1200px;
  height: 80vh;
  margin: 50px auto 0px auto;
  /* background-color: antiquewhite; */
  display: flex;
`;

const TripInfo = styled.div`
  width: 500px;
  background-color: #cbdada;
`;
