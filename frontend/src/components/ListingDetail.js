import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    api.get(`/listings/${id}`)
      .then(res => setListing(res.data.listing))
      .catch(err => console.error(err));
  }, [id]);

  if (!listing) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>{listing.title}</h2>
      <p><strong>Price:</strong> ₹{listing.price}</p>
      <p><strong>Location:</strong> {listing.location}</p>
      <p><strong>Description:</strong> {listing.description}</p>
      {listing.images && listing.images.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {listing.images.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:5000/${img}`}
              alt={`bus-${idx}`}
              width={220}
              style={{ border: "1px solid #ddd", marginTop: 8 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingDetail;
