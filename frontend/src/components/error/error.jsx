import styles from './error.module.css';

export const Error = ({ error }) =>
	error && (
		<div className={styles.container}>
			<h2>Ошибка</h2>
			<div>{error}</div>
		</div>
	);
