import { Toaster } from 'react-hot-toast';
import { SignOutBtn } from '../SignOutBtn';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__content}>
          <h1 className={styles.header__title}>
            Car App
          </h1>
          <SignOutBtn/>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={ false }
          gutter={ 8 }
          toastOptions={ {
            duration: 3000,
            style: {
              background: '#ffffff',
              color: 'rgb(72, 147, 209)',
              fontSize: '16px',
              textAlign: 'center',
              maxWidth: '250px',
            },
          } }
        />
      </div>
    </header>
  )
};

export {Header};