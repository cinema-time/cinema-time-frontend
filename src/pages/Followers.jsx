/*const Followers = () => {
	const [user, setUser] = useState(null);

	const handleFollow = () => {
		axios
			.post(`/api/follow/${user._id}`)
			.then((res) => {
				setUser({ ...user, followers: [...user.followers, req.user._id] });
			})
			.catch((err) => console.log(err));
	};

	const handleUnfollow = () => {
		axios
			.post(`/api/unfollow/${user._id}`)
			.then((res) => {
				setUser({
					...user,
					followers: user.followers.filter(
						(follower) => follower !== req.user._id
					),
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			{user && (
				<div>
					<span>{user.name}</span>
					<button onClick={handleFollow}>Follow</button>
					<button onClick={handleUnfollow}>Unfollow</button>
				</div>
			)}
		</div>
	);
};

export default Followers;*/
