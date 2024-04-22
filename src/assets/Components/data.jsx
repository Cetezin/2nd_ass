import React from "react";

const getData = () => {
    const [newState, setNewState] = React.useState([]);

    React.useEffect(() => {
      axios
      .get("https://api.github.com/users/Cetezin/repos")
      .then((res)=>{
        const repos = res.data
        setNewState(repos)
        console.log(repos[7].name)
      })
      .catch((err)=>{
        console.log(err)
      })
    }, [])
    return [newState]
  };


  export default getData