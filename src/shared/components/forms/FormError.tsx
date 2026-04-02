import React from 'react'

export default function FormError({ children }: { children: React.ReactNode }) {
    const hasMessage = typeof children === 'string'
        ? children.trim().length > 0
        : Boolean(children)

    return (
        <p
            className={`text-xs border-l-2 p-1  flex items-center ${hasMessage
                ? 'text-red-600 bg-red-100 border-red-600'
                : 'text-transparent bg-transparent border-transparent'
                }`}
        >
            {children}
        </p>
    )
}
