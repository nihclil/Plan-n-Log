import styled from "styled-components";

interface Props {
  isSelected: boolean;
  onClick: () => void;
  children: string;
}

export default function TripStatusButton({
  children,
  isSelected,
  onClick,
}: Props) {
  return (
    <TripButton isSelected={isSelected} onClick={onClick}>
      {children}
    </TripButton>
  );
}

const TripButton = styled(({ isSelected, ...props }: Props) => (
  <button {...props} />
))`
  border: ${(props) => (props.isSelected ? "2px solid #928677" : "0")};
  border-radius: 20px;
  padding: 10px 20px;
  background-color: #d1bea9;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  margin-right: 30px;
  cursor: pointer;
`;
