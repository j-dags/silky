import React from 'react';
import { clamp } from 'lodash-es';
import { useSpring, animated as a } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import './Logo.css';

const Logo = () => {
	const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
	const bind = useGesture(({ down, delta, velocity }) => {
		velocity = clamp(velocity, 1, 8);
		set({
			xy: down ? delta : [0, 0],
			config: { mass: velocity, tension: 500 * velocity, friction: 40 },
		});
	});
	return (
		<a.div
			id="logo"
			{...bind()}
			style={{
				transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
			}}
		>
			<h1>silky</h1>
		</a.div>
	);
};

export default Logo;
