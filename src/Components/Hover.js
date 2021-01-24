import React from 'react';
import { useSpring, animated as a } from 'react-spring';
import './Hover.css';

const calc = (x, y) => [
	-(y - window.innerHeight / 2) / 20,
	(x - window.innerWidth / 2) / 20,
	1.1,
];
const trans = (x, y, s) =>
	`perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Hover = (props) => {
	const { css, item, handleClick, hoverSpr } = props;

	// DEFINE SPRING
	const [spring, set] = useSpring(() => ({
		xys: [0, 0, 1],
		config: {
			mass: hoverSpr.mass,
			tension: hoverSpr.tension,
			friction: hoverSpr.friction,
		},
		// reset: true,
	}));

	return (
		<div id="hover">
			<a.div
				className="card"
				onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
				onMouseLeave={() => set({ xys: [0, 0, 1] })}
				style={{
					transform: spring.xys.interpolate(trans),
					background: css,
				}}
				onClick={() => handleClick(item)}
			/>
		</div>
	);
};

export default Hover;
