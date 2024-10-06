import { request } from '../utils';
import { setAccounts } from './set-accounts';

export const loadAccountsAsync = () => (dispatch) =>
	request('/accounts').then((accountsData) => {
		if (accountsData.data) {
			dispatch(setAccounts(accountsData.data));
		}

		return accountsData;
	});
