import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { selectAccounts, selectOperations } from '../../selectors';
import { loadAccountsAsync, loadOperationsAsync } from '../../actions';
import { Card, Error, NewAccount, NewOperation } from '../../components';
import { Charts, AccountsTransfer } from './components';
import { Account } from '../../components/account/account';
import { Operation } from '../../components/operation/operation';
import styles from './main-page.module.css';

export const MainPage = () => {
	const accounts = useSelector(selectAccounts);
	const operations = useSelector(selectOperations);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		Promise.all([
			dispatch(loadAccountsAsync()),
			dispatch(loadOperationsAsync()),
		]).then(([accounts, { operations }]) => {
			if (!accounts || !operations) {
				setError('Произошла ошибка при загрузке данных. Попробуйте ещё раз');
			}

			setIsLoading(false);
		});
	}, [dispatch]);

	const accountItem = { id: '', title: '', count: 0, icon: '' };

	const operationItem = {
		type: '',
		id: '',
		account: 'Не задан',
		count: 0,
		categoryId: null,
		publishedAt: new Date().toLocaleDateString(),
		comment: '',
	};

	return isLoading ? (
		<Oval wrapperClass={styles.loader} color="#e9e9f5" secondaryColor="#e9e9f5" />
	) : error ? (
		<Error error={error} />
	) : (
		<div className={styles.container}>
			<div className={styles.upperContainer}>
				<div className={styles.chartsContainer}>
					<Charts />
				</div>
				<div className={styles.accounts}>
					<Card
						headerTitle={'Cчета'}
						list={accounts}
						NewListElement={NewAccount}
						item={accountItem}
						errorMessage={'Счетов ещё нет. Добавьте их'}
					>
						{(item) => <Account item={item} />}
					</Card>
				</div>
			</div>
			<div className={styles.lowerContainer}>
				<div className={styles.operations}>
					<Card
						headerTitle={'Последние операции'}
						list={operations.slice(-7)}
						NewListElement={NewOperation}
						item={operationItem}
						errorMessage={'Операций ещё нет. Добавьте их'}
					>
						{(item) => <Operation item={item} />}
					</Card>
				</div>
				<div className={styles.accounts}>
					<AccountsTransfer />
				</div>
			</div>
		</div>
	);
};
