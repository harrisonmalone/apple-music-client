import React, { useState } from "react";
import { AlbumDiv, Artwork } from "../styles/Album";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPlay,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { setupMusicKit } from "../utils/appleMusic";

export function Album({ album }) {
  const history = useHistory();
  const [stop, setStop] = useState(false);
  const [musicKitInstance, setMusicKitInstance] = useState(null);

  return (
    <AlbumDiv>
      <div style={{ margin: "0px 10px" }}>
        {album.wikipedia ? (
          <a href={album.wikipedia} target="_blank" rel="noreferrer">
            <Artwork imageUrl={album.image_url} />
          </a>
        ) : (
          <Artwork imageUrl={album.image_url} />
        )}
        <div style={{ margin: "10px 0px" }}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{ cursor: "pointer", marginRight: "10px" }}
            onClick={(e) => {
              history.push(`/albums/${album.id}`, { album });
            }}
          />
          {stop ? (
            <FontAwesomeIcon
              icon={faStop}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                musicKitInstance.stop();
                setStop(false);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlay}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                if (!album.apple_music_id) {
                  alert("Album can't be played!");
                  return;
                }
                setupMusicKit().then((music) => {
                  music.setQueue({ album: album.apple_music_id }).then(() => {
                    music.play();
                    setStop(true);
                    setMusicKitInstance(music);
                  });
                });
              }}
            />
          )}
        </div>
      </div>
    </AlbumDiv>
  );
}
