import { AlbumContainer } from "../styles/Year";

export function Year({ albumYearGroup, children }) {
  return (
    <div>
      <h2>{albumYearGroup[0].year}</h2>
      <AlbumContainer>{children}</AlbumContainer>
    </div>
  );
}
