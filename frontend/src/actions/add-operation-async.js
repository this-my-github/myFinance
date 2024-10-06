import { request } from '../utils';
import { setAccount } from './set-account';
import { setOperation } from './set-operation';

export const addOperationAsync = (operation) => (dispatch) =>
	request('/operations', 'POST', operation).then((newOperation) => {
		if (newOperation.data) {
			dispatch(setOperation(newOperation.data.operation));
			dispatch(setAccount(newOperation.data.account));
		}

		return newOperation;
	});
