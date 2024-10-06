import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addAccountAsync, removeAccountAsync, updateAccountAsync } from '../../actions';
import { useResetForm } from '../../hooks';
import { ACCOUNT_TYPES } from '../../constants';
import { Input } from '../input/input';
import { IconContainer } from '../icon-container/icon-container';
import styles from './new-account.module.scss';

const accountScheme = yup.object().shape({
	title: yup
		.string()
		.required('Заполните название счёта')
		.matches(
			/^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/,
			'Неверно название счёта. Допускаются только буквы и цифры',
		)
		.min(3, 'Неверно заполнено  название счёта. Минимум 3 символа')
		.max(15, 'Неверно заполнено  название счёта. Максимум 15 символов'),
	moneyCount: yup
		.number()
		.required('Введена некорректная сумма')
		.min(0, 'Введена некорректная сумма')
		.max(Number.MAX_VALUE, 'Введена некорректная сумма'),
});

export const NewAccount = ({
	item = { id: '', title: '', count: 0, icon: '' },
	onClose,
}) => {
	const { id, title, count, icon } = item;
	const isEdit = id;

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: title,
			moneyCount: count,
		},
		resolver: yupResolver(accountScheme),
	});

	const [selectedIcon, setSelectedIcon] = useState(icon);

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	useResetForm(reset);

	const onSubmit = ({ title, moneyCount }) => {
		if (!selectedIcon) {
			setServerError('Выберите иконку');
			return;
		}

		const account = {
			title: title,
			count: moneyCount,
			icon: selectedIcon,
		};

		id
			? dispatch(updateAccountAsync({ ...account, id }))
			: dispatch(addAccountAsync(account));

		onClose();
	};

	const onDeleteAccount = (id) => {
		dispatch(removeAccountAsync(id));
		onClose();
	};

	const formError = errors?.moneyCount?.message || errors?.title?.message;

	const icons = ACCOUNT_TYPES;

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>{isEdit ? 'Изменение счета' : 'Новый счет'}</h2>
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
				<Input
					typeInput={'text'}
					placeholder="Сумма"
					errorMessage={formError}
					{...register('moneyCount', {
						onChange: () => setServerError(null),
					})}
				/>
				{serverError && <div className={styles.error}>{serverError}</div>}

				{isEdit && (
					<button
						className={styles.deleteBtn}
						onClick={() => onDeleteAccount(id)}
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
