import { useEffect, useState } from "react";
import reactLogo from "../../assets/react.svg";
import "./SearchUser.css";
import { AiFillGithub, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function SearchUser() {
	const [userData, setUserData] = useState([]);
	const [nameUser, setNameUser] = useState("");
	// const [err, setErr] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		localStorage.setItem("name_user", userData.name);
	}, [userData]);

	const handleSearchRequest = () => {
		if (nameUser === "") {
			return alert("Digite o nome de algum usuário");
		}
		fetch(`https://api.github.com/users/${nameUser}`)
			.then((r) => r.json())
			.then((response) => {
				setUserData(response);
				console.log(response);
				setNameUser("");
				localStorage.setItem("name_user", response.name);
				localStorage.setItem("photo_user", response.avatar_url);
				localStorage.setItem("login_user", response.login);
				localStorage.setItem(
					"followers_user",
					response.followers
				);
				localStorage.setItem(
					"following_user",
					response.following
				);
				localStorage.setItem("bio_user", response.bio);
				localStorage.setItem("location_user", response.location);
				navigate("/user");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="wrapper">
			<div className="logo">
				<AiFillGithub />
			</div>
			<div className="search-form">
				<input
					type="search"
					placeholder="Pesquise algum usuário"
					onChange={(e) => setNameUser(e.target.value)}
					value={nameUser}
				/>
				<button onClick={handleSearchRequest}>
					<AiOutlineSearch />
				</button>
			</div>
		</div>
	);
}

export default SearchUser;
