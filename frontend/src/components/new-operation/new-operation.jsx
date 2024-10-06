import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CATEGORY_TYPE } from '../../constants';
import {
	addOperationAsync,
	removeOperationAsync,
	updateOperationAsync,
} from '../../actions';
import { useResetForm } from '../../hooks';
import { selectAccounts } from '../../selectors';
import { Input } from '../input/input';
import { CategoriesList } from '../categories-list/categories-list';
import { DateSelector } from '../date-selector/date-selector';
import { SelectAccount } from '../select-account/select-account';
import styles from './new-operation.module.scss';

const regFormScheme = yup.object().shape({
	moneyCount: yup
		.number()
		.required('Введена некорректная сумма')
		.moreThan(0, 'Сумма должна быть больше нуля')
		.min(1, 'Введена некорректная сумма')
		.max(Number.MAX_VALUE, 'Введена некорректная сумма'),
	comment: yup.string(),
});

export const NewOperation = ({
	item = {
		id: '',
		account: 'Не задан',
		count: 0,
		categoryId: null,
		publishedAt: new Date().toLocaleDateString(),
		comment: '',
		type,
	},
	onClose,
}) => {
	const { id, account, count, categoryId, publishedAt, comment, type } = item;
	const isEdit = id;

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			moneyCount: count,
			comment: comment,
		},
		resolver: yupResolver(regFormScheme),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	useResetForm(reset);

	const accounts = useSelector(selectAccounts);
	const [selectedOption, setSelectedOption] = useState(account);
	const [selectedAccount, setSelectedAccount] = useState(
		accounts.filter(({ title }) => title === account)[0]?.id,
	);

	const [selectedCategory, setSelectedCategory] = useState(categoryId);
	const [selectedDate, setSelectedDate] = useState(publishedAt);

	const [categoryType, setCategoryType] = useState(type ? type : '');

	const onSubmit = ({ moneyCount, comment }) => {
		if (!selectedCategory) {
			setServerError('Выберите категорию');
			return;
		}

		if (selectedOption === 'Не задан') {
			setServerError('Выберите счёт');
			return;
		}

		const operation = {
			accountId: selectedAccount,
			categoryId: selectedCategory,
			comment,
			count: moneyCount,
			publishedAt: selectedDate,
		};

		id
			? dispatch(updateOperationAsync({ ...operation, id }))
			: dispatch(addOperationAsync(operation));

		onClose();
	};

	const handleChange = (event) => {
		const accountIndex = event.target.selectedIndex;
		if (accountIndex) {
			setSelectedAccount(accounts[accountIndex - 1].id);
		}
		setSelectedOption(event.target.value);
	};

	const handleCategoryClick = (event, id) => {
		event.preventDefault();
		setSelectedCategory(id);
	};

	const handleDateClick = (event, date) => {
		event.preventDefault();
		setSelectedDate(date);
	};

	const onDeleteOperation = (id) => {
		dispatch(removeOperationAsync(id));
		onClose();
	};

	const formError = errors?.moneyCount?.message;

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>
				{isEdit ? 'Изменение операции' : 'Новая операция'}
			</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.moneyCount}>
					<input
						className={styles.moneyCount__input}
						type={'text'}
						{...register('moneyCount', {
							onChange: () => setServerError(null),
						})}
					/>
					<div className={styles.moneySymbol}>{'BYN'}</div>
				</div>
				<SelectAccount
					optionsList={accounts}
					value={selectedOption}
					onChange={handleChange}
				/>
				{categoryType ? (
					<CategoriesList
						type={categoryType}
						selectedCategory={selectedCategory}
						handleCategoryClick={handleCategoryClick}
					/>
				) : (
					<div className={styles.selectCategory}>
						<button
							className={styles.smallBtn}
							onClick={() => setCategoryType(CATEGORY_TYPE.EXPENSES)}
						>
							{CATEGORY_TYPE.EXPENSES}
						</button>
						<button
							className={styles.smallBtn}
							onClick={() => setCategoryType(CATEGORY_TYPE.INCOMES)}
						>
							{CATEGORY_TYPE.INCOMES}
						</button>
					</div>
				)}
				<DateSelector
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					handleDateClick={handleDateClick}
				/>
				<Input
					typeInput={'text'}
					placeholder="Комментарии"
					errorMessage={formError}
					widthContainer={'30rem'}
					width={'27.4rem'}
					{...register('comment', {
						onChange: () => setServerError(null),
					})}
				/>
				{serverError && <div className={styles.error}>{serverError}</div>}

				{isEdit && (
					<button
						className={styles.deleteBtn}
						onClick={() => onDeleteOperation(id)}
					>
						Удалить
					</button>
				)}
				<button className={styles.btn} type="submit" disabled={!!formError}>
					{isEdit ? 'Сохранить' : 'Добавить'}
				</button>
			</form>
		</div>
	);
};
