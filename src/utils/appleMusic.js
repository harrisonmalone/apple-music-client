export function setupMusicKit() {
  return new Promise((resolve) => {
    if (window.MusicKit) {
      const musicKitInstance = window.MusicKit.configure({
        developerToken: process.env.REACT_APP_APPLE_DEV_TOKEN,
        app: {
          name: "MusicKit Web App",
          build: "1.0.0",
        },
      });
      resolve(musicKitInstance);
    }
  });
}
