import { ACTION_TYPE } from './action-type';

export const setOperation = (operation) => ({
	type: ACTION_TYPE.SET_OPERATION,
	payload: operation,
});
