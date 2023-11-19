import React, { useContext, useEffect, useState } from "react";

import "./Navbar.css";
import Navlinks from "./Navlinks";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { getSuggestionsAPI } from "../../services/productServices";

const Navbar = () => {
  const [search, setsearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const { cart } = useContext(CartContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const delaySuggestinos = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((err) => console.log(err));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delaySuggestinos);
  }, [search]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedItem((current) =>
        current === suggestions.length - 1 ? 0 : current + 1
      );
    } else if (e.key === "ArrowUp") {
      setSelectedItem((current) =>
        current === 0 ? suggestions.length - 1 : current - 1
      );
    } else if (e.key === "Enter" && selectedItem > -1) {
      const suggestion = suggestions[selectedItem];
      navigate(`/products?search=${suggestion.title}`);
      setsearch("");
      setSuggestions([]);
    }
  };

  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">Cartwish</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
              setSelectedItem(0);
            }}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <button type="submit" className="search_button">
            Search
          </button>
          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setsearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="align_center navbar_links">
        <Navlinks title="Home" link="/" />
        <Navlinks title="Products" link="/products" />
        {!user && (
          <>
            <Navlinks title="Login" link="/login" />
            <Navlinks title="Signup" link="/signup" />
          </>
        )}
        {user && (
          <>
            <Navlinks title="My Orders" link="/myorders" />
            <Navlinks title="Logout" link="/logout" />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
