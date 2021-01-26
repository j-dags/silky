/* eslint-disable */

import { Flip, Logo } from './Components';
import { useState } from 'react';
import './App.css';

function App() {
	const [flipSpr, setFlipSPr] = useState({
		mass: 5,
		tension: 500,
		friction: 45,
		velocity: 0,
	});
	const [hoverSpr, setHoverSpr] = useState({
		mass: 3,
		tension: 350,
		friction: 25,
		velocity: 50,
	});
	const [parallaxSpr, setParallaxSpr] = useState({
		mass: 10,
		tension: 550,
		friction: 100,
		velocity: 0,
	});

	const handleFlip = (e) => {
		const { name, value } = e.target;
		setFlipSPr({ ...flipSpr, [name]: parseInt(value) });
	};

	const handleHover = (e) => {
		const { name, value } = e.target;
		setHoverSpr({ ...hoverSpr, [name]: value });
	};

	const handleParallax = (e) => {
		const { name, value } = e.target;
		setParallaxSpr({ ...parallaxSpr, [name]: parseInt(value) });
	};

	return (
		<div id="content">
			<Logo />
			<Flip
				flipSpr={flipSpr}
				handleFlip={handleFlip}
				hoverSpr={hoverSpr}
				handleHover={handleHover}
				parallaxSpr={parallaxSpr}
				handleParallax={handleParallax}
			/>
		</div>
	);
}

export default App;
