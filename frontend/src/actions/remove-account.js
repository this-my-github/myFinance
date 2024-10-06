import { ACTION_TYPE } from './action-type';

export const removeAccount = (id) => ({
	type: ACTION_TYPE.REMOVE_ACCOUNT,
	payload: id,
});
