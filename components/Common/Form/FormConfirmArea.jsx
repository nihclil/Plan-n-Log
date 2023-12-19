import styled from "styled-components";
import Link from "next/link";

export default function FormConfirmArea({ cancelLink }) {
  return (
    <ConfirmContainer>
      <Link href={cancelLink}>
        <CancelButton>Cancel</CancelButton>
      </Link>
      <SaveButton type="submit">Save</SaveButton>
    </ConfirmContainer>
  );
}

const ConfirmContainer = styled.div`
  padding-top: 20px;
`;

const CancelButton = styled.button`
  border: 0;
  background-color: transparent;
  margin-right: 40px;
  font-size: 20px;
  cursor: pointer;
  color: #d1bea9;
  padding: 10px 20px;
  border-radius: 20px;
`;

const SaveButton = styled.button`
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  background-color: #d1bea9;
  padding: 10px 20px;
  border-radius: 20px;
  border: 0;
  color: #6d5b48;
`;
