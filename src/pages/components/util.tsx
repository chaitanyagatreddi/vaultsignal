import { useState } from 'react'
import type { StatusCardProps, StatusHelpersProps } from '@/types/dashboard'
import NegativeSvg from '@/assets/svgs/negative.svg?react'
import PostiiveSvg from '@/assets/svgs/positive.svg?react'

function StatusHelpers({ Element, text }: StatusHelpersProps) {
    const [hoverState, setHoverState] = useState<boolean>(false)
    return (
        <div
            // className={"cursor-pointer flex gap-[5.5px] items-center py-1.5 px-2 border-[#E4E4E7] border-1 rounded-lg" + hoverState ??  "hover:bg-[#E8FAF0] hover:border-1 hover:border-[#A2E9C1]"
            className={`cursor-pointer flex gap-[5.5px] items-center py-[6px] h-[27px] px-[8px] border border-[#E4E4E7] text-[12px] rounded-lg ${
                hoverState ? 'bg-[#E8FAF0] border-[#A2E9C1]' : ''
            }`}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
        >
            <Element
                fill={hoverState ? '#12A150' : 'black'}
                // className={`text-[#12A150] transition-colors duration-300 ${hoverState ? 'hover:fill-current' : ''} `}
                className={`text-[#12A150] ${hoverState ? 'hover:fill-current' : ''} `}
            />
            {text && (
                <p className={hoverState ? 'text-[#12A150]' : 'text-black'}>
                    {text}
                </p>
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
