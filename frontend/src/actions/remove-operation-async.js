import { request } from '../utils';
import { removeOperation } from './remove-operation';
import { setAccount } from './set-account';

export const removeOperationAsync = (operationId) => (dispatch) => {
	request(`/operations/${operationId}`, 'DELETE').then(({ data }) => {
		dispatch(removeOperation(operationId));
		dispatch(setAccount(data.account));
	});
};
