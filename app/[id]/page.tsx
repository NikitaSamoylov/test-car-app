"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";
import useHttp from "@/hooks/useHttp";
import { TCarFromServerItem, TCarPageProps } from "./page.types";
import styles from "./page.module.scss";

import defaultPageImage from "./defaultPageImage.png";

const CarPage: React.FC<TCarPageProps> = ({ params: { id } }) => {
  const { data, loading, error } = useHttp<TCarFromServerItem>(
    `/api/get-specific-car?id=${id}`
  );

  const [dataItem, setDataItem] = useState<TCarFromServerItem | null>(null);

  useEffect(() => {
    if (data !== null) {
      setDataItem(data);
    }
  }, [data]);

  const loaded = loading && <h2>Загрузка ...</h2>;
  const errores = error && <h2>Ошибка. Перезагрузите страницу</h2>;

  return (
    <div className="container">
      {dataItem && !loaded && !errores && (
        <div className={styles.car__content}>
          <NextImage
            src={dataItem ? dataItem.product.images[0].link : defaultPageImage}
            width={600}
            height={400}
            alt={dataItem ? dataItem.product.brand : ""}
            className={styles.car__img}
          />
          {dataItem && (
            <div className={styles.car}>
              {dataItem.product.brand && dataItem.product.model && (
                <h2 className={styles.car__title}>
                  <span className={styles.car__title_item}>
                    {dataItem.product.brand}
                  </span>
                  <span className={styles.car__title_item}>
                    {dataItem.product.model
                      ? dataItem.product.model
                      : "нет инфо"}
                  </span>
                </h2>
              )}
              <ul className={styles.car__description}>
                {dataItem.product.color && (
                  <li className={styles.car__description_item}>
                    {`цвет: ${dataItem?.product.color}`}
                  </li>
                )}
                {dataItem.product.engine && (
                  <li className={styles.car__description_item}>
                    {`двигатель: ${dataItem.product.engine}`}
                  </li>
                )}
                {dataItem.product.price && (
                  <li className={styles.car__description_item}>
                    {`цена: ${dataItem.product.price} руб.`}
                  </li>
                )}
                {dataItem.product.range && (
                  <li className={styles.car__description_item}>
                    {`запас хода: ${dataItem.product.range} км.`}
                  </li>
                )}
                {dataItem.product.transmission && (
                  <li className={styles.car__description_item}>
                    {`трансмиссия: ${dataItem.product.transmission}`}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarPage;
