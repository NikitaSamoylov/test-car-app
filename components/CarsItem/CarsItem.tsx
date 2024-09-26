"use client";

import NextImage from "next/image";
import { ICarItemProps } from "./carsItem.types";
import styles from "./CarsItem.module.scss";
import Link from "next/link";

const CarsItem: React.FC<ICarItemProps> = ({
  brand,
  model,
  year,
  image,
  id,
}) => {
  return (
    <>
      <li className={styles.car}>
        <Link href={`/${id}`}>
          <NextImage
            src={image}
            width={400}
            height={261}
            alt={`${brand} ${model}`}
            className={styles.car__img}
          />
          <ul className={styles.car__content}>
            <li className={styles.car__info}>{brand}</li>
            <li className={styles.car__info}>{model}</li>
            <li className={styles.car__info}>{year}</li>
          </ul>
        </Link>
      </li>
    </>
  );
};

export { CarsItem };
