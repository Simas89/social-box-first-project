import React from "react";
import "./css/LandingMain.css";
import Formike from "./Formike";
import { Scrollbars } from "react-custom-scrollbars";
import accountContext from "../../context/account/myContext";

const MovingContainer = (props) => {
	const style = {
		position: "absolute",
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		width: "200%",
		height: "100%",
		left: props.page ? "-100%" : "0%",

		transition: "left .5s",
		// border: "1px solid red",
	};
	return (
		<div style={style}>
			<Formike type='LOGIN' />
			<Formike type='CONTACT' />
		</div>
	);
};
// console.log("/////a/aaaazaz/ss/xs//a/x//xxa/x/s////x///x//");

const LandingMain = () => {
	const contextAccount = React.useContext(accountContext);

	// console.log(contextAccount.accountState.logged);
	// UI >
	const [scrollStage, setScrollStage] = React.useState(1);
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
	const [page, setPage] = React.useState(0);
	// document.querySelector("body").style.overflow = "hidden";

	// EVENT LISTENERS AND THEIR FUNCTIONS
	// const scrollEvent = () => {
	// 	try {
	// 		let scrollPosition = window.pageYOffset;
	// 		const parallax = document.querySelector(".parallax");
	// 		parallax.style.transform = `translateY(${scrollPosition * 0.6}px)`;
	// 	} catch (err) {}
	// };
	const resizeEvent = () => {
		setWindowWidth(window.innerWidth);
	};
	document.addEventListener("resize", resizeEvent);
	// document.addEventListener("scroll", scrollEvent);

	React.useEffect(() => {
		document.title = "Simas Zurauskas | Home";
		return () => {
			document.removeEventListener("resize", resizeEvent);
			// document.removeEventListener("scroll", scrollEvent);
		};
	}, []);

	// Pge scroll stuff
	// React.useEffect(() => {
	// 	if (scrollStage === 1) window.scrollTo(0, 0);
	// 	if (scrollStage === 2) window.scrollTo(0, window.innerHeight);
	// 	if (scrollStage === 3) window.scrollTo(0, window.innerHeight * 2);
	// }, [scrollStage]);

	// if (scrollStage === 1) window.scrollTo(0, 0);
	// if (scrollStage === 2) window.scrollTo(0, window.innerHeight);
	// if (scrollStage === 3) window.scrollTo(0, window.innerHeight * 2);

	// UI <
	React.useEffect(() => {});

	return (
		<React.Fragment>
			<div className='parallax'></div>
			<div className='landing-main'>
				<div className='top-bar-shader'>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
					<div className='box'></div>
				</div>

				<div className='title'>
					<h1 className='simas'>Hello. My name is Simas Zurauskas and </h1>
					<div>
						<h1 className='full-stack'>I AM A FULL-STACK WEB DEVELOPER</h1>
						<h1 className='full-stack-second'>
							I AM A FULL-STACK WEB DEVELOPER
						</h1>
					</div>
				</div>

				<div className='landing-box box-1'>
					{/* <h1 className='simas'>Simas Zurauskas</h1> */}
					<div className='box-content'>
						<Scrollbars
							className='Scrollbars'
							autoHide
							autoHideTimeout={2000}
							autoHideDuration={200}
							thumbMinSize={3}
							universal={true}
							renderThumbVertical={(props) => (
								<div className='thumb-vertical' />
							)}>
							<div className='informacione'>
								<div className='logo mongo'></div>
								<div className='logo express'></div>
								<div className='logo react'></div>
								<div className='logo node'></div>
							</div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
								luctus nulla non lorem feugiat dignissim. Nam vitae fringilla
								lorem. Mauris odio tortor, blandit sit amet mi nec, interdum
								consectetur magna. Quisque non sapien quis est bibendum
								hendrerit quis at libero. Suspendisse lacinia congue tellus ac
								volutpat. Curabitur imperdiet purus sed ante elementum
								porttitor. Nam sed vehicula libero. Vivamus id augue nec velit
								luctus auctor sit amet ac nisi. Class aptent taciti sociosqu ad
								litora torquent per conubia nostra, per inceptos himenaeos.
								Nullam mi sem, luctus sed magna eu, placerat efficitur dolor.
								Proin magna nisi, dapibus sed lorem eu, pretium iaculis massa.
								Ut vitae tristique lorem. Vestibulum sagittis lectus in massa
								ullamcorper lacinia. Aliquam vel erat sagittis, maximus felis
								sed, consequat turpis. Duis vitae rhoncus est, at iaculis velit.
								Proin malesuada consequat condimentum.Lorem ipsum dolor sit
								amet, consectetur adipiscing elit. In luctus nulla non lorem
								feugiat dignissim. Nam vitae fringilla lorem. Mauris odio
								tortor, blandit sit amet mi nec, interdum consectetur magna.
								Quisque non sapien quis est bibendum hendrerit quis at libero.
								Suspendisse lacinia congue tellus ac volutpat. Curabitur
								imperdiet purus sed ante elementum porttitor. Nam sed vehicula
								libero. Vivamus id augue nec velit luctus auctor sit amet ac
								nisi. Class aptent taciti sociosqu ad litora torquent per
								conubia nostra, per inceptos himenaeos. Nullam mi sem, luctus
								sed magna eu, placerat efficitur dolor. Proin magna nisi,
								dapibus sed lorem eu, pretium iaculis massa. Ut vitae tristique
								lorem. Vestibulum sagittis lectus in massa ullamcorper lacinia.
								Aliquam vel erat sagittis, maximus felis sed, consequat turpis.
								Duis vitae rhoncus est, at iaculis velit. Proin malesuada
								consequat condimentum.Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. In luctus nulla non lorem feugiat dignissim.
								Nam vitae fringilla lorem. Mauris odio tortor, blandit sit amet
								mi nec, interdum consectetur magna. Quisque non sapien quis est
								bibendum hendrerit quis at libero. Suspendisse lacinia congue
								tellus ac volutpat. Curabitur imperdiet purus sed ante elementum
								porttitor. Nam sed vehicula libero. Vivamus id augue nec velit
								luctus auctor sit amet ac nisi. Class aptent taciti sociosqu ad
								litora torquent per conubia nostra, per inceptos himenaeos.
								Nullam mi sem, luctus sed magna eu, placerat efficitur dolor.
								Proin magna nisi, dapibus sed lorem eu, pretium iaculis massa.
								Ut vitae tristique lorem. Vestibulum sagittis lectus in massa
								ullamcorper lacinia. Aliquam vel erat sagittis, maximus felis
								sed, consequat turpis. Duis vitae rhoncus est, at iaculis velit.
								Proin malesuada consequat condimentum.
							</p>
						</Scrollbars>
					</div>
				</div>
				<div
					className={`landing-box box-2 ${
						!contextAccount.accountState.logged && "box-padding"
					}  `}>
					<div className='box-content'>
						{windowWidth > 768 ? (
							<MovingContainer page={page} />
						) : (
							<Formike type='LOGIN' />
						)}
						<div className='form-navigaror'>
							<div
								onClick={() => setPage(0)}
								className='form-navigator-button-hide'>
								<div
									className={
										page
											? "form-navigator-button "
											: "form-navigator-button pulsating-circle"
									}></div>
							</div>
							<div
								onClick={() => setPage(1)}
								className='form-navigator-button-hide'>
								<div
									className={
										page
											? "form-navigator-button pulsating-circle"
											: "form-navigator-button"
									}></div>
							</div>
						</div>
					</div>
				</div>
				<div className='landing-box box-3'>
					<div className='box-content'>
						<Formike type='CONTACT' />
					</div>
				</div>
				{/* MOBILE MENU SCROLL */}
				<div className='mobile-navigator'>
					<div
						onClick={() => {
							setScrollStage(1);
						}}
						className='mobile-navigator-button-hide '>
						<div
							className={
								scrollStage === 1
									? "mobile-navigator-button pulsating-circle"
									: "mobile-navigator-button"
							}></div>
					</div>
					<div
						onClick={() => {
							setScrollStage(2);
						}}
						className='mobile-navigator-button-hide'>
						<div
							className={
								scrollStage === 2
									? "mobile-navigator-button pulsating-circle"
									: "mobile-navigator-button"
							}></div>
					</div>
					<div
						onClick={() => {
							setScrollStage(3);
						}}
						className='mobile-navigator-button-hide '>
						<div
							className={
								scrollStage === 3
									? "mobile-navigator-button pulsating-circle"
									: "mobile-navigator-button"
							}></div>
					</div>
				</div>
				<div className='footer'>
					<p>
						<span>2020 </span>SimasZurauskas@gmail.com
					</p>
				</div>
			</div>
			{/* <div className='footer2'>
				<p>
					<span>2020 </span>SimasZurauskas@gmail.com
				</p>
			</div> */}
		</React.Fragment>
	);
};

export default LandingMain;
