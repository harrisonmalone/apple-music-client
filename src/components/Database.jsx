import React, { useState, useEffect } from "react";
import { fetchFromApple } from "../utils/seedMusic";
import { RouterLink } from "../styles/Albums";

export function Database() {
  const [appleMusic, setAppleMusic] = useState(
    JSON.parse(localStorage.getItem("appleMusic"))
  );
  const [db, setDb] = useState([]);
  const [loading, setLoading] = useState(false);
  // true for db false for apple music
  const [selection, setSelection] = useState(true);
  const [checkedAlbumIds, setCheckedAlbumsIds] = useState([]);

  function getDbAlbums() {
    setCheckedAlbumsIds([]);
    setSelection(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/albums`)
      .then((res) => res.json())
      .then((fetchedAlbums) => {
        setDb(fetchedAlbums);
      });
  }

  useEffect(() => {
    setLoading(true);
    getDbAlbums();
    if (appleMusic) {
      setLoading(false);
    } else {
      fetchFromApple()
        .then((albums) => {
          localStorage.setItem("appleMusic", JSON.stringify(albums));
          setAppleMusic(albums);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [appleMusic]);

  function handleChecked(e) {
    if (!checkedAlbumIds.includes(e.target.id)) {
      setCheckedAlbumsIds([...checkedAlbumIds, e.target.id]);
    } else {
      setCheckedAlbumsIds(checkedAlbumIds.filter((id) => id !== e.target.id));
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    const albums = checkedAlbumIds.map((id) => {
      if (selection) {
        return db.find((album) => {
          return album.id === parseInt(id);
        });
      } else {
        return appleMusic.find((album) => album.id === id);
      }
    });
    if (selection) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/albums/destroy`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ albums }),
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/albums/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ albums }),
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      db && (
        <>
          <div>
            <RouterLink
              to="/db"
              onClick={getDbAlbums}
              style={selection ? { backgroundColor: "yellow" } : {}}
            >
              Database
            </RouterLink>
            <RouterLink
              to="/db"
              onClick={() => {
                setCheckedAlbumsIds([]);
                setSelection(false);
              }}
              style={!selection ? { backgroundColor: "yellow" } : {}}
            >
              Apple Music
            </RouterLink>
          </div>
          <div>
            {selection ? (
              <h3>Remove an album from database</h3>
            ) : (
              <h3>Add an album to database</h3>
            )}
          </div>
          <form onSubmit={onFormSubmit}>
            <input type="submit" value="Submit" />
            {selection &&
              db.map((album, index) => {
                return (
                  <div style={{ margin: "10px 0px" }} key={index}>
                    <input
                      type="checkbox"
                      name={album.title}
                      id={album.id}
                      onChange={handleChecked}
                    />
                    <label htmlFor={album.id}>
                      {album.artist} - {album.title}
                    </label>
                  </div>
                );
              })}
            {!selection &&
              appleMusic.map((album, index) => {
                return (
                  <div style={{ margin: "10px 0px" }} key={index}>
                    <input
                      type="checkbox"
                      name={album.attributes.name}
                      id={album.id}
                      onChange={handleChecked}
                    />
                    <label htmlFor={album.id}>
                      {album.attributes.artistName} - {album.attributes.name}
                    </label>
                  </div>
                );
              })}
          </form>
        </>
      )
    );
  }
}
