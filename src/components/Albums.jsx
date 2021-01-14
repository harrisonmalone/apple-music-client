import React, { useEffect, useState } from "react";
import {
  createAlbumYearGroups,
  sortAlbumsByTitle,
  createAlbumLetterGroups,
} from "../utils/sortAlbums";
import { Year } from "./Year";
import { Album } from "./Album";
import { RouterLink } from "../styles/Albums";
import { fetchFromApple } from "../utils/seedMusic";
import { AlbumContainer } from "../styles/Year";

export function Albums() {
  const [albums, setAlbums] = useState(null);
  const [albumYearGroups, setAlbumYearGroups] = useState(null);
  const [seedingRequired, setSeedingRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [albumLetterGroups, setAlbumLetterGroups] = useState(null);

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
        handleSorting(fetchedAlbums);
      })
      .catch((err) => console.log(err));
  }

  function handleSorting(fetchedAlbums) {
    const sort = localStorage.getItem("sort");
    if (sort === "0") {
      setAlbumYearGroups(createAlbumYearGroups(fetchedAlbums));
      setAlbums(fetchedAlbums);
    } else if (sort === "1") {
      setAlbumYearGroups(createAlbumYearGroups(fetchedAlbums.reverse()));
      setAlbums(fetchedAlbums);
    } else {
      const sortedByTitle = sortAlbumsByTitle(fetchedAlbums);
      setAlbumLetterGroups(createAlbumLetterGroups(sortedByTitle));
      setAlbums(fetchedAlbums);
    }
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
          handleSorting(fetchedAlbums);
        })
        .catch((err) => console.log(err));
    }
    fetchAlbums();
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

  function renderLettersAndAlbums() {
    return albumLetterGroups.map((albumLetterGroup, index) => {
      return (
        <div>
          <h2>
            {parseInt(albumLetterGroup[0].title.substring(0, 1))
              ? "#"
              : albumLetterGroup[0].title.substring(0, 1)}
          </h2>
          <AlbumContainer>
            {albumLetterGroup.map((album) => {
              return <Album album={album} key={album.index} />;
            })}
          </AlbumContainer>
        </div>
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
          {albumLetterGroups
            ? renderLettersAndAlbums()
            : renderYearsAndAlbums()}
        </>
      )
    );
  }
}
