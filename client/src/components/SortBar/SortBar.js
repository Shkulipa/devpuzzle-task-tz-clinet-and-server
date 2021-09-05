import React from 'react';

//prop-types
import PropTypes from 'prop-types';

//styles
import './SortBar.css';

//material-ui
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const SortBar = ({ requestSort, getClassNamesFor }) => {
	const sortBarButtons = ['username', 'email', 'address', 'website'];

	return (
		<div className='sort-bar'>
			<ButtonGroup
				color='primary'
				aria-label='outlined primary button group'
			>
				{sortBarButtons.map((item, index) => (
					<Button
						key={index}
						onClick={() => requestSort(item)}
						className={getClassNamesFor(item)}
					>
						{item}
					</Button>
				))}
			</ButtonGroup>
		</div>
	);
};

SortBar.propTypes = {
	requestSort: PropTypes.func,
	getClassNamesFor: PropTypes.func,
};

export default SortBar;
