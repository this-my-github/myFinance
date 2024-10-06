import { ACTION_TYPE } from './action-type';

export const setOperations = (operations) => ({
	type: ACTION_TYPE.SET_OPERATIONS,
	payload: operations,
});
