import { request } from '../utils';
import { removeCategory } from './remove-category';

export const removeCategoryAsync = (categoryId) => (dispatch) => {
	request(`/categories/${categoryId}`, 'DELETE').then(() => {
		dispatch(removeCategory(categoryId));
	});
};
