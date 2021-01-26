/* eslint-disable */
import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { data } from './data';
import { Parallax, Hover, Sliders } from './index';
import './Flip.css';

const Flip = (props) => {
	const [flipped, set] = useState(false);
	const [item, setItem] = useState();
	const {
		flipSpr,
		handleFlip,
		hoverSpr,
		handleHover,
		parallaxSpr,
		handleParallax,
	} = props;

	const { transform, opacity } = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(900px) rotateX(${flipped ? 180 : 0}deg)`,
		config: {
			mass: flipSpr.mass,
			tension: flipSpr.tension,
			friction: flipSpr.friction,
			velocity: flipSpr.velocity,
		},
	});

	const handleClick = (e) => {
		if (item) setItem({});
		setItem(e);
		set(!flipped);
	};

	return (
		<div id="flip">
			<div id="settings">
				<div className="setting">
					<h3>Flip Spring</h3>
					<Sliders state={flipSpr} handleSlide={handleFlip} />
				</div>
				<div className="setting">
					<h3>Hover Spring</h3>
					<Sliders state={hoverSpr} handleSlide={handleHover} />
				</div>
				<div className="setting">
					<h3>Parallax Spring</h3>
					<Sliders state={parallaxSpr} handleSlide={handleParallax} />
				</div>
			</div>
			{!!item ? (
				<></>
			) : (
				<a.div
					className="c back"
					style={{
						opacity: opacity.interpolate((o) => 1 - o),
						transform,
					}}
				>
					<div id="cards">
						{data.map((item) => (
							<Hover
								key={item.name}
								item={item}
								css={item.css}
								hoverSpr
								handleClick={handleClick}
								hoverSpr={hoverSpr}
							/>
						))}
					</div>
				</a.div>
			)}
			{!item ? (
				<></>
			) : (
				<a.div
					className="c front"
					style={{
						opacity,
						transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
						backgroundImage: item.css,
					}}
					onClick={() => handleClick()}
				>
					<Parallax item={item} parallaxSpr={parallaxSpr} />
				</a.div>
			)}
		</div>
	);
};

export default Flip;
