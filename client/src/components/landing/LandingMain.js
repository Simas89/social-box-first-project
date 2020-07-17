import React from "react";
import "./css/LandingMain.css";
import Formike from "./Formike";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

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
console.log("//////a//xs/////xx//s////x///x//");

const LandingMain = () => {
	// UI >
	const [scrollStage, setScrollStage] = React.useState(1);
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
	const [page, setPage] = React.useState(0);
	window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
	window.addEventListener("scroll", () => {
		let scrollPosition = window.pageYOffset;
		const parallax = document.querySelector(".parallax");
		parallax.style.transform = `translateY(${scrollPosition * 0.6}px)`;
	});

	// Pge scroll stuff
	React.useEffect(() => {
		if (scrollStage === 1) window.scrollTo(0, 0);
		if (scrollStage === 2) window.scrollTo(0, window.innerHeight);
		if (scrollStage === 3) window.scrollTo(0, window.innerHeight * 2);
	}, [scrollStage]);
	if (scrollStage === 1) window.scrollTo(0, 0);
	if (scrollStage === 2) window.scrollTo(0, window.innerHeight);
	if (scrollStage === 3) window.scrollTo(0, window.innerHeight * 2);

	// UI <
	return (
		<React.Fragment>
			<div className='parallax'></div>
			<div className='landing-main'>
				<div className='landing-box box-1'>
					<h1 className='simas'>Simas Zurauskas</h1>
					<div className='box-content'>
						<PerfectScrollbar>
							<div className='informacione'>
								<div className='mongo'></div>
								<div className='express'></div>
								<div className='react'></div>
								<div className='node'></div>
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
								Donec nunc lacus, vehicula et tincidunt ut, vehicula id ante.
								Donec ultrices sit amet urna in viverra. Nullam tortor ante,
								ornare vel lacus vitae, finibus suscipit odio. Nunc bibendum
								pulvinar magna pellentesque pretium. Ut pellentesque ac leo
								vitae placerat. Nam a urna ipsum. Lorem ipsum dolor sit amet,
								consectetur adipiscing elit. Mauris blandit odio non sem
								imperdiet mattis. Donec mollis pharetra mi vestibulum commodo.
								Nulla congue sapien quis magna auctor molestie. Nulla bibendum
								molestie magna ut sagittis. Nulla nec vehicula mi. Vivamus
								faucibus nulla malesuada diam aliquet, finibus dapibus mauris
								facilisis. Sed commodo risus ut magna pretium, at facilisis orci
								posuere. Mauris facilisis justo in mi gravida dignissim.
								Vestibulum feugiat vehicula lectus non cursus. Etiam a nisi sed
								ante porttitor dictum et nec arcu. Phasellus rhoncus dolor
								rutrum, gravida velit ut, faucibus ex. Sed turpis risus, iaculis
								ut eros eu, tempus congue risus. Vestibulum convallis maximus
								risus, ac mollis dolor tincidunt et. Aliquam interdum mauris
								sapien, sit amet aliquet risus aliquet sit amet. Morbi ut
								egestas nisi, vel finibus lacus. In venenatis sem eleifend nisi
								rutrum suscipit. Praesent viverra venenatis erat, eu ornare
								tellus convallis quis. Fusce nec porta nisl. Donec auctor ut
								odio eget pulvinar. Vestibulum ante ipsum primis in faucibus
								orci luctus et ultrices posuere cubilia curae; Morbi eget ante
								lorem. Aliquam placerat, tellus sed rhoncus convallis, est quam
								molestie lorem, a egestas lorem ante in est. Aliquam erat
								volutpat. Curabitur quis pulvinar leo. Quisque cursus sit amet
								nulla et cursus. Praesent cursus mollis vestibulum. Nunc at
								libero sed enim convallis maximus. Lorem ipsum dolor sit amet,
								consectetur adipiscing elit. Vestibulum sit amet nibh semper,
								ultrices sapien ut, pulvinar massa. Aenean a egestas leo, quis
								egestas neque. Curabitur pharetra sed diam in lacinia. Orci
								varius natoque penatibus et magnis dis parturient montes,
								nascetur ridiculus mus. Quisque nunc lectus, tristique sit amet
								rutrum eget, sodales ut justo. Sed ullamcorper et mauris ut
								dapibus. Nulla vehicula nunc ac urna mollis placerat. Donec
								condimentum nunc urna, id aliquam dolor dapibus luctus. Donec
								felis sem, molestie eget venenatis at, imperdiet vitae sem.
								Proin malesuada consequat condimentum.
							</p>
						</PerfectScrollbar>
					</div>
				</div>
				<div className='landing-box box-2'>
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
			</div>
		</React.Fragment>
	);
};

export default LandingMain;
