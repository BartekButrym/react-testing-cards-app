import React from 'react';

export const Filter = () => {
	return (
		<div className='pet-filter-container'>
			<div className='filter-container'>
				<label htmlFor='favourite'>Favourite</label>
				<select name='favourite' id='favourite' className='form-select'>
					<option value='any'>Any</option>
					<option value='favourite'>Favourite</option>
					<option value='not favourite'>Not favourite</option>
				</select>
			</div>

			<div className='filter-container'>
				<label htmlFor='gender'>Gender</label>
				<select name='gender' id='gender' className='form-select'>
					<option value='any'>Any</option>
					<option value='male'>Male</option>
					<option value='female'>Female</option>
				</select>
			</div>
		</div>
	);
};
