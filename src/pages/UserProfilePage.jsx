import { useEffect, useState } from "react";
import axios from "axios";
import placeholderImage from "./../assets/placeholder.png";

const API_URL = import.meta.env.VITE_API_URL;

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/users/my-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setForm({
          name: response.data.name,
          email: response.data.email,
          password: "", // Leave empty initially
        });
      } catch (err) {
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.put(`${API_URL}/edit-profile`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setEditing(false);
      setSuccess("Profile updated successfully.");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) return <div className="page-container">Loading...</div>;
  if (error) return <div className="page-container error-text">{error}</div>;

  return (
    <div className="page-container">
      <div className="profile-card panel">
        <img src={placeholderImage} alt="profile" className="profile-image" />
        <h1 className="profile-name">
          {editing ? (
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input-inline"
              required
            />
          ) : (
            user.name
          )}
        </h1>

        <div className="profile-info">
          <p>
            <strong>Email:</strong>{" "}
            {editing ? (
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input-inline"
                required
              />
            ) : (
              user.email || "Not provided"
            )}
          </p>

          {editing && (
            <p>
              <strong>New Password:</strong>{" "}
              <input
                name="password"
                type="password"
                placeholder="Leave blank to keep current"
                value={form.password}
                onChange={handleChange}
                className="input-inline"
              />
            </p>
          )}
        </div>

        {success && <p className="success-text">{success}</p>}
        {error && <p className="error-text">{error}</p>}

        <div style={{ marginTop: "1rem" }}>
          {editing ? (
            <>
              <button onClick={handleSave} className="btn-primary">
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setForm({ ...form, name: user.name, email: user.email, password: "" });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="btn-primary">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
