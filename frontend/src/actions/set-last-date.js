import { ACTION_TYPE } from './action-type';

export const setLastDate = (date) => ({
	type: ACTION_TYPE.SET_LAST_DATE,
	payload: date,
});
