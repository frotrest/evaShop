import React from 'react';
import clsx from 'clsx';
import styles from './ProductCard.module.css';
import Container from '../Container';

const ProductCardList = ({ title, children }) => {
  return (
    <section className={clsx(styles.list)}>
      <Container>{title && <h2 className={clsx(styles.listTitle)}>{title}</h2>}</Container>
      {children}
    </section>
  );
};

export default ProductCardList;
