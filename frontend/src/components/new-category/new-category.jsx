import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CATEGORY_TYPE, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants';
import {
	addCategoryAsync,
	removeCategoryAsync,
	updateCategoryAsync,
} from '../../actions';
import { useResetForm } from '../../hooks';
import { Input } from '../input/input';
import { IconContainer } from '../icon-container/icon-container';
import styles from './new-category.module.scss';

const regFormScheme = yup.object().shape({
	title: yup
		.string()
		.required('Заполните название категории')
		.matches(
			/^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/,
			'Неверно название счёта. Допускаются только буквы и цифры',
		)
		.min(3, 'Неверно заполнено  название категории. Минимум 3 символа')
		.max(15, 'Неверно заполнено  название категории. Максимум 15 символов'),
});

export const CreateCategory = ({ id, title = '', icon, headerTitle, type, onClose }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: title,
		},
		resolver: yupResolver(regFormScheme),
	});

	const [selectedIcon, setSelectedIcon] = useState(icon);
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	useResetForm(reset);

	const onSubmit = ({ title }) => {
		if (!selectedIcon) {
			setServerError('Выберите иконку');
			return;
		}

		id
			? dispatch(updateCategoryAsync(id, title, type, selectedIcon))
			: dispatch(addCategoryAsync(title, type, selectedIcon));
		onClose();
	};

	const onDeleteCategory = (id) => {
		dispatch(removeCategoryAsync(id));
	};

	const formError = errors?.title?.message;

	const icons =
		type === CATEGORY_TYPE.EXPENSES ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>{headerTitle}</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					typeInput={'text'}
					placeholder="Название"
					errorMessage={formError}
					{...register('title', {
						onChange: () => setServerError(null),
					})}
				/>
				<IconContainer
					icons={icons}
					selectedIcon={selectedIcon}
					setSelectedIcon={setSelectedIcon}
				/>
				<div className={styles.selectContainer}>
					<label htmlFor="income-expense-select">Тип</label>
					<div id="income-expense-select" className={styles.select}>
						{type}
					</div>
				</div>

				{serverError && <div className={styles.error}>{serverError}</div>}
				{id && (
					<button
						className={styles.deleteBtn}
						onClick={() => onDeleteCategory(id)}
					>
						Удалить
					</button>
				)}
				<button className={styles.btn} type="submit" disabled={!!formError}>
					{id ? 'Сохранить' : 'Добавить'}
				</button>
			</form>
		</div>
	);
};
