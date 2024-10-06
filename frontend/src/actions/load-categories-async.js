import { request } from '../utils';
import { setCategories } from './set-categories';

export const loadCategoriesAsync = () => (dispatch) =>
	request('/categories').then((categoriesData) => {
		if (categoriesData.data) {
			dispatch(setCategories(categoriesData.data));
		}

		return categoriesData;
	});
