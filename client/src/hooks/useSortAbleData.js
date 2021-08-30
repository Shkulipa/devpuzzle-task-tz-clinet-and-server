import React, { useState } from 'react';

const useSortAbleData = (
	items,
	config = { key: 'username', direction: 'asc' }
) => {
	const [sortConfig, setSortConfig] = useState(config);

	const sortedItems = React.useMemo(() => {
		let sortableItems = [...items];
		if (sortConfig !== null) {
			if (sortConfig.key === 'address') {
				sortableItems.sort((a, b) => {
					if (a[sortConfig.key]['city'] < b[sortConfig.key]['city']) {
						return sortConfig.direction === 'asc' ? -1 : 1;
					}
					if (a[sortConfig.key]['city'] > b[sortConfig.key]['city']) {
						return sortConfig.direction === 'asc' ? 1 : -1;
					}
					return 0;
				});
			} else {
				sortableItems.sort((a, b) => {
					if (a[sortConfig.key] < b[sortConfig.key]) {
						return sortConfig.direction === 'asc' ? -1 : 1;
					}
					if (a[sortConfig.key] > b[sortConfig.key]) {
						return sortConfig.direction === 'asc' ? 1 : -1;
					}
					return 0;
				});
			}
		}
		return sortableItems;
	}, [items, sortConfig]);

	const requestSort = key => {
		let direction = 'asc';
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'asc'
		) {
			direction = 'des';
		}
		setSortConfig({ key, direction });
	};

	return { items: sortedItems, requestSort, sortConfig };
};
export default useSortAbleData;
