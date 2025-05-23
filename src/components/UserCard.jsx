import { Link } from "react-router-dom";
import placeholderImage from "../assets/profile-icon.png";

function UserCard({
  _id: userId,
  name,
  email,
  avatar,
  className,
}) {
  return (
    <Link to={`/user/details/${userId}`}>
      <div className={`UserCard grid grid-cols-1 sm:grid-cols-5 gap-4 items-center p-3 mb-2 bg-white shadow-sm rounded border border-gray-200 hover:bg-gray-50 ${className}`}>
  <div className="flex justify-center">
    <img
      src={avatar || placeholderImage}
      alt={`${name}`}
      className="rounded-full w-10 h-10 object-cover border-2 border-gray-300"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = placeholderImage;
      }}
    />
  </div>
  <div className="truncate">{name}</div>
  <div className="truncate">{email}</div>
</div>
    </Link>
  );
}

export default UserCard;