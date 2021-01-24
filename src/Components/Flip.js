/* eslint-disable */
import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { data } from './data';
import { Parallax, Hover, Sliders } from './index';
import './Flip.css';

const Flip = (props) => {
	const [flipped, set] = useState(false);
	const [item, setItem] = useState();
	const { state, handleSlide } = props;

	const { transform, opacity } = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(900px) rotateX(${flipped ? 180 : 0}deg)`,
		config: {
			mass: state.mass,
			tension: state.tension,
			friction: state.friction,
		},
	});

	const handleClick = (e) => {
		if (item) setItem({});
		setItem(e);
		set(!flipped);
	};

	return (
		<div id="flip">
			<h2>Flip Spring</h2>
			<Sliders state={state} handleSlide={handleSlide} />
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
								handleClick={handleClick}
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
					<Parallax item={item} />
				</a.div>
			)}
		</div>
	);
};

export default Flip;
