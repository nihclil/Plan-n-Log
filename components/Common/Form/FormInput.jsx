import styled from "styled-components";

export default function FormInput({
  label,
  name,
  type,
  register,
  errors,
  width,
  isRequired,
}) {
  return (
    <InputContainer width={width}>
      <Label>
        {label}
        <Input type={type} {...register(name, { required: isRequired })} />
      </Label>
      {isRequired && errors && errors[name] && (
        <ErrorMessage>This field is required</ErrorMessage>
      )}
    </InputContainer>
  );
}

const InputContainer = styled.div`
  width: ${({ width }) => width};
  margin-bottom: 40px;
  margin-right: 10px;
  @media (min-width: 360px) and (max-width: 900px) {
    width: 100%;
  }
`;

const Label = styled.label`
  color: #6d5b48;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-top: 10px;
  height: 50px;
  padding: 10px;
  border: 1px solid #e4ddd6;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: #de6161;
  margin-top: 10px;
`;
