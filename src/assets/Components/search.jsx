import React from "react";

function SearchBar() {
  const [query, setQuery] = React.useState("");
  
  function search(e) {
    e.preventDefault();
    const input = document.querySelector(".search")
    // setQuery(e.target.value.toLowerCase());
    console.log(input.value)
  }
  return (
    <div>
      <input
        type="text"
        className="search"
        // value={query}d
      />
      <button onClick={search}>search</button>
    </div>
  );
}

export default SearchBar;
