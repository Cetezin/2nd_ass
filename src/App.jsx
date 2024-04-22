import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from "./assets/Components/search";
import UserDetails from "./assets/Components/userDetails";
import {
  Heading,
  Stack,
  Box,
  Text,
  StackDivider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
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

    function SearchBar() {
      const [query, setQuery] = React.useState("");
      const input = document.querySelector(".search");
      // console.log(input.value)

      return (
        <section>
          <div>
            <input
              type="text"
              className="search"
              placeholder="enter search"
              // value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {/* <button onClick={event=>setQuery(input.value)}>search</button> */}
          </div>
          <div className="box">
            {newState
              .filter((post) => {
                if (query === "") {
                  return
                } else if (
                  post.name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return post;
                }
              })
              .map((post, index) => {
                return (
                  <div key={index}>
                    <p>{post.name}</p>
                  </div>
                );
              })}
          </div>
        </section>
      );
    }

    return (
      <>
        <section className="home-container">
          <SearchBar />
          <div className="main">
            <div className="repos">
              <Card>
                <CardHeader>
                  <Heading size="md">My GitHub Repos</Heading>
                </CardHeader>

                <CardBody>
                  <Box>
                    {newState.map((app) => {
                      return (
                        <Stack divider={<StackDivider />} spacing="4">
                          <div className="git-names">
                            <Text pt="2" fontSize="sm">
                              <a href={app.html_url}>{app.name}</a>
                            </Text>
                          </div>
                        </Stack>
                      );
                    })}
                  </Box>
                </CardBody>
              </Card>
            </div>
            <Card>
              <CardBody>
                <div className="state">
                  <Heading>
                    <h1>{state.name}</h1>
                  </Heading>
                  <br></br>
                  <button onClick={handleNavigate}>Explore</button>
                  <br></br>
                </div>
              </CardBody>
            </Card>
          </div>
            <div className="btn-element">
              <button className="next" onClick={next}>
                next
              </button>
            </div>
        </section>
      </>
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
