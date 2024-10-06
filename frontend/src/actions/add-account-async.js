import { request } from '../utils';
import { setAccount } from './set-account';

export const addAccountAsync = (account) => (dispatch) =>
	request('/accounts', 'POST', account).then((newAccount) => {
		if (newAccount.data) {
			dispatch(setAccount(newAccount.data));
		}

		return newAccount;
	});
