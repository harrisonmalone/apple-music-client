import styled from "styled-components";

export const AlbumDiv = styled.div`
  width: 300px;
  margin: 20px 0px;
`;

export const Name = styled.p`
  margin: 10 0px;
  height: 70px;
  a {
    color: black;
    text-decoration: none;
    border-bottom: 1px dashed black;
    font-size: medium;
  }
`;

export const Artwork = styled.div.attrs((props) => ({
  style: {
    backgroundImage: `url(${props.imageUrl})`,
  },
}))`
  height: 300px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid brown;
`;
