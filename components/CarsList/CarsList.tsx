"use client";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { CarsItem } from "../CarsItem";
import { TCar, TCarFromServer } from "@/types/car";
import { FormSelectField } from "../FormSelectField";
import { carsOnPriceSort, carsOnYearSort } from "./cars-sort-options";
import { TColorFilters, TBrandFilters } from "./cars-list.types";
import styles from "./CarsList.module.scss";

import defaultImage from "./cars.jpg";
import useHttp from "@/hooks/useHttp";

const CarsList: React.FC = () => {
  const [cars, setCars] = useState<TCar[] | null>(null);
  const [skip, setSkip] = useState(0);
  const [isPageEnd, setIsPageEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [yearValue, setYearValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [colorsList, setColorsList] = useState<TColorFilters[]>([]);
  const [brandsList, setBrandsList] = useState<TBrandFilters[]>([]);
  const [currentFilters, setCurrentFilters] = useState<boolean>(true);

  const LIMIT = 10;

  const checkIsPageEnd = () => {
    if (cars && cars.length < LIMIT) {
      return setIsPageEnd(true);
    }

    return setIsPageEnd(false);
  };

  const getItems = () => {
    const carsColors = "/api/cars-colors";
    const carsBrands = "/api/cars-brands";
    const carsItems = `/api/new-car?page=${skip}&limit=${LIMIT}`;

    axios
      .all([
        axios.get(carsColors, { headers: { "Cache-Control": "no-cache" } }),
        axios.get(carsBrands, { headers: { "Cache-Control": "no-cache" } }),
        axios.get(carsItems),
      ])
      .then(
        axios.spread((carsColors, carsBrands, carsItems) => {
          setColorsList(carsColors.data.product);
          setBrandsList(carsBrands.data.product);
          setCars(carsItems.data.product);
          setIsLoading(false);
        })
      )
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  const { data, loading, error, handleUpdate } = useHttp<TCarFromServer>(
    `/api/new-car?page=${skip}&limit=${LIMIT}&yearsort=${yearValue}&pricesort=${priceValue}&color=${colorFilter}&brand=${brandFilter}`
  );

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (data !== null) {
      setCars(data.product);
    }
  }, [data]);

  useEffect(() => {
    handleUpdate();
  }, [skip, yearValue, priceValue, colorFilter, brandFilter]);

  useEffect(() => {
    checkIsPageEnd();
  }, [cars]);

  useEffect(() => {
    if (cars) {
      setCurrentFilters(true);
    }
  }, [cars]);

  const handlePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as HTMLButtonElement;
    if (el.getAttribute("btn-name") === "next") {
      return setSkip(skip + LIMIT);
    }

    return setSkip(skip - LIMIT);
  };

  const setYearSort = (value: string) => {
    setYearValue(value === "по возрастанию" ? "asc" : "desc");
  };

  const setPriceSort = (value: string) => {
    setPriceValue(value === "по возрастанию" ? "asc" : "desc");
  };

  const carsBrandOptions = [{label: "все", value: ""}].concat(Array.from(
      new Set(brandsList.map((n) => n.brand)),
      (n) => brandsList.find((m) => m.brand === n)
    ).map((item) => {
      return {
        label: item!.brand,
        value: item!.brand,
      }
    })
  );

  const carsColorsOptions = [{ label: "все", value: "" }].concat(
    Array.from(new Set(colorsList.map((n) => n.color)), (n) =>
      colorsList.find((m) => m.color === n)
    ).map((item) => {
      return {
        label: item!.color,
        value: item!.color,
      };
    })
  );

  const handleColorFilter = (value: string) => {
    setColorFilter(value);
  };

  const handleBrandFilter = (value: string) => {
    setBrandFilter(value);
  };

  const onFiltersReset = () => {
    setBrandFilter("");
    setColorFilter("");
    setCurrentFilters(false);
  };

  const loader = loading && isLoading && <h2>Загрузка...</h2>;

  const errors = error && isError && <h2>Ошибка...</h2>;

  const resetFilterBtn = cars && cars.length === 0 && brandFilter && (
    <div className={styles.cars__reset}>
      <h2 className={styles.cars__reset_title}>Выборки нет</h2>
      <button onClick={onFiltersReset} className={styles.cars__reset_btn}>
        Сбросить фильтр
      </button>
    </div>
  );

  const carsItems =
    !loading &&
    !isLoading &&
    !error &&
    !isError &&
    cars?.map((car) => (
      <CarsItem
        key={car._id}
        id={car._id}
        image={car.images ? car.images[0].link : defaultImage}
        brand={car.brand}
        model={car.model}
        year={car.year}
      />
    ));

  const selectorItems = !isLoading && !isError && currentFilters && (
    <div className={styles.cars__sort}>
      <FormSelectField
        options={carsOnYearSort}
        action={setYearSort}
        title={"Сортировать по году"}
      />
      <FormSelectField
        options={carsOnPriceSort}
        action={setPriceSort}
        title={"Сортировать по цене"}
      />
      <FormSelectField
        options={carsColorsOptions}
        action={handleColorFilter}
        title={"фильтр по цвету"}
      />
      <FormSelectField
        options={carsBrandOptions}
        action={handleBrandFilter}
        title={"фильтр по марке"}
      />
    </div>
  );

  const paginationBtns = !isLoading && !error && !isError && carsItems && (
    <div className={styles.cars__pagination}>
      {skip && (
        <button
          btn-name="back"
          className={styles.cars__btn}
          onClick={(e) => handlePage(e)}
        >
          Назад
        </button>
      )}
      {!isPageEnd && (
        <button
          btn-name="next"
          className={styles.cars__btn}
          onClick={(e) => handlePage(e)}
        >
          Вперед
        </button>
      )}
    </div>
  );

  return (
    <div className={styles.cars__content}>
      {selectorItems}
      <ul className={styles.cars}>
        {loader}
        {errors}
        {resetFilterBtn}
        {carsItems}
        {paginationBtns}
      </ul>
    </div>
  );
};

export { CarsList };
