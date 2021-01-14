import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  font-family: sans-serif;
  font-size: large;
`;

export const Header = styled.a`
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

export const Nav = styled.nav`
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  position: sticky; 
  top: 0; 
  background: white;
`

export const SettingsLink = styled.a`
  color: black;
  border-bottom: 1px dotted black;
  text-decoration: none;
`