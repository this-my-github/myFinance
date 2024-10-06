import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { loadCategoriesAsync } from '../../actions';
import { CategoriesList, Error, Modal } from '../../components';
import { CreateCategory } from '../../components';
import { CATEGORY_TYPE } from '../../constants';
import styles from './categories.module.css';

export const Categories = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const [category, setCategory] = useState({});
	const [isOpen, setIsOpen] = useState(false);

	const addCategory = () => {
		setIsOpen(true);
	};

	useEffect(() => {
		dispatch(loadCategoriesAsync()).then((categoriesData) => {
			setError(categoriesData.error);
			setIsLoading(false);
		});
	}, [dispatch]);

	const handleCategoryClick = (event, id, title, type, icon) => {
		event.preventDefault();
		setCategory({ id, title, type, icon });
		addCategory();
	};

	const renderCategorySection = (type, label) => (
		<div>
			<h2 className={styles.label}>{label}</h2>
			<CategoriesList
				type={type}
				handleCategoryClick={handleCategoryClick}
				iconSize="55px"
				label={null}
				borderNone={{ border: 'none' }}
				containerStyle={containerStyle}
				categoryWidth={{
					borderRadius: '2.5rem',
					width: '10rem',
					backgroundColor: '#d3d4f1',
				}}
			/>
		</div>
	);

	const containerStyle = {
		gap: '20px',
		borderRadius: '50px',
		backgroundColor: '#e9e9f5',
		padding: '40px',
		width: '525px',
	};

	return isLoading ? (
		<Oval wrapperClass={styles.loader} color="#e9e9f5" secondaryColor="#e9e9f5" />
	) : error ? (
		<Error error={error} />
	) : (
		<div className={styles.container}>
			<div className={styles.categories}>
				{renderCategorySection(CATEGORY_TYPE.EXPENSES, 'Расходы')}
				{renderCategorySection(CATEGORY_TYPE.INCOMES, 'Доходы')}

				{isOpen && (
					<Modal onClose={() => setIsOpen(false)}>
						<CreateCategory
							headerTitle={'Изменение категории'}
							id={category.id}
							title={category.title}
							type={category.type}
							icon={category.icon}
							onClose={() => setIsOpen(false)}
						/>
					</Modal>
				)}
			</div>
		</div>
	);
};
