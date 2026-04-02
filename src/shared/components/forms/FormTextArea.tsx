
import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

export default function FormTextArea(props: Props) {
    const { className, ...rest } = props;
    return <textarea {...rest} className={clsx("block", className)} />


}
