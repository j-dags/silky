/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { Item } from './styles';
import { data } from './data';
// import Springs from './Springs';
import Parallax from './Parallax';
import './Flip.css';

const Flip = () => {
	const [flipped, set] = useState(false);
	const [name, setName] = useState(null);
	const [scroll, setScroll] = useState(null);
	const [item, setItem] = useState();

	const { transform, opacity } = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(900px) rotateX(${flipped ? 180 : 0}deg)`,
		config: { mass: 5, tension: 500, friction: 80 },
	});

	const handleClick = (e) => {
		if (item) setItem({});
		setItem(e);
		set(!flipped);
	};

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY > 200);
		});
	}, []);

	console.log('item > ', item);
	return (
		<div>
			{/* <a.div
				className="c back"
				style={{
					opacity: opacity.interpolate((o) => 1 - o),
					transform,
					'background-image': `url(${back})`,
				}}
			>
				text
			</a.div> */}
			{!!item ? (
				<></>
			) : (
				<a.div
					className="c back"
					style={{
						opacity: opacity.interpolate((o) => 1 - o),
						transform,
						// width: flipped ? '0%' : '100%',
					}}
				>
					<div id="cards">
						{data.map((item) => (
							<Item
								key={item.name}
								description={item.description}
								style={{ background: item.css }}
								onClick={() => handleClick(item)}
							/>
						))}
					</div>
					{/* <Springs onClick={(e) => console.log(e)} /> */}
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
						// width: flipped ? '100%' : '0%',
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
