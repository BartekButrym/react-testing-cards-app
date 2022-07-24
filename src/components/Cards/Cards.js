import React, { useContext } from 'react';
import { Card } from '../Card/Card';
import { PetsContext } from '../Pets/Pets';
import './Cards.css';

export const Cards = () => {
	const { cats } = useContext(PetsContext);

	return (
		<div className='pet-cards-container'>
			{cats.map((cat, index) => (
				<Card
					key={cat.id}
					name={cat.name}
					phone={cat.phone}
					email={cat.email}
					image={cat.image}
					favoured={cat.favoured}
					index={index}
				/>
			))}
		</div>
	);
};
