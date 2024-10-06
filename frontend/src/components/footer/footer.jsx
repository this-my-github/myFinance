import styles from './footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.container}>
			<div className={styles.text}>Мои финансы 2024</div>
			<div className={styles.text}>this_mail_for_everything@mail.ru</div>
		</footer>
	);
};
