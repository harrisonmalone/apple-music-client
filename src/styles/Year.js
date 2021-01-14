import styled from "styled-components";

export const AlbumContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid black;
  @media only screen and (max-width: 915px) {
    justify-content: center;
  }
`;
