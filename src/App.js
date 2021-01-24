/* eslint-disable */

import { Flip, Navbar } from './Components';
import { useState } from 'react';
import './App.css';

function App() {
	const [flipSpr, setFlipSPr] = useState({
		mass: 5,
		tension: 500,
		friction: 60,
	});
	const [hoverSpr, setHoverSpr] = useState({
		mass: 3,
		tension: 350,
		friction: 25,
	});
	const [parallaxSpr, setParallaxSpr] = useState({
		mass: 10,
		tension: 550,
		friction: 100,
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
		<>
			<Navbar />
			<div id="content">
				<Flip
					flipSpr={flipSpr}
					handleFlip={handleFlip}
					hoverSpr={hoverSpr}
					handleHover={handleHover}
					parallaxSpr={parallaxSpr}
					handleParallax={handleParallax}
				/>
			</div>
		</>
	);
}

export default App;
