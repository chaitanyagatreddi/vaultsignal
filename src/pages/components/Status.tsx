import { StatusHelpers } from './util'
import StatusSVG from '@/assets/svgs/circle.svg?react'
import RefreshSvg from '@/assets/svgs/refresh.svg?react'
import ExportSvg from '@/assets/svgs/export.svg?react'
import SettingsSvg from '@/assets/svgs/settings-black.svg?react'
import type { SelectWrapperProps } from '@/types/global-type'
import SelectWrapper from '@/components/wrappers/SelectWrapper'
import { useState } from 'react'

function Status() {
    const [columnName, setColumnName] = useState<string>('')
    const stagingItem: SelectWrapperProps = {
        items: [
            {
                value: 'v2',
                placeHolder: 'New Staging v2',
            },
            {
                value: 'v1',
                placeHolder: 'New Staging v1',
            },
            {
                value: 'beta',
                placeHolder: 'Beta',
            },
        ],
        columnName: columnName,
        selectState: setColumnName,
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3 flex-wrap">
                <p className="bg-[#EBEDF0] py-1 px-2 rounded-[6px] text-[12px] leading-4 font-medium text-[#3F3F46]">
                    Last updated: 10:15:32 AM
                </p>
                <p className="font-normal text-[12px] leading-4 text-[#52525B]">
                    Contributor intelligence — enrich and export signals
                </p>
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap">
                <SelectWrapper
                    items={stagingItem.items}
                    selectState={stagingItem.selectState}
                    width="12.3125rem"
                    label="New Staging v2"
                />
                <div className="flex items-center gap-4">
                    <StatusHelpers
                        Element={StatusSVG}
                        text="System Secure"
                        variant="secure"
                    />
                    <StatusHelpers Element={RefreshSvg} text="Refresh" />
                    <StatusHelpers Element={ExportSvg} text="Export" />
                    <StatusHelpers Element={SettingsSvg} text="" />
                </div>
            </div>
        </div>
    )
}

export default Status
