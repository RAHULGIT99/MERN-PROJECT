import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItem, setWishlistItem] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [error, setError] = useState("");

  // Retrieve the user's name from the decoded token
  const location = useLocation();
  const decodedToken = location.state || {};
  const decodedToke = decodedToken.user
  console.log(decodedToke);
  const userName = decodedToke?.name || "User";

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
    }
  }, []);

  // Save wishlist to localStorage whenever it updates
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlist]);

  const handleAdd = () => {
    if (wishlist.length >= 10) {
      setError("You cannot add more than 10 items to your wishlist.");
      return;
    }

    if (wishlistItem.trim() === "") {
      setError("Wishlist item cannot be empty.");
      return;
    }

    if (wishlist.includes(wishlistItem)) {
      setError("This item is already in your wishlist.");
      return;
    }

    // Removed direct state update for adding items
    fetch("http://localhost:4000/user_wish_list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: wishlistItem, req_type: "add", name: userName ,role:decodedToke.role}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add item to the wishlist.");
        }
        console.log("Item added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while adding the item. Please try again.");
      });

    setWishlistItem("");
    setError("");
  };

  const handleRemove = (itemToRemove) => {
    fetch("http://localhost:4000/user_wish_list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: itemToRemove, req_type: "remove", name: userName,role:decodedToke.role }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove item from the wishlist.");
        }
        console.log("Item removed successfully!");
        setWishlist((prev) => prev.filter((item) => item !== itemToRemove));
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while removing the item. Please try again.");
      });
  };

  const handleShowWishlist = () => {
    setShowWishlist(!showWishlist);
    if (!showWishlist) {
      fetch("http://localhost:4000/user_wish_list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ req_type: "fetch", name: userName ,role:decodedToke.role}),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch wishlist.");
          }
          return response.json();
        })
        .then((data) => {
          setWishlist(data.wishlist); // Assuming the server returns { wishlist: [...] }
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("An error occurred while fetching the wishlist. Please try again.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <button
        onClick={handleShowWishlist}
        className="absolute top-20 left-4 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300 text-lg"
      >
        My Wishlist
      </button>

      {showWishlist && (
        <div className="absolute top-40 left-4 bg-white shadow-lg rounded-lg p-6 w-80">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Wishlist</h2>
          <ul>
            {wishlist.map((item, index) => (
              <li
                key={index}
                className="py-2 px-2 mb-2 bg-gray-100 rounded-lg text-gray-700 shadow-sm flex justify-between items-center"
              >
                {item}
                <button
                  onClick={() => handleRemove(item)}
                  className="text-red-600 font-bold hover:text-red-800"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-semibold mb-6">Hello {userName}</h1>
        <h2 className="text-xl font-medium mb-6">Enter your wishlist item</h2>

        <input
          type="text"
          placeholder="Enter your wishlist item..."
          value={wishlistItem}
          onChange={(e) => setWishlistItem(e.target.value)}
          className="w-96 px-6 py-3 text-lg border rounded-lg mb-4 bg-blue-50 border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        />

        <button
          onClick={handleAdd}
          className="px-8 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Add
        </button>

        {error && <p className="text-red-600 mt-4 text-lg">{error}</p>}
      </div>
    </div>
  );
};

export default Wishlist;