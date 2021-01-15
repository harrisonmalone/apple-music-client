import React, { useEffect, useState } from "react";
import { AppleMusicData } from "./AppleMusicData";
import { fetchFromApple } from "../utils/seedMusic";
import { SettingsLink } from '../styles/App'

export function Settings() {
  const [appleMusic, setAppleMusic] = useState(
    JSON.parse(localStorage.getItem("appleMusic")) || []
  );
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(null);

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
  }, [checked]);

  useEffect(() => {
    const sort = localStorage.getItem("sort");
    if (sort === "1") {
      setChecked([false, true, false]);
    } else if (sort === "2") {
      setChecked([false, false, true]);
    } else {
      setChecked([true, false, false]);
    }
  }, []);

  function setSortInLocalStorage(e) {
    e.preventDefault()
    localStorage.setItem("sort", checked.indexOf(true));
  }

  return checked && (
    <>
      <h3>Sorting</h3>
      <div>
        <form onSubmit={setSortInLocalStorage}>
          <div style={{ margin: "10px 0px"}}>
            <input
              type="radio"
              name="sorting"
              id="0"
              value="order"
              checked={checked[0]}
              onChange={setCheckedCallback}
            />
            <label htmlFor="reverse-order">Sort in order by year</label>
          </div>
          <div style={{ margin: "10px 0px"}}>
            <input
              type="radio"
              name="sorting"
              id="1"
              value="reverse-order"
              checked={checked[1]}
              onChange={setCheckedCallback}
            />
            <label htmlFor="reverse-order">Sort in reverse order by year</label>
          </div>
          <div style={{ margin: "10px 0px"}}>
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
          </div>
          <div style={{ margin: "10px 0px"}}>
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
      <hr/>
      <h3>Apple Music</h3>
      <div>
        <SettingsLink to="/settings" onClick={fetchData}>
          Fetch data
        </SettingsLink>
      </div>
      <div>
        <SettingsLink
          to="/settings"
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("appleMusic");
          }}
        >
          Remove local storage
        </SettingsLink>
      </div>
      <AppleMusicData appleMusic={appleMusic} loading={loading} />
    </>
  );
}
