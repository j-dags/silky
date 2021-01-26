import React from 'react';
import './Sliders.css';

function Sliders(props) {
	const { state, handleSlide } = props;

	return (
		<div id="slide-container" onChange={(e) => handleSlide(e)}>
			<div className="slide">
				<input
					type="range"
					id="mass"
					name="mass"
					min="1"
					max="500"
					defaultValue={state.mass}
				/>
				<label htmlFor="mass">Mass: {state.mass}</label>
			</div>
			<div className="slide">
				<input
					type="range"
					id="tension"
					name="tension"
					min="1"
					max="500"
					defaultValue={state.tension}
				/>
				<label htmlFor="tension">Tension: {state.tension}</label>
			</div>
			<div className="slide">
				<input
					type="range"
					id="friction"
					name="friction"
					min="1"
					max="500"
					defaultValue={state.friction}
				/>
				<label htmlFor="friction">Friction: {state.friction}</label>
			</div>
			<div className="slide">
				<input
					type="range"
					id="velocity"
					name="velocity"
					min="-50"
					max="50"
					defaultValue={state.velocity}
				/>
				<label htmlFor="velocity">Velocity: {state.velocity}</label>
			</div>
		</div>
	);
}

export default Sliders;
