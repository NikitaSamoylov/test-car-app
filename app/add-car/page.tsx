import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { CarAddForm } from '@/components/CarAddForm';
import { TAuthSessionUser } from '@/types/auth';
import styles from './page.module.scss';

const CarAddPage: React.FC = async () => {
  const session: TAuthSessionUser | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/')
  };

  return (
    <div className={ styles.addProduct }>
      <h3 className={ styles.addProduct__title }>
        Добавьте автомобиль
      </h3>
      <CarAddForm />
    </div>
  )
};

export default CarAddPage;