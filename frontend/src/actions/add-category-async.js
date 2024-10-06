import { request } from '../utils';
import { setCategory } from './set-category';

export const addCategoryAsync = (title, type, selectedIcon) => (dispatch) =>
	request('/categories', 'POST', { title, type, icon: selectedIcon }).then(
		(newCategory) => {
			if (newCategory.data) {
				dispatch(setCategory(newCategory.data));
			}

			return newCategory;
		},
	);
