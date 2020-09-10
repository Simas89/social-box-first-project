import React from "react";
import { Twemoji } from "react-emoji-render";
import "./css/SitePresentation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
	faEnvelope,
	faPhone,
	faUser,
	faKey,
} from "@fortawesome/free-solid-svg-icons";

const SitePresentation = () => {
	return (
		<div className='site-presentation'>
			<div className='informacione'>
				<div className='logo mongo'></div>
				<div className='logo express'></div>
				<div className='logo react'></div>
				<div className='logo node'></div>
			</div>

			<div>
				<br></br>
				<br></br>
				<p className='p-title'>Welcome to my freshly baked MERN stack app!</p>
				<p className='p-title-des'>
					This is a social network platform with database and network performace
					in mind.
				</p>
				<div className='under-construction'></div>
				<p className='p-title'>
					Please note that site is under active development, please watch
					yourself around..
					<Twemoji
						style={{ fontSize: "2rem" }}
						text={":construction_worker:"}
					/>
				</p>
				<p className='p-title'>Current features:</p>

				<ul>
					<li>
						<span className='bolder'>Create and delete your account.</span>{" "}
						Password is encrypted and compared with bcrypt. Password is never
						kept exposed, auth routes are accessed using JWT.
					</li>

					<div className='br'></div>
					<li>
						<span className='bolder'>Upgrade your account.</span> By confirming
						on activationg link sent to an email using JWT. After that you'll
						get 'Confirmed account' ribon that others can see.
					</li>
					<div className='br'></div>
					<li>
						<span className='bolder'>Create posts and write comments.</span>{" "}
						Edit or delete your own. Time of edit will be displayed if edited.
					</li>

					<div className='br'></div>
					<li>
						<span className='bolder'>Upload profile picture.</span> Crop it to
						your liking before upload. Once uploaded it will be converted to
						three different sizes and used in different areas in application
						where downloading a large size image is not optimal.
					</li>
					<div className='br'></div>
					<li>
						<span className='bolder'>Search other people profiles.</span> See
						what they are doing, add them to your list and get their posts an
						your feed.
					</li>
					<div className='br'></div>
					<li>
						<span className='bolder'>Get notifications.</span> If a user adds
						you to his contact list, sends you a present, likes or comments on
						your post, you'll get a notification. Notifications comes with link
						to that user or a particular post Notifications can then be marked
						as 'seen' or deleted.
					</li>
					<div className='br'></div>
					<li>
						<span className='bolder'>See who is online.</span> Option can be
						disabled in your account menu.
					</li>
					<div className='br'></div>
					<li>
						<span className='bolder'>Fictional credits and items.</span> You can
						spend credits on items which can then be sent to other users.
					</li>
					<div className='br'></div>

					<li>
						<span className='bolder'>Emoji support.</span>{" "}
					</li>
					<div className='br'></div>
					<li>
						<span className='bolder'>Auto log in feature.</span>
					</li>
				</ul>

				<p>
					As it's first release, thre is more to come. Live chat and more to be
					integrated soon.
				</p>
				<br></br>
				<p>
					Please give it a try. Create new account, or use guest account
					provided with activity taking place already.
				</p>

				<ul style={{ listStyleType: "none" }}>
					<li>
						<FontAwesomeIcon icon={faUser} />{" "}
						<span className='user-select'>default_guest</span>
					</li>
					<li>
						<FontAwesomeIcon icon={faKey} />{" "}
						<span className='user-select'>default_psw</span>
					</li>
				</ul>

				<br></br>
				<p>Additional technologies used:</p>
				<br></br>
			</div>
			<div className='technologies'>
				<div className='logo graphql'></div>
				<div className='logo router'></div>
				<div className='logo mongoose'></div>
				<div className='logo sass'></div>
			</div>
			<br></br>
			<br></br>

			<div className='source-code'>
				<span>Source code:</span>

				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://github.com/Simas89/MERN-social'>
					<FontAwesomeIcon className='hover-pointer git' icon={faGithub} />
				</a>
			</div>
			<br></br>
			<p className='the-end'>•••</p>
			<br></br>

			<ul style={{ listStyleType: "none" }}>
				<li>
					<FontAwesomeIcon icon={faEnvelope} />{" "}
					<span className='user-select'>simaszurauskas@gmail.com</span>
				</li>
				<li>
					<FontAwesomeIcon icon={faPhone} />{" "}
					<span className='user-select'>07428642217</span>
				</li>
			</ul>
			<br></br>
		</div>
	);
};

export default SitePresentation;
