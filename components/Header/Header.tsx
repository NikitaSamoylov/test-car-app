import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>
        Car App
      </h1>
    </header>
  )
};

export {Header};