"use client";

import styled from "styled-components";

export default function TripBtn({ children }) {
  return <TripButton>{children}</TripButton>;
}

const TripButton = styled.button`
  border: 0;
  border-radius: 20px;
  padding: 10px 20px;
  background-color: #d1bea9;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  margin-right: 30px;
`;
