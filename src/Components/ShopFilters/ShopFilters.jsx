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
import { IoArrowForward } from 'react-icons/io5';

const ShopFilters = ({ shopId = 'mainFilters' }) => {
  const dispatch = useDispatch();

  const { products, status, error } = useSelector(selectOtherProductsState);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOtherProducts());
    }
  }, [status, dispatch]);

  const categories = useMemo(() => {
    const list = products.map((item) => item.category?.name).filter(Boolean);
    return [...new Set(list)];
  }, [products]);

  const filteredData = useMemo(() => {
    if (!products || products.length === 0) return [];
    return filters.length > 0
      ? products.filter((item) => filters.includes(item.category?.name)).slice(0, 9)
      : products.slice(0, 9);
  }, [filters, products]);

  const handleCheckBoxChange = useCallback(
    (category) => {
      dispatch(toggleFilter(category));
    },
    [dispatch],
  );

  return (
    <section className={clsx(styles.ShopFilters)} id={shopId}>
      <Container>
        <div className={clsx(styles.headerBox)}>
          <span className={clsx(styles.eyebrow)}>CURATED ATELIER PIECES</span>
          <h2 className={clsx(styles.mainTitle)}>Wardrobe Essentials</h2>
          <p className={clsx(styles.subDesc)}>
            Filter by silhouette to discover hand-finished items and contemporary essentials.
          </p>
        </div>

        <div className={clsx(styles.ShopFiltersContent)}>
          <ShopBoard
            categories={categories}
            filters={filters}
            onChange={handleCheckBoxChange}
            totalCount={products.length}
          />
          <div className={clsx(styles.clothesItems)}>
            <ShopItems shopItems={filteredData} />
            {error && (
              <h2 className={clsx(styles.errorTitle)}>
                Unable to load live feed. Displaying collection.
              </h2>
            )}
            <div className={clsx(styles.btnRow)}>
              <Link to="/catalog" className={clsx(styles.shopItemsBtn)}>
                <span>Explore Full Collection ({products.length} items)</span>
                <IoArrowForward size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ShopFilters;
