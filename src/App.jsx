import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from "./assets/Components/search";
import UserDetails from "./assets/Components/userDetails";
import {
  ArrowRightIcon
} from '@chakra-ui/icons';
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const getData = () => {
    const [newState, setNewState] = React.useState([]);

    React.useEffect(() => {
      axios
        .get("https://api.github.com/users/Cetezin/repos")
        .then((res) => {
          const repos = res.data;
          setNewState(repos);
          console.log(repos[7].html_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    return [newState];
  };

  const [newState] = getData("repos");
  // console.log(state[0].name)

  const [state, setState] = React.useState(0);
  const [position, setPosition] = React.useState(2);
  const [url, getURL] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://api.github.com/users/Cetezin/repos")
      .then((res) => {
        const repos = res.data;
        const myRepo = repos[position];
        const userURL = myRepo.url;
        setState(myRepo);
        console.log(userURL);

        axios
          .get(userURL)
          .then((url) => {
            getURL(url);
            console.log(url.data.archived);
            console.log(url.data.subscribers_count);
            console.log(url);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [position]);

  function Home() {
    const navigate = useNavigate();

    // handle navigation in the about page
    const handleNavigate = (event) => {
      event.preventDefault();
      navigate("/about");
    };

    return (
      <div className="container">
        <section className="home-container">
          <SearchBar />
          <div className="main">
            <div className="state">
              <h3>My Git Respository</h3>
              <hr></hr>
              <br></br>
              <h1>{state.name}</h1>
              <br></br>
              <button onClick={handleNavigate}>Explore</button>
              <br></br>
            </div>
            <br></br>
            
            <ArrowRightIcon onClick={next} color="white" boxSize={4} />
          </div>
        </section>
      </div>
    );
  }

  function SearchBar() {
    const [query, setQuery] = React.useState("");

    return (
      <section className="search-box">
        <div>
          <input
            type="text"
            className="search"
            placeholder="enter search"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="box">
          {newState
            .filter((post) => {
              if (query === "") {
                return post;
              } else if (
                post.name.toLowerCase().includes(query.toLowerCase())
              ) {
                return post;
              }
            })
            .map((post, index) => {
              return (
                <div className="post" key={index}>
                  <p><a href={post.html_url}>{post.name}</a></p>
                </div>
              );
            })}
        </div>
      </section>
    );
  }

  function About() {
    return (
      <section className="about-container">
        <UserDetails
          url={url.data.subscribers_count}
          branch={url.data.default_branch}
          name={url.data.name}
          description={url.data.description}
          full_name={url.data.full_name}
          created_at={url.data.created_at}
          id={url.data.id}
          language={url.data.language}
          open_issues={url.data.open_issues}
          owner={url.data.owner.login}
          visibility={url.data.visibility}
          watchers={url.data.watchers}
          forks={url.data.forks}
        />
        <Navigation />
      </section>
    );
  }

  function Navigation() {
    return (
      <section className="nav">
        <NavLink className="navigate" to="/">
          <button className="home-button">Home</button>
        </NavLink>
        <NavLink className="navigate" to="/about"></NavLink>
      </section>
    );
  }

  function next(e) {
    e.preventDefault();
    setPosition((prev) => prev + 1);
    if (position > 14) {
      setPosition(0);
    }
  }

  return (
    <section className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </section>
  );
}

export default App;
