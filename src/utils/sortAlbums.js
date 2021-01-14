import albumArt from "album-art";

export function addYearKeyToAlbum(flattenedAlbums) {
  flattenedAlbums.forEach((album) => {
    if (!album.attributes.releaseDate) {
      album.year = "3000";
    } else {
      album.year = album.attributes.releaseDate.substring(0, 4);
    }
  });
}

export function getTotalTracks(flattenedAlbums) {
  return flattenedAlbums.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.attributes.trackCount;
  }, 0);
}

export function sortAlbumsByYear(flattenedAlbums) {
  return flattenedAlbums.sort((a, b) => {
    if (a.year < b.year) {
      return -1;
    } else {
      return 1;
    }
  });
}

export function getAlbumArt(sortedAlbumsByYear) {
  return new Promise((resolve, reject) => {
    const artwork = sortedAlbumsByYear.map((album) => {
      return albumArt(album.attributes.artistName, {
        album: album.attributes.name,
      });
    });
    Promise.all(artwork)
      .then((images) => {
        const parsedArtwork = images.map((image) => {
          if (typeof image !== "string") {
            return "";
          } else {
            return image;
          }
        });
        resolve(parsedArtwork);
      })
      .catch((err) => reject(err));
  });
}

export function createAlbumYearGroups(sortedAlbumsByYear) {
  const chunkedAlbums = [];
  let group = [];
  sortedAlbumsByYear.forEach((album, index) => {
    album.index = index;
    if (sortedAlbumsByYear[index + 1]?.year !== album.year) {
      group.push(album);
      chunkedAlbums.push(group);
      group = [];
    } else {
      group.push(album);
    }
  });
  return chunkedAlbums;
}
