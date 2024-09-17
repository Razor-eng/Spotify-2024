import React from 'react'

interface HintProps {
    children: React.ReactNode;
    label: string;
}

const Hint = ({ children, label }: HintProps) => {
    return (
        <div className="group relative flex justify-center min-w-fit">
            <button>{children}</button>
            <span className="absolute top-8 -right-4 scale-0 transition-all min-w-24 rounded-lg bg-black bg-opacity-50 text-opacity-80 p-2 text-xs text-white group-hover:scale-100 flex items-center justify-center">{label}</span>
        </div>
    )
}

export default Hint