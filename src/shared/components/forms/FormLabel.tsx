import clsx from "clsx";
import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export default function FormLabel(props: Props) {
  const { className, ...rest } = props;
  return (
    <label {...rest} className={clsx("block", className)} >{props.children}</label>
  )
}
