import React, { useEffect, useState } from "react";
import { createAlbumYearGroups } from "../utils/sortAlbums";
import { Year } from "./Year";
import { Album } from "./Album";
import { ButtonContainer, RouterLink } from "../styles/Albums";
import { fetchFromApple } from "../utils/seedMusic";

export function Albums() {
  const [albums, setAlbums] = useState(null);
  const [albumYearGroups, setAlbumYearGroups] = useState(null);
  const [seedingRequired, setSeedingRequired] = useState(false);
  const [loading, setLoading] = useState(false);

  function fetchAlbums() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/albums`)
      .then((res) => res.json())
      .then((fetchedAlbums) => {
        if (fetchedAlbums.length === 0) {
          setSeedingRequired(true);
        } else {
          setSeedingRequired(false);
          setLoading(false);
        }
        setAlbumYearGroups(createAlbumYearGroups(fetchedAlbums));
        setAlbums(fetchedAlbums);
      })
      .catch((err) => console.log(err));
  }

  function getAppleMusic(e) {
    e.preventDefault();
    setLoading(true);
    fetchFromApple()
      .then((albums) => {
        localStorage.setItem("appleMusic", JSON.stringify(albums));
        fetch(`${process.env.REACT_APP_BACKEND_URL}/albums/seed`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ albums }),
        }).then((res) => {
          if (res.status === 200) {
            fetchAlbums();
          }
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("scrollY")) {
      setTimeout(() => {
        window.scrollTo(0, localStorage.getItem("scrollY"));
        localStorage.removeItem("scrollY");
      }, 600);
    }
  }, []);

  function renderYearsAndAlbums() {
    return albumYearGroups.map((albumYearGroup, index) => {
      return (
        <Year albumYearGroup={albumYearGroup} key={index}>
          {albumYearGroup.map((album) => {
            return <Album album={album} key={album.index} />;
          })}
        </Year>
      );
    });
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (seedingRequired) {
    return (
      <div>
        <RouterLink to="/" onClick={getAppleMusic}>
          Seed Library
        </RouterLink>
      </div>
    );
  } else {
    return (
      albums && (
        <>
          <ButtonContainer>
            <RouterLink to="/db">Update Library</RouterLink>
          </ButtonContainer>
          {renderYearsAndAlbums()}
        </>
      )
    );
  }
}
