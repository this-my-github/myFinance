import { ACTION_TYPE } from './action-type';

export const removeCategory = (id) => ({
	type: ACTION_TYPE.REMOVE_CATEGORY,
	payload: id,
});
