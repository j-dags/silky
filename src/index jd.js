import React, { useState, useRef } from 'react';
import { render } from 'react-dom';
import { useTransition, useSpring, useChain, config } from 'react-spring';
import { Global, Container, Item } from './styles';
import { data } from './data';

export default function App() {
	// const [open] = useState(true);
	const [datum, set] = useState(false);

	// CONTAINER ANIMATION
	// const springRef = useRef();
	// const { size, opacity, ...rest } = useSpring({
	// 	ref: springRef, //useChain sequences animations by ref
	// 	config: config.stiff, //preset spring configs
	// 	from: { size: '20%', background: 'white' }, //initial
	// 	to: { size: open ? '100%' : '20%', background: open ? 'white' : 'hotpink' }, //final
	// });

	// CONTAINER ANIMATION
	const springRef = useRef();
	const { size, opacity, ...rest } = useSpring({
		ref: springRef, //useChain sequences animations by ref
		config: config.stiff, //preset spring configs
		from: { size: '10%', margin: 0, background: 'red' }, //initial
		to: { size: datum ? '100%' : '10%', background: 'red' }, //final
		// onStart: () => (grids ? setGrids(4) : setGrids(1)),
	});

	// MOUNT GRADIENTS ANIMATION
	const transRef = useRef();
	// if (highlight) data.filter((datum) => (datum.name = highlight));

	const transitions = useTransition(datum ? [] : data, (item) => item.name, {
		ref: transRef, //useChain sequences animations by ref
		unique: true,
		trail: 400 / data.length,
		from: { opacity: 0, transform: 'scale(0)' },
		enter: { opacity: 1, transform: 'scale(1)' },
		leave: { opacity: 0, transform: 'scale(0)' },
	});

	const transDatumRef = useRef();
	const transDatum = useTransition(!!datum ? datum : [], (item) => item.name, {
		ref: transDatumRef, //useChain sequences animations by ref
		unique: true,
		trail: 400 / data.length,
		from: { opacity: 0, transform: 'scale(0)' },
		enter: {
			opacity: 1,
			transform: 'scale(1)',
			width: '100%',
			height: '100%',
			margin: '0',
		},
		leave: { opacity: 0, transform: 'scale(0)' },
	});

	// This will orchestrate the two animations above, comment the last arg and it creates a sequence
	useChain([transRef, transDatumRef], [0.1, 0.5]);

	console.log('datum > ', !!datum);

	return (
		<>
			<Global />
			<Container
				style={{
					// ...rest,
					width: '100%',
					height: '866px',
					// gridTemplateColumns:
					// 	grids === 4 ? 'repeat(4, minmax(100px, 1fr))' : 'auto',
				}}
				onClick={() => {
					if (datum) set(null);
				}}
			>
				{/* <Item
					style={{
						...rest,
						width: size,
						height: size,
					}}
				/> */}
				{transDatum.map(({ item, key, props }) => (
					<Item
						key={key}
						value={item.name}
						// onClick={() => set(null)}
						style={{ ...props, background: item.css }}
					/>
				))}
				{transitions.map(({ item, key, props }) => (
					<Item
						key={key}
						value={item.name}
						onClick={() => set(item)}
						style={{ ...props, background: item.css }}
					/>
				))}
			</Container>
		</>
	);
}

render(<App />, document.getElementById('root'));
