import styles from './pagination.module.scss';

export const Pagination = ({ page, lastPage, setPage }) => {
	return (
		<div className={styles.container}>
			<button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</button>
			<button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</button>
			<div className={styles.currentPage}>Страница: {page}</div>
			<button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</button>
			<button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</button>
		</div>
	);
};
