import { request } from '../utils';
import { removeAccount } from './remove-account';

export const removeAccountAsync = (accountId) => (dispatch) => {
	request(`/accounts/${accountId}`, 'DELETE').then(() => {
		dispatch(removeAccount(accountId));
	});
};
