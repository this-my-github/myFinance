import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { loadAccountsAsync, loadOperationsAsync } from '../../actions';
import { selectAccounts, selectOperations } from '../../selectors';
import { Operation, Pagination } from './components';
import { CalendarIcon, Error, Modal, NewOperation } from '../../components';
import { PAGINATION_LIMIT } from '../../constants';
import { dividedToCategories } from '../../utils';
import styles from './operations.module.scss';

export const Operations = () => {
	const operations = useSelector(selectOperations);
	const accounts = useSelector(selectAccounts);
	const { expenses, incomes } = dividedToCategories(operations);

	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedFilter, setSelectedFilter] = useState('по дате');
	const [selectedAccount, setSelectedAccount] = useState('Итого');

	const dispatch = useDispatch();

	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const addOperation = () => {
		setIsOpen(true);
	};

	const handleChangeFilter = (event) => {
		setSelectedFilter(event.target.value);
	};

	useEffect(() => {
		Promise.all([
			dispatch(loadAccountsAsync()),
			dispatch(loadOperationsAsync(selectedFilter, page, PAGINATION_LIMIT)),
		]).then(([accounts, { lastPage, operations }]) => {
			if (!accounts || !operations) {
				setError('Произошла ошибка при загрузке данных. Попробуйте ещё раз');
			}

			setIsLoading(false);
			setLastPage(lastPage);
		});
	}, [dispatch, selectedFilter, page]);

	const [isExpenses, setIsExpenses] = useState(true);
	const [isIncomes, setIsIncomes] = useState(true);

	const handleExpenses = (event) => {
		setIsExpenses(event.target.checked);
	};
	const handleIsIncomes = (event) => {
		setIsIncomes(event.target.checked);
	};

	// Определяем массив для отображения
	let filteredOperations = [];

	if (isExpenses && isIncomes) {
		filteredOperations = operations;
	} else if (isExpenses) {
		filteredOperations = expenses;
	} else if (isIncomes) {
		filteredOperations = incomes;
	}

	if (selectedAccount !== 'Итого') {
		filteredOperations = filteredOperations.filter(
			(operation) => operation.account === selectedAccount,
		);
	}

	const [value, onChange] = useState([null, null]);

	if (value[0] || value[1]) {
		filteredOperations = filteredOperations.filter((operation) => {
			const [day, month, year] = operation.publishedAt.split('.').map(Number);
			const operationDate = new Date(year, month - 1, day);

			const isAfterStartDate = value[0] ? operationDate >= value[0] : true;
			const isBeforeEndDate = value[1] ? operationDate <= value[1] : true;

			return isAfterStartDate && isBeforeEndDate;
		});
	}

	const handleChange = (event) => {
		setSelectedAccount(event.target.value);
	};

	const item = {
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
			<div className={styles.header}>
				<h2>История операций</h2>
				<div className={styles.contralPanel}>
					<CalendarIcon value={value} onChange={onChange} selectRange={true} />
					<div className={styles.typeSelectContainer}>
						<div className={styles.checkboxContainer}>
							<div className={styles.type}>Доходы</div>

							<input
								type="checkbox"
								checked={isIncomes}
								onChange={handleIsIncomes}
							/>
						</div>
						<div className={styles.checkboxContainer}>
							<div className={styles.type}>Расходы</div>
							<input
								type="checkbox"
								checked={isExpenses}
								onChange={handleExpenses}
							/>
						</div>
					</div>
					<select
						className={styles.select}
						value={selectedFilter}
						onChange={handleChangeFilter}
					>
						<option key={'по дате'}>по дате</option>
						<option key={'по сумме'}>по сумме</option>
					</select>
					<select
						className={styles.select}
						id="income-expense-select"
						value={selectedAccount}
						onChange={handleChange}
					>
						<option key={'Итого'}>Итого</option>
						{accounts.map(({ title }) => (
							<option key={title}>{title}</option>
						))}
					</select>
					<button onClick={() => addOperation()}>Добавить операцию</button>
				</div>
			</div>
			<div className={styles.operations}>
				{filteredOperations.length > 0 ? (
					filteredOperations.map((item) => (
						<Operation key={item.id} item={item} />
					))
				) : (
					<div className={styles.errorMessage}>
						{'Операций ещё нет. Добавьте их'}
					</div>
				)}
			</div>
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}

			{isOpen && (
				<Modal width={'600px'} onClose={() => setIsOpen(false)}>
					<NewOperation item={item} onClose={() => setIsOpen(false)} />
				</Modal>
			)}
		</div>
	);
};
