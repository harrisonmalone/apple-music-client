import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  .form-group {
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
    label {
      font-size: x-large;
      margin-bottom: 5px;
    }
    input {
      height: 25px;
      font-size: 20px;
    }
  }
  #submit {
    width: 100px;
    height: 40px;
  }
`;
