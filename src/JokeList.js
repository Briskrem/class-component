import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

function JokeList({ numJokesToGet = 10 }) {
  const [jokes, setJokes] = useState([]);
 
  /* get jokes if there are no jokes */
console.log(jokes, numJokesToGet, 1)
  useEffect(function() {
    console.log(jokes, numJokesToGet, 2)
    async function getJokes() {
      let j = [...jokes];
      let seenJokes = new Set();
      //async function only runs when a new joke list is generated even though the state changed from
      //upvotes and caused the useEffect to run
      try {
        while (j.length < numJokesToGet) {
          console.log(jokes, numJokesToGet, 3)
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { status, ...jokeObj } = res.data;
  
          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        console.log(jokes, numJokesToGet, 4)
        setJokes(j);
      } catch (e) {
        console.log(e);
      }
    }

    if (jokes.length === 0) getJokes();
  }, [jokes, numJokesToGet]);

  /* empty joke list and then call getJokes */

  function generateNewJokes() {
    console.log(6)
    setJokes([]);
  }

  /* change vote for this id by delta (+1 or -1) */

  function vote(id, delta) {
    setJokes(allJokes =>
      allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  }
  console.log(jokes, numJokesToGet, 5)
  /* render: either loading spinner or list of sorted jokes. */

  if (jokes.length) {
    let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
    console.log(jokes, numJokesToGet, 8)
    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={generateNewJokes}>
          Get New Jokes
        </button>
  
        {sortedJokes.map(j => (
          
          <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
        ))}
      </div>
    );
  }

  return null;

}

export default JokeList;
