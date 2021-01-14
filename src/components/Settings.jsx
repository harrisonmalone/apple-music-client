import React, { useEffect, useState } from "react";
import { AppleMusicData } from "./AppleMusicData";
import { fetchFromApple } from "../utils/seedMusic";

export function Settings() {
  const [appleMusic, setAppleMusic] = useState(
    JSON.parse(localStorage.getItem("appleMusic")) || []
  );
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState([true, false, false]);

  function fetchData(e) {
    e.preventDefault();
    setLoading(true);
    fetchFromApple()
      .then((albums) => {
        localStorage.setItem("appleMusic", JSON.stringify(albums));
        setAppleMusic(albums);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function setCheckedCallback(e) {
    const newChecked = checked.map((check, index) => {
      if (index === parseInt(e.target.id)) {
        return true;
      } else {
        return false;
      }
    });
    setChecked(newChecked);
  }

  useEffect(() => {
    localStorage.setItem("sort", checked.indexOf(true))
  }, [checked])

  console.log(checked);
  return (
    <>
      <h2>Sorting</h2>
      <div>
        <form>
          <input
            type="radio"
            name="sorting"
            id="0"
            value="order"
            checked={checked[0]}
            onChange={setCheckedCallback}
          />
          <label htmlFor="reverse-order">Sort in order by year</label>
          <input
            type="radio"
            name="sorting"
            id="1"
            value="reverse-order"
            checked={checked[1]}
            onChange={setCheckedCallback}
          />
          <label htmlFor="reverse-order">Sort in reverse order by year</label>
          <input
            type="radio"
            name="sorting"
            id="2"
            value="alphabetical-album-order"
            checked={checked[2]}
            onChange={setCheckedCallback}
          />
          <label htmlFor="alphabetical-album-order">
            Sort alphabetically by album name
          </label>
        </form>
      </div>
      <h2>Apple Music</h2>
      <div>
        <a href="/settings" onClick={fetchData}>
          Fetch data
        </a>
      </div>
      <div>
        <a
          href="/settings"
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("appleMusic");
          }}
        >
          Remove local storage
        </a>
      </div>
      <AppleMusicData appleMusic={appleMusic} loading={loading} />
    </>
  );
}
