export function getAlbums(musicKit) {
  const fetchedAlbums = [];
  return new Promise((resolve) => {
    musicKit.authorize().then(() => {
      musicKit.api.library.albums({ limit: 100 }).then((albumsOne) => {
        fetchedAlbums.push(albumsOne);
        musicKit.api.library
          .albums({ limit: 100, offset: 100 })
          .then((albumsTwo) => {
            fetchedAlbums.push(albumsTwo);
            musicKit.api.library
              .albums({ limit: 100, offset: 200 })
              .then((albumsThree) => {
                fetchedAlbums.push(albumsThree);
                resolve(fetchedAlbums.flat());
              });
          });
      });
    });
  });
}
