import { AlbumDiv, Artwork } from "../styles/Album";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export function Album({ album }) {
  const history = useHistory();
  return (
    <AlbumDiv>
      <div style={{ margin: "0px 10px" }}>
        {album.wikipedia ? (
          <a href={album.wikipedia}>
            <Artwork imageUrl={album.image_url} />
          </a>
        ) : <Artwork imageUrl={album.image_url} />}
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
