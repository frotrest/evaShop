import clsx from 'clsx';
import styles from './shopFilters.module.css';
import { IoCheckmarkOutline } from 'react-icons/io5';

const ShopBoard = ({ categories = [], filters = [], onChange, totalCount = 0 }) => {
  return (
    <aside className={clsx(styles.sideBarClothes)}>
      <div className={clsx(styles.sidebarHeader)}>
        <h3 className={clsx(styles.sideBarClothesTitle)}>Filter Category</h3>
        {filters.length > 0 && (
          <span className={clsx(styles.filterActiveBadge)}>{filters.length} active</span>
        )}
      </div>

      <div className={clsx(styles.clothesTypes)}>
        <button
          onClick={() => {
            filters.forEach((f) => onChange(f));
          }}
          className={clsx(styles.filterPillBtn, filters.length === 0 && styles.filterPillActive)}
        >
          <span>All Silhouettes</span>
          <span className={clsx(styles.catCount)}>{totalCount}</span>
        </button>

        {categories.map((category, index) => {
          const isSelected = filters.includes(category);
          return (
            <label
              key={index}
              className={clsx(styles.clothType, isSelected && styles.clothTypeSelected)}
            >
              <input
                type="checkbox"
                className={clsx(styles.clothCheckbox)}
                checked={isSelected}
                onChange={() => onChange(category)}
              />
              <span className={clsx(styles.customCheck)}>
                {isSelected && <IoCheckmarkOutline size={13} color="#ffffff" />}
              </span>
              <span className={clsx(styles.categoryName)}>{category}</span>
            </label>
          );
        })}
      </div>
    </aside>
  );
};

export default ShopBoard;
