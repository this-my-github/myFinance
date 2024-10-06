import { request } from '../utils';
import { setAccount } from './set-account';
import { setOperation } from './set-operation';

export const updateOperationAsync = (operation) => (dispatch) => {
	request(`/operations/${operation.id}`, 'PATCH', operation).then((newOperation) => {
		if (newOperation.data) {
			dispatch(setOperation(newOperation.data.operation));

			newOperation.data.accounts.forEach((account) => {
				dispatch(setAccount(account));
			});
		}

		return newOperation;
	});
};
