import styled from "styled-components";
import { Link } from "react-router-dom";

export const ButtonContainer = styled.div`
  margin: 10px 0px;
`;

export const Button = styled.a`
  text-decoration: none;
  color: black;
  padding: 10px;
  background: lightgray;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
`;

export const RouterLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 10px;
  background: lightgray;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
`;
