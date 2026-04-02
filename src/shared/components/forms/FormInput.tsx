import clsx from "clsx";
import { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement>;

export default function FormInput(props: Props) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={clsx("border border-slate-200 p-3 w-full rounded-sm", className)} />
  )
}
