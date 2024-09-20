import "./App.css";
import "flowbite";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Posts from "./page/Posts";
import Products from "./page/Products";
// import Edits from "./page/Edits.jsx";
import React from "react";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/products" element={<Products />} />
            <Route path="/posts" element={<Posts />} />
            {/* <Route path="/edits">
              <Route path=":id" element={<Edits />} />
            </Route> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
