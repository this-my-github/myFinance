import { ACTION_TYPE } from './action-type';

export const setAccount = (account) => ({
	type: ACTION_TYPE.SET_ACCOUNT,
	payload: account,
});
