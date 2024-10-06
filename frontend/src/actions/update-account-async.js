import { request } from '../utils';
import { setAccount } from './set-account';

export const updateAccountAsync =
	(account, type = 'none') =>
	(dispatch) =>
		request(`/accounts/${account.id}`, 'PATCH', { ...account, type }).then(
			(newAccount) => {
				if (newAccount.data) {
					dispatch(setAccount(newAccount.data));
				}

				return newAccount;
			},
		);
