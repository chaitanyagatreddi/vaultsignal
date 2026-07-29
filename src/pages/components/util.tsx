import { useState } from 'react'
import type { StatusCardProps, StatusHelpersProps } from '@/types/dashboard'
import NegativeSvg from '@/assets/svgs/negative.svg?react'
import PostiiveSvg from '@/assets/svgs/positive.svg?react'

function StatusHelpers({
    Element,
    text,
    variant = 'default',
}: StatusHelpersProps) {
    const [hoverState, setHoverState] = useState<boolean>(false)

    if (variant === 'secure') {
        return (
            <div className="flex gap-2 items-center py-1.5 px-2 h-auto border border-[#A2E9C1] bg-[#E8FAF0] text-[12px] rounded-[8px] w-[127px]">
                <Element fill="#12A150" className="text-[#12A150] size-3" />
                {text && (
                    <p className="font-medium text-[#12A150] leading-none">
                        {text}
                    </p>
                )}
            </div>
        )
    }

    if (variant === 'cta') {
        return (
            <button
                type="button"
                className={`cursor-pointer flex gap-2 items-center py-2 h-9 px-3.5 rounded-[8px] text-[12px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.55)] transition-transform ${
                    hoverState
                        ? 'scale-[1.04] shadow-[0_12px_28px_-6px_rgba(128,54,203,0.55)]'
                        : ''
                }`}
                style={{
                    background: hoverState
                        ? 'linear-gradient(135deg, #8036CB, #5B21B6)'
                        : 'linear-gradient(135deg, #2563EB, #1E40AF)',
                }}
                onMouseEnter={() => setHoverState(true)}
                onMouseLeave={() => setHoverState(false)}
            >
                <Element className="text-white" fill="white" />
                {text && <p className="text-white">{text}</p>}
            </button>
        )
    }

    return (
        <div
            className={`cursor-pointer flex gap-2 items-center py-1.5 h-auto px-3 border border-[#E4E4E7] bg-white text-[12px] rounded-[8px] ${
                hoverState ? 'bg-[#F4F4F5]' : ''
            }`}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
        >
            <Element fill="#18181B" className="size-5" />
            {text && (
                <p className="font-medium text-[#18181B] leading-none">{text}</p>
            )}
        </div>
    )
}

function StatusCard({
    Element,
    amount,
    title,
    usage,
    activity,
}: StatusCardProps) {
    return (
        <div className=" flex-grow basis-[250px] w-full sm:w-[45%] lg:w-[22%] p-5 bg-white border-1 rounded-[8px] gap-4 flex justify-between flex-col text-[12px]">
            <div className="flex justify-between">
                <div>
                    <p className="font-medium">{title}</p>
                    <h1 className="font-black">{amount}</h1>
                </div>
                <Element />
            </div>
            <div className="flex justify-between items-center">
                {usage > 0 ? (
                    <span className="bg-[#E8FAF0] text-[#0E793C] font-semibold rounded-[8px] px-[6px] py-[2px] flex items-center gap-[4px]">
                        <PostiiveSvg />+{usage}%
                    </span>
                ) : (
                    <span className="bg-[#FFE0E4] text-[#BF0C24] font-semibold rounded-[8px] px-[6px] py-[2px] flex items-center gap-[4px]">
                        <NegativeSvg />
                        {usage}%
                    </span>
                )}
                <p className="font-extralight">{activity}</p>
            </div>
        </div>
    )
}

export { StatusHelpers, StatusCard }
