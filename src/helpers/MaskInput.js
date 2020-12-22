import React from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const defaultMaskOptions = {
  prefix: "R$",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ".",
};

export const CpfMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[1-9]/,
        /\d/,
        /\d/,
        ".",
        /[1-9]/,
        /\d/,
        /\d/,
        ".",
        /[1-9]/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
    />
  );
};

export const CurrencyMaskCustom = ({ maskOptions, ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return <MaskedInput mask={currencyMask} {...inputProps} />;
};

export const unmask = (value) => {
  return value.toString().replace(/\D+/g, "");
};
