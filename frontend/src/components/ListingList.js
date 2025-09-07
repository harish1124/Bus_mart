import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
const ListingList = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    api.get("/listings")
      .then(res => setListings(res.data.listings))
      .catch(err => console.error(err));
  }, []);
    const navigate = useNavigate();

  return (
    <div>
      <h2>All Listings</h2>
      <div style={{display: "flex", flexWrap: "wrap", gap: "16px"}}>
        {listings.map(listing => (
          <div
            key={listing.id}
            style={{ border: "1px solid #ccc", padding: 12, width: 320, cursor: "pointer" }}
            onClick={() => navigate(`/listing/${listing.id}`)}
          >
            <h3>{listing.title}</h3>
            <p>Price: ₹{listing.price}</p>
            <p>Location: {listing.location}</p>
            {listing.images && listing.images.length > 0 && (
              <img
                src={`http://localhost:5000/${listing.images[0]}`}
                alt="bus"
                width={220}
                style={{marginBottom: 6}}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingList;
