import React, { useState } from "react";
import Post1 from "./Post1";
import Post2 from "./Post2";

function App() {
  const [currentPage, setCurrentPage] = useState<JSX.Element>();

  return (
    <div>
      <button onClick={() => setCurrentPage(<Post1 />)}>Post 1</button>
      <button onClick={() => setCurrentPage(<Post2 />)}>Post 2</button>
      <br />
      <br />
      <br />
      {currentPage}
    </div>
  );
}

export default App;
