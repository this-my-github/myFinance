import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CreateCategory } from '../new-category/new-category';
import { Modal } from '../modal/modal';
import { Icon } from '../icon/icon';
import { selectCategories } from '../../selectors';
import { dividedToCategories } from '../../utils';
import { CATEGORY_TYPE } from '../../constants';
import styles from './categories-list.module.scss';

export const CategoriesList = ({
	type,
	selectedCategory,
	handleCategoryClick,
	iconSize = '35px',
	label = 'Категории',
	borderNone,
	containerStyle,
	categoryWidth,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const categories = useSelector(selectCategories);
	const { expenses, incomes } = dividedToCategories(categories);
	const categoriesFromType = type === CATEGORY_TYPE.EXPENSES ? expenses : incomes;

	return (
		<div className={styles.categories} style={borderNone}>
			<div className={styles.label}>{label}</div>
			<div className={styles.categories__container} style={containerStyle}>
				{categoriesFromType.map(({ id, title, type, icon }) => (
					<button
						className={`${styles.category} ${
							selectedCategory === id ? styles.selected : ''
						}`}
						style={categoryWidth}
						key={id}
						onClick={(event) =>
							handleCategoryClick(event, id, title, type, icon)
						}
					>
						<Icon id={icon} isClickable={true} size={iconSize} />
						<div>{title}</div>
					</button>
				))}
				<button
					className={styles.category}
					style={categoryWidth}
					onClick={() => setIsOpen(true)}
				>
					<Icon id="fa-plus-square-o" isClickable={true} size={iconSize} />
					<div>Создать</div>
				</button>
			</div>

			{isOpen && (
				<Modal onClose={() => setIsOpen(false)}>
					<CreateCategory
						headerTitle={'Новая категория'}
						type={type}
						onClose={() => setIsOpen(false)}
					/>
				</Modal>
			)}
		</div>
	);
};
