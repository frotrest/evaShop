import css from './catalogSidebar.module.css';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import plusIcon from '@assets/ProductCatalog/+.svg';
import minusIcon from '@assets/ProductCatalog/-.svg';
import clsx from 'clsx';

export default function CatalogSidebar({ products = [], onFilterChange, currentFilters }) {
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState(currentFilters.brands || []);
  const [selectedTypes, setSelectedTypes] = useState(currentFilters.types || []);
  const [selectedSizes, setSelectedSizes] = useState(currentFilters.sizes || []);

  const prices = products.map((p) => p.price).filter((p) => typeof p === 'number');
  const minPrice = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const maxPrice = prices.length ? Math.ceil(Math.max(...prices)) : 1000;

  const [price, setPrice] = useState(currentFilters.price?.length ? currentFilters.price : null);
  const displayPrice = price || [minPrice, maxPrice];

  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  };

  const handleChangePriceCommitted = (event, newValue) => {
    const isDefault = newValue[0] === minPrice && newValue[1] === maxPrice;
    if (onFilterChange) {
      onFilterChange({
        brands: selectedBrands,
        types: selectedTypes,
        sizes: selectedSizes,
        price: isDefault ? [] : newValue,
      });
    }
  };

  const handleCheckboxChange = (filterType, value) => {
    let newBrands = selectedBrands;
    let newTypes = selectedTypes;
    let newSizes = selectedSizes;

    if (filterType === 'brand') {
      newBrands = selectedBrands.includes(value)
        ? selectedBrands.filter((item) => item !== value)
        : [...selectedBrands, value];
      setSelectedBrands(newBrands);
    } else if (filterType === 'type') {
      newTypes = selectedTypes.includes(value)
        ? selectedTypes.filter((item) => item !== value)
        : [...selectedTypes, value];
      setSelectedTypes(newTypes);
    } else if (filterType === 'size') {
      newSizes = selectedSizes.includes(value)
        ? selectedSizes.filter((item) => item !== value)
        : [...selectedSizes, value];
      setSelectedSizes(newSizes);
    }

    if (onFilterChange) {
      onFilterChange({
        brands: newBrands,
        types: newTypes,
        sizes: newSizes,
        price: price || [],
      });
    }
  };

  const getBrands = () => {
    const brands = products
      .map((item) => item.brand)
      .filter((brand) => brand != null && brand !== '');
    return [...new Set(brands)];
  };

  const getCategoryValue = (category) => {
    if (typeof category === 'string') return category;
    return category?.slug || category?.name || '';
  };

  const getTypes = () => {
    const types = products
      .map((item) => getCategoryValue(item.category))
      .filter((type) => type != null && type !== '');
    return [...new Set(types)];
  };

  const getSizes = () => {
    if (!products || products.length === 0) return [];

    const uniqueSizes = [...new Set(products.flatMap((item) => item.size))];

    const sizeOrder = {
      XS: 1,
      S: 2,
      M: 3,
      L: 4,
      XL: 5,
      XXL: 6,
      'One Size': 99,
    };

    uniqueSizes.sort((a, b) => {
      const orderA = sizeOrder[a];
      const orderB = sizeOrder[b];

      if (orderA && orderB) {
        return orderA - orderB;
      }
      if (orderA) return -1;
      if (orderB) return 1;

      return a.localeCompare(b, undefined, { numeric: true });
    });

    return uniqueSizes;
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const brands = getBrands();
  const types = getTypes();
  const sizes = getSizes();

  return (
    <div className={clsx(css.catalogSidebar)}>
      <Accordion
        expanded={expandedPanel === 'panel1'}
        onChange={handleChange('panel1')}
        className={clsx(css.accordion)}
      >
        <AccordionSummary
          expandIcon={
            <span className={clsx(css.categoryIcon)}>
              {expandedPanel === 'panel1' ? (
                <img src={minusIcon} alt="Collapse" loading="lazy" />
              ) : (
                <img src={plusIcon} alt="Expand" loading="lazy" />
              )}
            </span>
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h3 className={clsx(css.categoryTitle)}>Brand</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div className={clsx(css.categoryType)}>
            {brands.map((brand) => {
              return (
                <label className={clsx(css.brandsBrandWrapper)} key={brand}>
                  <input
                    type="checkbox"
                    className={clsx(css.checkbox)}
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleCheckboxChange('brand', brand)}
                  />
                  <span className={clsx(css.checkmark)}></span>
                  <label htmlFor={brand} className={clsx(css.brandsBrandLabel)}>
                    {brand}
                  </label>
                </label>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expandedPanel === 'panel2'}
        onChange={handleChange('panel2')}
        className={clsx(css.accordion)}
      >
        <AccordionSummary
          expandIcon={
            <span className={clsx(css.categoryIcon)}>
              {expandedPanel === 'panel2' ? (
                <img src={minusIcon} alt="Collapse" loading="lazy" />
              ) : (
                <img src={plusIcon} alt="Expand" loading="lazy" />
              )}
            </span>
          }
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <h3 className={clsx(css.categoryTitle)}>Type</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div className={clsx(css.categoryType)}>
            {types.map((type) => {
              return (
                <label className={clsx(css.typesTypeWrapper)} key={type}>
                  <input
                    type="checkbox"
                    className={clsx(css.checkbox)}
                    id={type}
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleCheckboxChange('type', type)}
                  />
                  <span className={clsx(css.checkmark)}></span>
                  <label htmlFor={type} className={clsx(css.typesTypeLabel)}>
                    {type}
                  </label>
                </label>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expandedPanel === 'panel3'}
        onChange={handleChange('panel3')}
        className={clsx(css.accordion)}
      >
        <AccordionSummary
          expandIcon={
            <span className={clsx(css.categoryIcon)}>
              {expandedPanel === 'panel3' ? (
                <img src={minusIcon} alt="Collapse" loading="lazy" />
              ) : (
                <img src={plusIcon} alt="Expand" loading="lazy" />
              )}
            </span>
          }
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <h3 className={clsx(css.categoryTitle)}>Size</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div className={clsx(css.categorySize)}>
            {sizes.map((size) => {
              return (
                <label className={clsx(css.sizesSizeWrapper)} key={size}>
                  <input
                    type="checkbox"
                    className={clsx(css.sizesSize)}
                    id={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleCheckboxChange('size', size)}
                  />
                  <label htmlFor={size} className={clsx(css.sizesSizeLabel)}>
                    {size}
                  </label>
                </label>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expandedPanel === 'panel4'}
        onChange={handleChange('panel4')}
        className={clsx(css.accordion)}
      >
        <AccordionSummary
          expandIcon={
            <span className={clsx(css.categoryIcon)}>
              {expandedPanel === 'panel4' ? (
                <img src={minusIcon} alt="Collapse" loading="lazy" />
              ) : (
                <img src={plusIcon} alt="Expand" loading="lazy" />
              )}
            </span>
          }
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <h3 className={clsx(css.categoryTitle)}>Price range</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography className={clsx(css.priceLabels)}>
              <span className={clsx(css.priceValue)}>{displayPrice[0]} EUR</span>
              <span className={clsx(css.priceValue)}>{displayPrice[1]} EUR</span>
            </Typography>
            <Slider
              value={displayPrice}
              onChange={handleChangePrice}
              onChangeCommitted={handleChangePriceCommitted}
              min={minPrice}
              max={maxPrice}
              disableSwap
              className={clsx(css.priceSlider)}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
