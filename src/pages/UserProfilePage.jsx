import { useEffect, useState, useContext } from "react";
import axios from "axios";
import placeholderImage from "./../assets/placeholder.png";
import { AuthContext } from "../context/auth.context";  // Adjust path as needed

const API_URL = import.meta.env.VITE_API_URL;

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(false);

  const { updateUser } = useContext(AuthContext); // <-- get updateUser from context

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/users/my-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setForm({
          name: response.data.name,
          email: response.data.email,
          password: "", // Leave blank initially
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.put(
        `${API_URL}/api/users/edit-profile`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
      setEditing(false);
      setSuccess("Profile updated successfully.");
      setError(null);
      setForm((prev) => ({ ...prev, password: "" })); // Clear password field
      
      updateUser(response.data); // <-- update global auth context user here

    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to update profile"
      );
      setSuccess("");
    }
  };

  if (loading) return <div className="page-container">Loading...</div>;
  if (error && !editing)
    return <div className="page-container error-text">{error}</div>;

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
            user?.name
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
              user?.email || "Not provided"
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
        {error && editing && <p className="error-text">{error}</p>}

        <div style={{ marginTop: "1rem" }}>
          {editing ? (
            <>
              <button onClick={handleSave} className="btn-primary">
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setForm({
                    name: user.name,
                    email: user.email,
                    password: "",
                  });
                  setError(null);
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