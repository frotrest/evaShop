import React from 'react';
import styles from './posters.module.css';
import clsx from 'clsx';
import Container from '../Container';
import { Link } from 'react-router-dom';

const Shopping = () => {
  return (
    <section className={clsx(styles.shopping)}>
      <Container className={clsx(styles.shoppingContent)}>
        <h1 className={clsx(styles.shoppingContentTitle)}>Shoping without limits.</h1>
        <p className={clsx(styles.shoppingContentDescription)}>
          You can choose the best option for you, and it does not matter whether you are in Prague
          or San Francisco. We will deliver your purchase anywhere!
        </p>
        <Link to="/catalog" className={clsx(styles.shoppingContentBtn)}>
          Shop now
        </Link>
      </Container>
    </section>
  );
};

const Traveling = () => {
  return (
    <section className={clsx(styles.traveling)}>
      <Container className={clsx(styles.travelingContent)}>
        <h1 className={clsx(styles.travelingContentTitle)}>EXPLORE THE BEST OF YOU.</h1>
        <p className={clsx(styles.travelingContentDescription)}>
          You can choose the best option for you, and it does not matter whether you are in Prague
          or San Francisco.
        </p>
        <Link to="/catalog" className={clsx(styles.travelingContentBtn)}>
          Shop now
        </Link>
      </Container>
    </section>
  );
};

export { Shopping, Traveling };
