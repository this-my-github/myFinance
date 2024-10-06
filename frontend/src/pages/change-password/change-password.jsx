import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '../../components/input/input';
import { updateUserAsync } from '../../actions';
import { selectUserLogin } from '../../selectors';
import { useResetForm } from '../../hooks';
import styles from './change-password.module.scss';

const regFormScheme = yup.object().shape({
	oldPassword: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w_!]+$/,
			'Неверно заполнен пароль. Допускаются буквы и цифры и знаки _ !',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
	newPassword: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w_!]+$/,
			'Неверно заполнен пароль. Допускаются буквы и цифры и знаки _ !',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов')
		.notOneOf(
			[yup.ref('oldPassword'), null],
			'Новый пароль не может совпадать со старым паролем',
		),
});

export const ChangePassword = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			oldPassword: '',
			newPassword: '',
		},
		resolver: yupResolver(regFormScheme),
	});

	const [serverError, setServerError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const dispatch = useDispatch();

	const login = useSelector(selectUserLogin);

	useResetForm(reset);

	const onSubmit = ({ oldPassword, newPassword }) => {
		dispatch(updateUserAsync(login, oldPassword, newPassword)).then((userData) => {
			if (userData.error) {
				setServerError(userData.error);
			} else {
				setIsSuccess(true);
			}
		});
	};

	const formError = errors?.oldPassword?.message || errors?.newPassword?.message;

	if (isSuccess) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>Смена пароля</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					typeInput={'password'}
					placeholder="Старый пароль"
					errorMessage={errors?.oldPassword?.message}
					{...register('oldPassword', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					typeInput={'password'}
					placeholder="Новый пароль"
					errorMessage={errors?.newPassword?.message}
					{...register('newPassword', {
						onChange: () => setServerError(null),
					})}
				/>
				{serverError && <div className={styles.error}>{serverError}</div>}
				<button className={styles.btn} type="submit" disabled={!!formError}>
					Сменить пароль
				</button>
			</form>
		</div>
	);
};
