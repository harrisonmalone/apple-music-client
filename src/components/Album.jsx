import { AlbumDiv, Artwork } from "../styles/Album";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { setupMusicKit } from "../utils/appleMusic";

export function Album({ album }) {
  const history = useHistory();
  const appleMusic = JSON.parse(localStorage.getItem("appleMusic"));

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
          <FontAwesomeIcon
            icon={faPlay}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              const appleMusicAlbum = appleMusic.find((a) => {
                return a.attributes.name === album.title
              })
              if (!appleMusicAlbum) {
                alert("Album can't be played!")
                return
              }
              setupMusicKit()
              .then((music) => {
                music.setQueue({ album: appleMusicAlbum.id })
                .then(() => {
                  music.play();
                })
              })
            }}
          />
        </div>
      </div>
    </AlbumDiv>
  );
}
