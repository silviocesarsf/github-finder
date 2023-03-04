import React, { useEffect, useState } from "react";
import "./UsersRepo.css";
import { useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import RepoCard from "../../Components/RepoCard/RepoCard";
import LoadingComp from "../../Components/LoadingComp/LoadingComp";
import { FiUsers } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

export default function UsersRepo() {
	const [userData, setUserData] = useState({});
	const [repoData, setRepoData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const storedUserData = {
			name: localStorage.getItem("name_user"),
			photo: localStorage.getItem("photo_user"),
			login: localStorage.getItem("login_user"),
			followers: localStorage.getItem("followers_user"),
			following: localStorage.getItem("following_user"),
			bio: localStorage.getItem("bio_user"),
			location: localStorage.getItem("location_user"),
		};
		setUserData(storedUserData);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			fetch(`https://api.github.com/users/${userData.login}/repos`)
				.then((r) => r.json())
				.then((repo) => {
					setRepoData(repo);
					console.log(repo);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}, 300);
		if (userData.name === "undefined" || undefined) {
			return navigate("/"), alert("Usuário não encontrado.");
		}
	}, [userData]);

	return (
		<div className="wrapper-users">
			<aside className="left">
				<div className="info">
					<div className="btn-back">
						<button onClick={() => navigate("/")}>
							Voltar
						</button>
					</div>
					<div className="photo">
						<img src={userData.photo} alt="" />
					</div>
					<div className="username">
						<h1>{userData.name}</h1>
						<p>@{userData.login}</p>
					</div>
					<div className="social-info">
						<div className="followers">
							<FiUsers />
							<p>{userData.followers}</p>
						</div>
						<div className="following">
							<AiOutlineUser />
							<p>{userData.following}</p>
						</div>
					</div>
					<div className="bio">
						<p>{userData.bio}</p>
					</div>
					<div className="location">
						<FiMapPin />
						{userData.location}
					</div>
				</div>
			</aside>
			<div className="right">
				<h2>Repositórios</h2>
				<div className="list">
					{isLoading && <LoadingComp />}
					{repoData.length > 0 &&
						repoData.map((rep) => (
							<RepoCard key={rep.id} rep={rep} />
						))}
				</div>
			</div>
		</div>
	);
}
