//import clsx from "clsx";

import clsx from "clsx";


type props = {
    children: React.ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}

export default function Heading({ children, level = 1, className }: props) {


    const Tag: React.ElementType = `h${level}`;
    const sizeMap: Record<number, string> = {
        1: 'text-3xl lg:text-4xl',
        2: 'text-2xl lg:text-3xl',
        3: 'text-xl lg:text-2xl',
        4: 'text-lg lg:text-xl',
        5: 'text-base lg:text-lg',
        6: 'text-sm lg:text-base',
    }


    return (
        <Tag className={clsx("text-black  text-center", sizeMap[level], className)}>
            {children}
        </Tag>
    )
}
