import { setupMusicKit } from "./appleMusic";
import { getAlbums } from "./getAlbums";
import { addYearKeyToAlbum, sortAlbumsByYear, getAlbumArt } from "./sortAlbums";

export async function fetchFromApple() {
  try {
    const musicKit = await setupMusicKit();
    const flattenedAlbums = await getAlbums(musicKit);
    addYearKeyToAlbum(flattenedAlbums);
    const sortedAlbums = sortAlbumsByYear(flattenedAlbums);
    const images = await getAlbumArt(sortedAlbums);
    sortedAlbums.forEach((album, index) => {
      album.imageUrl = images[index];
    });
    return sortedAlbums;
  } catch (err) {
    console.log(err);
  }
}
