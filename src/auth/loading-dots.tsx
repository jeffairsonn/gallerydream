import React from 'react';
import styles from './loading-dots.module.css';

const LoadingDots = ({ color }: { color?: string }) => (
  <span className={styles.loading}>
    <span style={{ backgroundColor: color }} />
    <span style={{ backgroundColor: color }} />
    <span style={{ backgroundColor: color }} />
  </span>
);

LoadingDots.defaultProps = {
  color: '#000',
};

export default LoadingDots;
