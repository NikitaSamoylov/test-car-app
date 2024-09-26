"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TCar, TCarImages } from "@/types/car";
import UploadImage from "@/app/upload/upload";
import { notifyInfo } from "@/utils/notify";
import { FormField } from "../FormField";
import { FormSelectField } from "../FormSelectField";
import { engineOptions, transmissionOptions } from "./car-add-form-config";
import styles from "./CarAddForm.module.scss";

const CarAddForm: React.FC = () => {
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");
  const [productImgUrl, setProductImgUrl] = useState<TCarImages[]>([]);
  const [clearImg, setClearImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TCar>({
    mode: "onBlur",
  });

  const handleEngine = (value: string) => {
    setEngine(value);
  };

  const handleTransmission = (value: string) => {
    setTransmission(value);
  };

  const onReset = () => {
    reset();
    setProductImgUrl([]);
    setClearImg(true);
  };

  const onSubmit = async (data: TCar) => {
    setIsLoading(true);
    console.log(data);
    console.log(productImgUrl);
    console.log(transmission);

    axios
      .post("/api/new-car", {
        brand: data.brand.trim().toLowerCase(),
        model: data.model.trim().toLowerCase(),
        color: data.color.trim().toLowerCase(),
        price: data.price.trim(),
        year: data.year.trim(),
        engine: engine,
        transmission: transmission ? transmission : "",
        range: data.range ? data.range.trim() : "",
        images: productImgUrl,
      })
      .then(function () {
        notifyInfo("Товар добавлен");
        onReset();
        setIsLoading(false);
      })
      .catch(function () {
        notifyInfo("Что-то пошло не так");
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.addCar__content}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.addCar__form}>
        <FormField
          register={register}
          title={"модель"}
          name={"model"}
          errors={errors}
          type={"text"}
        />
        <FormField
          register={register}
          title={"бренд"}
          name={"brand"}
          errors={errors}
          type={"text"}
        />
        <FormField
          register={register}
          title={"цвет"}
          name={"color"}
          errors={errors}
          type={"text"}
        />
        <FormField
          register={register}
          title={"год"}
          name={"year"}
          errors={errors}
          type={"number"}
        />
        <FormField
          register={register}
          title={"цена"}
          name={"price"}
          errors={errors}
          type={"number"}
        />
        <FormSelectField
          options={engineOptions}
          action={handleEngine}
          title={"тип двигателя"}
        />
        {engine && engine !== "электрический" && (
          <FormSelectField
            action={handleTransmission}
            options={transmissionOptions}
            title={"трансмиссия"}
          />
        )}
        {engine && engine === "электрический" && (
          <FormField
            register={register}
            title={"запас хода, км"}
            name={"range"}
            errors={errors}
            type={"number"}
          />
        )}

        <UploadImage
          setProductImgUrl={(value) =>
            setProductImgUrl((productImgUrl) => [...productImgUrl, value])
          }
          clearImg={clearImg}
          setClearImg={(value: boolean) => setClearImg(value)}
        />

        <div className={styles.addCar__btns}>
          <button
            className={`${styles.addCar__btn} ${styles.addCar__btn_add} `}
            disabled={!isValid || !engine || productImgUrl.length === 0}
          >
            {isLoading ? "Загрузка товара..." : " Добавить товар"}
          </button>
          <button className={styles.addCar__btn} onClick={onReset}>
            очистить форму
          </button>
        </div>
      </form>
    </div>
  );
};

export { CarAddForm };
