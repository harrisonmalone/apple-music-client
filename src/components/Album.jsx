import { AlbumDiv, Artwork, Name } from "../styles/Album";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export function Album({ album }) {
  const history = useHistory();
  return (
    <AlbumDiv>
      <div style={{ margin: "0px 10px" }}>
        <Name>
          <a href={album.wikipedia} target="_blank" rel="noreferrer">
            {album.artist} - {album.title}
          </a>
        </Name>
        <Artwork imageUrl={album.image_url} />
        <div style={{ margin: "10px 0px" }}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              localStorage.setItem("scrollY", window.scrollY);
              history.push(`/albums/${album.id}`, { album });
            }}
          />
        </div>
      </div>
    </AlbumDiv>
  );
}
