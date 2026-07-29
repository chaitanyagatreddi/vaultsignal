import { Input } from '@/components/ui/input'
import SelectWrapper from '@/components/wrappers/SelectWrapper'
import Bell from '@/assets/svgs/bell.svg?react'
import User from '@/components/ui/user'
import SearchSvg from '@/assets/svgs/search.svg?react'
import type { SelectWrapperProps } from '@/types/global-type'
import { useState } from 'react'
import { useLocation } from 'react-router'

const PAGE_TITLES: Record<string, string> = {
    '': 'Dashboard',
    scan: 'Contributors',
    threats: 'Contributors',
    events: 'Targeted Search',
    reports: 'Campaigns',
    analytics: 'Trending',
    settings: 'Settings',
}

function Header() {
    const location = useLocation()
    const routeKey = location.pathname.replace(/^\//, '')
    const pageTitle = PAGE_TITLES[routeKey] ?? 'Contributors'

    const [_selectState, setSelectState] = useState<string>('24h')
    const selectItems: SelectWrapperProps = {
        items: [
            {
                value: '24h',
                placeHolder: 'Last 24 hours',
            },
            {
                value: '12h',
                placeHolder: 'Last 12 hours',
            },
            {
                value: '7d',
                placeHolder: 'Last 7 days',
            },
        ],
        selectState: setSelectState,
    }

    return (
        <div className="sticky top-0 z-10 flex flex-row justify-between items-center px-8 bg-white h-[64px] border-b border-[#E4E4E7]">
            <p className="font-semibold text-[20px] leading-none text-black whitespace-nowrap">
                {pageTitle}
            </p>
            <div className="flex gap-4 items-center">
                <div className="flex gap-3 items-center py-2 px-4 h-10 bg-white border border-[#D4D4D8] rounded-[8px] w-[320px]">
                    <SearchSvg />
                    <Input
                        type="text"
                        placeholder="Search contributors, repos, emails..."
                        className="border-none shadow-none outline-none focus-visible:ring-0 px-0 h-6 text-[14px] placeholder:text-[#A1A1AA]"
                    />
                </div>
                <SelectWrapper
                    items={selectItems.items}
                    width="9.5rem"
                    selectState={selectItems.selectState}
                    label="Last 24 hours"
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
