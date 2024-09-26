"use client";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TFormSelectField } from "./FormSelectField.types";
import styles from "./FormSelectField.module.scss";

const FormSelectField: React.FC<TFormSelectField> = ({
  options,
  action,
  title,
}) => {
  const animatedComponents = makeAnimated();

  return (
    <>
      <span className={styles.select__title}>{title}</span>
      <div style={{ marginBottom: 10 }}>
        <Select
          options={options}
          closeMenuOnSelect={true}
          components={animatedComponents}
          isMulti={false}
          placeholder={"выберите вариант"}
          noOptionsMessage={() => "варианты закончились"}
          styles={{
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "grey",
              fontSize: "1.6rem",
            }),
            menuList: (baseStyles) => ({
              ...baseStyles,
              color: "black",
              fontSize: "1.6rem",
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: "black",
              fontSize: "1.6rem",
            }),
            multiValueLabel: (baseStyles) => ({
              ...baseStyles,
              color: "black",
              fontSize: "1.6rem",
              backgroundColor: "#eeebeb",
            }),
            multiValueRemove: (baseStyles, state) => ({
              ...baseStyles,
              color: state.isFocused ? "black" : "black",
              backgroundColor: state.isFocused
                ? "rgb(72, 147, 209)"
                : "rgb(72, 147, 209)",
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            outline: "none",
            minWidth: 400,
            colors: {
              ...theme.colors,
              primary25: "#c5e8f2",
              primary: "#c5e8f2",
            },
          })}
          onChange={(options: any) => action(options.value)}
        />
      </div>
    </>
  );
};

export { FormSelectField };
