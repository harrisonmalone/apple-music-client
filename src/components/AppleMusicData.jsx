import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { SettingsLink } from '../styles/App'

export function AppleMusicData({ appleMusic, loading }) {
  const [checkedAlbumIds, setCheckedAlbumsIds] = useState([]);
  const history = useHistory()

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
      return appleMusic.find((album) => album.id === id);
    });
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/albums/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ albums }),
      });
      history.push("/")
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      (
        <>
          <form style={{ height: "400px", overflow: "scroll", margin: "20px 0px", border: "1px solid black" }}>
            {appleMusic.map((album, index) => {
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
          <SettingsLink to="/" onClick={onFormSubmit}>Add new albums</SettingsLink>
        </>
      )
    );
  }
}

// try {
//   await fetch(`${process.env.REACT_APP_BACKEND_URL}/albums/destroy`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ albums }),
//   });
// } catch (err) {
//   console.log(err);
// }
