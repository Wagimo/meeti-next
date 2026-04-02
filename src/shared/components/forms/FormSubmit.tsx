import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function FormSubmit(props: Props) {
    const { className, ...rest } = props;
    return (

        <input
            type="submit"
            className={clsx("bg-pink-600 hover:bg-pink-700 transition-colors text-white w-full py-3 font-bold cursor-pointer mt-5", className)}
            {...rest}

        />

    )
}
