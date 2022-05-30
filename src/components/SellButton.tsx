import React from "react";
import { onClickCheckout } from "../library";
export interface ComponentProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  store: number | string;
  product?: number | string;
  variant?: number | string;
  darkmode?: boolean;
  theme?: string;
  label?: string;
}

export const SellButton: React.FunctionComponent<ComponentProps> = (
  props: ComponentProps
) => {
  const {
    store,
    product,
    variant,
    darkmode,
    theme,
    label = "Buy now!",
  } = props;
  const data = {
    store_id: store,
    product_id: product,
    variant_id: variant,
    darkmode,
    theme,
  };
  return (
    <button
      id="sellapplaunch"
      data-sell-store={store}
      data-sell-product={product}
      data-sell-darkmode={darkmode}
      data-sell-variant={variant}
      data-sell-theme={theme}
      onClick={() => onClickCheckout(data)}
      {...props}
    >
      {label}
    </button>
  );
};
