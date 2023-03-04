import "./RepoCard.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function RepoCard({ rep }) {
	const [isLiked, setIsLiked] = useState(false);

	const handleIsLiked = () => {
		setIsLiked(!isLiked);
	};

	return (
		<div className="card-repo">
			<div className="left-repo">
				<div className="title-repo">
					<a href={rep.html_url} target="_blank">
						<h4>{rep.name}</h4>
					</a>
					<span className="privacy-repo">Public</span>
				</div>
				<div className="bottom-info">
					<div className="language">
						<p>{rep.language}</p>
					</div>
					<div className="updated">
						<p>Updated at {rep.updated_at}</p>
					</div>
				</div>
			</div>
			<div className="right-repo">
				<div className="star">
					<span onClick={handleIsLiked}>
						{isLiked ? <AiFillStar /> : <AiOutlineStar />}
					</span>
				</div>
			</div>
		</div>
	);
}
