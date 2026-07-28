import clsx from 'clsx';
import styles from './shopFilters.module.css';

const ShopBoard = ({ categories, filters, onChange }) => {
  return (
    <div className={clsx(styles.sideBarClothes)}>
      <h2 className={clsx(styles.sideBarClothesTitle)}>Shop Some Wear:</h2>
      <form className={clsx(styles.clothesTypes)}>
        {categories.map((category, index) => {
          return (
            <label key={index} className={styles.clothType}>
              <input
                type="checkbox"
                className={clsx(styles.clothCheckbox)}
                checked={filters.includes(category)}
                onChange={() => onChange(category)}
              />
              {category}
            </label>
          );
        })}
      </form>
    </div>
  );
};

export default ShopBoard;
