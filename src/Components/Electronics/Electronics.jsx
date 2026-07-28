import React from 'react';
import styles from './electronics.module.css';
import clsx from 'clsx';
import Container from '../Container';

const Electronic = () => {
  return (
    <section className={clsx(styles.electronics)}>
      <Container className={clsx(styles.electronicsContent)}>
        <h1 className={clsx(styles.electronicsContentTitle)}>Shoping without limits.</h1>
        <p className={clsx(styles.electronicsContentDescription)}>
          You can choose the best option for you, and it does not matter whether you are in Prague
          or San Francisco. We will deliver your purchase anywhere!
        </p>
        <a href="#shopItems" className={clsx(styles.electronicsContentBtn)}>
          Shop now
        </a>
      </Container>
    </section>
  );
};

export default Electronic;
