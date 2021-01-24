import React, { useEffect, useState } from 'react';
import { useSpring, animated as a } from 'react-spring';
import './Parallax.css'; // // Icons made by Freepik from www.flaticon.com

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

const Parallax = (props) => {
	const [gradient, setGradient] = useState('');
	const [description, setDescription] = useState('');
	const { item } = props;

	// DEFINE SPRING
	const [spring, set] = useSpring(() => ({
		xy: [0, 0],
		config: { mass: 10, tension: 550, friction: 140 },
	}));

	// ROTATE GRADIENT DIRECTION
	useEffect(() => {
		if (item) {
			setGradient(item.css.replace('135deg', '315deg'));
			setDescription(item.description.replace(' ', ' → '));
		}
	}, [item]);

	return !item ? (
		<></>
	) : (
		<>
			<div
				className="container"
				onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
			>
				<a.div
					className="card1"
					style={{
						transform: spring.xy.interpolate(trans1),
						backgroundImage: gradient,
					}}
				/>

				<a.div
					className="card4"
					style={{ transform: spring.xy.interpolate(trans2) }}
				>
					{item.name}
				</a.div>
			</div>
			<div id="description">{description.toLowerCase()}</div>
		</>
	);
};

export default Parallax;