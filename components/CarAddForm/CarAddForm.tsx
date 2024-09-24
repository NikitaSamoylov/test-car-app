"use client";

import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useForm } from 'react-hook-form';
import { TCar, TCarImages } from '@/types/car';
import UploadImage from '@/app/upload/upload';
import { notifyInfo } from '@/utils/notify';
import styles from './CarAddForm.module.scss';

type TSelectOptions = {
  value: string;
  label: string;
};

const engineOptions: TSelectOptions[] = [
  { value: 'бензиновый', label: 'бензиновый' },
  { value: 'дизельный', label: 'дизельный' },
  { value: 'электрический', label: 'электрический' },
];

const transmissionOptions: TSelectOptions[] = [
  { value: 'ручная', label: 'ручная' },
  { value: 'автоматическая', label: 'автоматическая' },
  { value: 'роботизированная', label: 'роботизированная' },
];

// type TCategoryOptions = {
//   value: string;
//   label: string;
// };

// const categoryOptions: TCategoryOptions[] = [
//   { value: 'майки', label: 'майки и футболки' },
//   { value: 'штаны', label: 'брюки и джинсы' },
//   { value: 'толстовки', label: 'толстовки' },
//   { value: 'куртки', label: 'куртки и пальто' },
// ];

// type TBrandOptions = {
//   value: string;
//   label: string;
// };

// const brandOptions: TBrandOptions[] = [
//   { value: 'Pull & Bear', label: 'Pull & Bear' },
//   { value: 'Bershka', label: 'Bershka' },
//   { value: 'Incity', label: 'Incity' },
//   { value: 'Incanto', label: 'Incanto' },
// ];

const CarAddForm: React.FC = () => {
  const [engine, setEngine] = useState<''>('');//TProductSizeOptions[]
  const [transmission, setTransmission] = useState<TSelectOptions[] | null>([]);//category
  const [brand, setBrand] = useState<string>('');
  const [productImgUrl, setProductImgUrl] = useState<TCarImages[]>([]);
  const [clearImg, setClearImg] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TCar>({
    mode: 'onBlur'
  });

  const onReset = () => {
    reset();
    setProductImgUrl([]);
    setClearImg(true);
  };

  const onSubmit = async (data: TCar) => {
    setIsLoading(true);

    // try {
    //   const response = await fetch('/api/new-product', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       title: data.title.trim(),
    //       description: data.description.trim(),
    //       price: +data.price,
    //       sizes: productSize.map(el => el.value),
    //       category: category ? category.value.trim() : null,
    //       images: productImgUrl,
    //       inStock: true,
    //       brand: brand ? brand.trim() : null
    //     })
    //   });

    //   if (response.status === 200) {
    //     notifyInfo('Продукт добавлен');
    //     onReset();
    //   };

    //   if (response.status === 400) {
    //     notifyInfo('Такой продукт уже добавлен')
    //   };

    //   if (
    //     response.status !== 200 &&
    //     response.status !== 400
    //   ) {
    //     notifyInfo('что-то пошло не так')
    //   }

    //   setIsLoading(false);

    // } catch (err: any) {
    //   console.log(err)
    //   setIsLoading(false);
    // };
  };

  const animatedComponents = makeAnimated();

  return (
    <div className={ styles.addCar__content }>
      <form onSubmit={ handleSubmit(onSubmit) }
        className={ styles.addCar__form }
      >
        <label htmlFor="brand"
          className={ styles.addCar__input_label }
        >
          название бренда
          <input type="text"
            id='brand'
            className={ styles.addCar__input }
            {
            ...register("brand", {
              required: 'заполните поле',
              minLength: {
                value: 2,
                message: 'минимум 2 символа'
              }
            })
            }
          />
        </label>
        {
          errors?.brand ?
            <span className={ styles.addCar__input_error }>
              { errors.brand.message }
            </span> :
            null
        }

        <label htmlFor="model"
          className={ styles.addCar__input_label }
        >
          название модели
          <input type="text"
            id='model'
            className={ styles.addCar__input }
            {
            ...register("model", {
              required: 'заполните поле',
              minLength: {
                value: 2,
                message: 'минимум 2 символа'
              }
            })
            }
          />
        </label>
        {
          errors?.model ?
            <span className={ styles.addCar__input_error }>
              { errors.model.message }
            </span> :
            null
        }

        <label htmlFor="color"
          className={ styles.addCar__input_label }
        >
          цвет
          <input type="text"
            id='color'
            className={ styles.addCar__input }
            {
            ...register("color", {
              required: 'заполните поле',
              minLength: {
                value: 2,
                message: 'минимум 2 символа'
              }
            })
            }
          />
        </label>
        {
          errors?.color ?
            <span className={ styles.addCar__input_error }>
              { errors.color.message }
            </span> :
            null
        }

        <label htmlFor="year"
          className={ styles.addCar__input_label }
        >
          год выпуска
          <input type="text"
            id='year'
            className={ styles.addCar__input }
            {
            ...register("year", {
              required: 'заполните поле',
              minLength: {
                value: 2,
                message: 'минимум 2 символа'
              }
            })
            }
          />
        </label>
        {
          errors?.year ?
            <span className={ styles.addCar__input_error }>
              { errors.year.message }
            </span> :
            null
        }

        <label htmlFor="price"
          className={ styles.addCar__input_label }
        >
          цена
          <input type="number"
            id='price'
            className={ styles.addCar__input }
            min={ 1 }
            {
            ...register("price", {
              required: 'заполните поле',
              minLength: {
                value: 1,
                message: 'минимум 1 символ'
              },
            })
            }
          />
        </label>
        {
          errors?.price ?
            <span className={ styles.addCar__input_error }>
              { errors.price.message }
            </span> :
            null
        }

        <span className={ styles.addCar__size_title }>
          тип двигателя
        </span>
        <div style={{ marginBottom: 10 }}>
          <Select options={ engineOptions }
            components={ animatedComponents }
            closeMenuOnSelect={ false }
            placeholder={ 'выберите вариант' }
            noOptionsMessage={
              () => 'варианты закончились'
            }
            styles={ {
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'grey',
                fontSize: '1.6rem'
              }),
              menuList: (baseStyles) => ({
                ...baseStyles,
                color: 'black',
                fontSize: '1.6rem'
              }),
              multiValueLabel: (baseStyles) => ({
                ...baseStyles,
                color: 'black',
                fontSize: '1.6rem',
                backgroundColor: '#eeebeb'
              }),
              multiValueRemove: (baseStyles, state) => ({
                ...baseStyles,
                color: state.isFocused ? 'black' : 'black',
                backgroundColor: state.isFocused 
                ? 'rgb(72, 147, 209)' 
                : 'rgb(72, 147, 209)',
              }),
            } }
            theme={ (theme) => ({
              ...theme,
              borderRadius: 5,
              outline: 'none',
              colors: {
                ...theme.colors,
                primary25: '#c5e8f2',
                primary: '#c5e8f2',
              },
            }) }
            onChange={
              (options: any) => setEngine(options.value)
            }
          />
        </div>
        {
          engine && engine !== 'электрический' && (
            <>
            <span className={ styles.addCar__size_title }>
              трансмиссия
            </span>
            <div style={{ marginBottom: 10 }}>
              <Select options={ transmissionOptions }
                components={ animatedComponents }
                closeMenuOnSelect={ false }
                placeholder={ 'выберите вариант' }
                noOptionsMessage={
                  () => 'варианты закончились'
                }
                styles={ {
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: 'grey',
                    fontSize: '1.6rem'
                  }),
                  menuList: (baseStyles) => ({
                    ...baseStyles,
                    color: 'black',
                    fontSize: '1.6rem'
                  }),
                  multiValueLabel: (baseStyles) => ({
                    ...baseStyles,
                    color: 'black',
                    fontSize: '1.6rem',
                    backgroundColor: '#eeebeb'
                  }),
                  multiValueRemove: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.isFocused ? 'black' : 'black',
                    backgroundColor: state.isFocused 
                    ? 'rgb(72, 147, 209)' 
                    : 'rgb(72, 147, 209)',
                  }),
                } }
                theme={ (theme) => ({
                  ...theme,
                  borderRadius: 5,
                  outline: 'none',
                  colors: {
                    ...theme.colors,
                    primary25: '#c5e8f2',
                    primary: '#c5e8f2',
                  },
                }) }
                onChange={
                  (options: any) => setTransmission(options.value)
                }
              />
            </div>
            </>
          )
        }

        {
          engine && engine === 'электрический' && (
            <label htmlFor="range"
              className={ styles.addCar__input_label }
            >
              запас хода, км
              <input type="text"
                id='range'
                className={ styles.addCar__input }
                {
                ...register("range", {
                  required: 'заполните поле',
                  minLength: {
                    value: 2,
                    message: 'минимум 2 символа'
                  }
                })
                }
              />
            </label>
          )
        }
        {
          errors?.range ?
            <span className={ styles.addCar__input_error }>
              { errors.range.message }
            </span> :
            null
          }


        <UploadImage
          setProductImgUrl={
            (value) => setProductImgUrl(
              productImgUrl => [...productImgUrl, value]
            )
          }
          clearImg={ clearImg }
          setClearImg={ (value: boolean) => setClearImg(value) }
        />
        <div className={ styles.addProduct__btns }>
          <button className={
            `${ styles.addProduct__btn } ${ styles.addProduct__btn_add } `
          }
            // disabled={
            //   !isValid ||
            //   category === null ||
            //   productSize.length === 0 ||
            //   productImgUrl.length === 0
            // }
          >
            {
              isLoading ?
                'Загрузка товара...' :
                ' Добавить товар'
            }
          </button>
          <button className={ styles.addProduct__btn }
            onClick={ onReset }
          >
            очистить форму
          </button>
        </div>
      </form>
    </div>
  )
};

export { CarAddForm };