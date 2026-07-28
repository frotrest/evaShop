import { useCallback, useEffect, useMemo } from 'react';
import Container from '../Container.jsx';
import ShopItems from './ShopItems.jsx';
import clsx from 'clsx';
import styles from './shopFilters.module.css';
import ShopBoard from './ShopBoard.jsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOtherProducts } from '../../store/async/otherProductsFetch.js';
import { toggleFilter } from '../../store/slices/filterSlice.js';
import { selectFilters, selectOtherProductsState } from '../../store/selectors.js';

const ShopFilters = () => {
  const dispatch = useDispatch();

  const { products, status, error } = useSelector(selectOtherProductsState);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOtherProducts());
    }
  }, [status, dispatch]);

  const categories = useMemo(
    () => [...new Set(products.map((item) => item.category.name))],
    [products],
  );
  const filteredData = useMemo(() => {
    return filters.length > 0
      ? products.filter((item) => filters.includes(item.category.name)).slice(0, 9)
      : products.slice(0, 9);
  }, [filters, products]);

  const handleCheckBoxChange = useCallback(
    (category) => {
      dispatch(toggleFilter(category));
    },
    [dispatch],
  );

  return (
    <section className={clsx(styles.ShopFilters)}>
      <div className={clsx(styles.ShopFiltersContent)}>
        <ShopBoard categories={categories} filters={filters} onChange={handleCheckBoxChange} />
        <Container className={clsx(styles.clothesItems)}>
          <ShopItems shopItems={filteredData} />
          {error && <h2 className={clsx(styles.errorTitle)}>There's no products yet</h2>}
          <Link to="/shop" className={styles.shopItemsBtn}>
            Load More
          </Link>
        </Container>
      </div>
    </section>
  );
};

export default ShopFilters;
