import { FormHTMLAttributes } from "react";

type Props = FormHTMLAttributes<HTMLFormElement>;

export default function Form(props: Props) {
    return (
        <form className="mt-10 space-y-5 shadow-2xl p-10 " {...props}>
            {props.children}
        </form>
    )
}
