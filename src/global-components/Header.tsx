import { Input } from '@/components/ui/input'
import SelectWrapper from '@/components/wrappers/SelectWrapper'
import Bell from '@/assets/svgs/bell.svg?react'
import User from '@/components/ui/user'
import SearchSvg from '@/assets/svgs/search.svg?react'
import type { SelectWrapperProps } from '@/types/global-type'
import { useState } from 'react'

function Header() {
    const [_selectState, setSelectState] = useState<string>('hello')
    const selectItems: SelectWrapperProps = {
        items: [
            {
                value: '24h',
                placeHolder: 'Last 24h ago',
            },
            {
                value: '12h',
                placeHolder: 'Last 12h ago',
            },
            {
                value: '10h',
                placeHolder: 'Last 10h ago',
            },
        ],
        selectState: setSelectState,
    }
    return (
        <div className="sticky flex flex-row justify-between items-center px-8 py-3 bg-white h-[64px] border-b-[#E4E4E7] border-[1px]">
            {/* Page name  */}
            <p
                style={{
                    fontWeight: 600,
                    fontStyle: 'Semi Bold',
                    fontSize: '20px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                }}
            >
                Dashboard
            </p>
            <div className="flex gap-4 items-center">
                <div
                    className="flex gap-3 items-center py-2 px-4 h-10"
                    style={{
                        border: '1px solid #D4D4D8',
                        borderRadius: '0.5rem',
                    }}
                >
                    <SearchSvg />
                    <Input
                        type="text"
                        placeholder="Search threats, IPs, Events..."
                        className="w-[20rem] border-none shadow-none outline-none"
                    />
                </div>
                <SelectWrapper
                    items={selectItems.items}
                    width="9.43rem"
                    selectState={selectItems.selectState}
                />
            </div>
            <div className="flex items-center gap-8">
                <Bell />
                <User />
            </div>
        </div>
    )
}

export default Header
