import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectUserLogin } from '../../../../../../selectors';
import { logout } from '../../../../../../actions';
import { Icon } from '../../../../../icon/icon';
import styles from './user.module.scss';

export const User = ({ onClose }) => {
	const login = useSelector(selectUserLogin);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			<div className={styles.login}>{login}</div>
			<button
				className={styles.btn}
				onClick={() => {
					onClose();
				}}
			>
				<Icon id="fa-pencil" margin="1px 0 0 0" />
				<Link to="/changepassword">Сменить пароль</Link>
			</button>
			<button
				onClick={() => {
					dispatch(logout());
					navigate('/login');
					onClose();
				}}
				className={styles.btn}
			>
				<Icon id="fa-sign-out" margin="1px 0 0 0" />
				Выйти
			</button>
		</div>
	);
};
