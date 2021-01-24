/* eslint-disable */

import { Flip, Navbar } from './Components';
import { useState } from 'react';
import './App.css';

function App() {
	const [state, set] = useState({ mass: 1, tension: 170, friction: 20 });

	const handleSlide = (e) => {
		const { name, value } = e.target;
		set({ ...state, [name]: value });
	};

	return (
		<>
			<Navbar />
			<div id="content">
				<Flip state={state} handleSlide={handleSlide} />
			</div>
		</>
	);
}

export default App;
