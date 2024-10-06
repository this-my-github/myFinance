import { request } from '../utils';
import { setCategory } from './set-category';

export const updateCategoryAsync = (id, title, type, selectedIcon) => (dispatch) =>
	request(`/categories/${id}`, 'PATCH', { id, title, type, icon: selectedIcon }).then(
		(newCategory) => {
			if (newCategory.data) {
				dispatch(setCategory(newCategory.data));
			}

			return newCategory;
		},
	);
