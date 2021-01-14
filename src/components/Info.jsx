import React, { useState } from "react";
import { Form } from "../styles/Info";
import { Button } from "../styles/Albums";
import { useHistory } from "react-router-dom";

export function Info(props) {
  const history = useHistory();
  const album = props.location.state.album;
  const [id] = useState(album.id);
  const [artist, setArtist] = useState(album.artist);
  const [title, setTitle] = useState(album.title);
  const [year, setYear] = useState(album.year);
  const [image, setImage] = useState(album.image_url);
  const [wikipedia, setWikipedia] = useState(album.wikipedia);
  const [pitchfork, setPitchfork] = useState(album.pitchfork);

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/albums/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          artist,
          title,
          year,
          image,
          wikipedia,
          pitchfork,
        }),
      });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>Info</h2>
      <Form>
        <div className="form-group">
          <label htmlFor="title">Artist</label>
          <input
            type="text"
            name="artist"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Image</label>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Year</label>
          <input
            type="text"
            name="image"
            id="image"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="wikipedia">Wikipedia</label>
          <input
            type="text"
            name="wikipedia"
            id="wikipedia"
            value={wikipedia}
            onChange={(e) => setWikipedia(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pitchfork">Pitchfork</label>
          <input
            type="text"
            name="pitchfork"
            id="pitchfork"
            value={pitchfork}
            onChange={(e) => setPitchfork(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit" onClick={onFormSubmit}>
            Edit
          </Button>
          <Button
            href="/"
            onClick={(e) => {
              history.goBack();
            }}
          >
            Back
          </Button>
        </div>
      </Form>
    </>
  );
}
