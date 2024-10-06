import { request } from '../utils';
import { setOperations } from './set-operations';

export const loadOperationsAsync =
	(filter = '', page = '', limit = '') =>
	(dispatch) =>
		request(`/operations?filter=${filter}&page=${page}&limit=${limit}`).then(
			({ data: { operations, lastPage } }) => {
				if (operations) {
					dispatch(setOperations(operations));
				}

				return { operations, lastPage };
			},
		);
