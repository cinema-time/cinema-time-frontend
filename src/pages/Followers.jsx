import { useEffect, useState } from "react";
import axios from "axios";
import placeholderImage from "./../assets/placeholder.png";

const API_URL = import.meta.env.VITE_API_URL;

function Followers() {
  const [follower, setFollower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowerProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Follower not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/followers/${followerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFollower(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to fetch user profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div className="page-container">Loading...</div>;
  if (error) return <div className="page-container error-text">{error}</div>;

  return (
    <div className="page-container">
      <div className="profile-card panel">
        {user && (
          <>
            <img
              src={placeholderImage}
              alt="profile"
              className="profile-image"
            />
            <h1 className="profile-name">{follower.name}</h1>
            <div className="profile-info">
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Followers;