import { ACTION_TYPE } from './action-type';

export const removeOperation = (id) => ({
	type: ACTION_TYPE.REMOVE_OPERATION,
	payload: id,
});
