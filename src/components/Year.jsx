import { AlbumContainer } from "../styles/Year";

export function Year({ albumYearGroup, children }) {
  return (
    <div>
      <h1>{albumYearGroup[0].year}</h1>
      <AlbumContainer>{children}</AlbumContainer>
    </div>
  );
}
