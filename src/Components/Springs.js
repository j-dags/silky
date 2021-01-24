import React, { useState, useRef } from 'react';
import { useTransition, useSpring, useChain, config } from 'react-spring';
import { Global, Container, Item } from './Styles';
import { data } from './data';

export default function Springs() {
	const [open, set] = useState(false);

	// CONTAINER ANIMATION
	const springRef = useRef();
	const { size, opacity, ...rest } = useSpring({
		ref: springRef, //useChain sequences animations by ref
		config: config.stiff, //preset spring configs
		from: { size: '20%', background: 'hotpink' }, //initial
		to: { size: open ? '100%' : '20%', background: open ? 'white' : 'hotpink' }, //final
	});

	// MOUNT GRADIENTS ANIMATION
	const transRef = useRef();
	const transitions = useTransition(open ? data : [], (item) => item.name, {
		ref: transRef, //useChain sequences animations by ref
		unique: true,
		trail: 400 / data.length,
		from: { opacity: 0, transform: 'scale(0)' },
		enter: { opacity: 1, transform: 'scale(1)' },
		leave: { opacity: 0, transform: 'scale(0)' },
	});

	// This will orchestrate the two animations above, comment the last arg and it creates a sequence
	useChain(open ? [springRef, transRef] : [transRef, springRef], [
		0,
		open ? 0.1 : 0.6, // sets animation speed
	]);

	return (
		<>
			<div
				id="page"
				onClick={(e) => {
					if (e.target.id === 'page') set(false);
					// console.log(e.target.id);
				}}
			>
				<Global />
				<Container
					style={{ ...rest, width: size, height: size }}
					onClick={() => set(true)}
				>
					{transitions.map(({ item, key, props }) => (
						<Item key={key} style={{ ...props, background: item.css }} />
						// <Item key={key} />
					))}
				</Container>
			</div>
		</>
	);
}
