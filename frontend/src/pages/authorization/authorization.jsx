import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from '../../actions';
import { selectUserLogin } from '../../selectors';
import { useResetForm } from '../../hooks';
import { Input } from '../../components/input/input';
import styles from './authorization.module.scss';

const authFormScheme = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен  логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен  логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w_!]+$/,
			'Неверно заполнен пароль. Допускаются буквы и цифры и знаки _ !',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

export const Authorization = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormScheme),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const userLogin = useSelector(selectUserLogin);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		dispatch(loginUser(login, password)).then((userData) => {
			setServerError(userData.error);
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	if (userLogin) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>Авторизация</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					typeInput={'text'}
					placeholder="Логин"
					errorMessage={errors?.login?.message}
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					typeInput={'password'}
					placeholder="Пароль"
					errorMessage={errors?.password?.message}
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				{serverError && <div className={styles.error}>{serverError}</div>}
				<button className={styles.btn} type="submit" disabled={!!formError}>
					Войти
				</button>
			</form>
			<Link to="/registration">Регистрация</Link>
		</div>
	);
};
