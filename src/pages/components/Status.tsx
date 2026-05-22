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
                placeHolder: 'New Staging V2',
            },
            {
                value: 'v1',
                placeHolder: 'New Staging V1',
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
        <div className="flex justify-between">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-[12px]">
                    <p className="bg-[#F4F4F5] py-[4px] px-[8px] rounded-[10px] text-[12px]/[16px] font-500 ">
                        Last updated: 10:15:32 AM
                    </p>
                    <p className="font-400 text-[12px]/[16px] ">
                        Real-time security monitoring and threat analysis
                    </p>
                </div>
                <div className="flex justify-between">
                    <SelectWrapper
                        items={stagingItem.items}
                        selectState={stagingItem.selectState}
                        width="12.3125rem"
                    />
                    <div className="flex gap-4">
                        <StatusHelpers
                            Element={StatusSVG}
                            text="System Secure"
                        />
                        <StatusHelpers Element={RefreshSvg} text="Refresh" />
                        <StatusHelpers Element={ExportSvg} text="Export" />
                        <StatusHelpers Element={SettingsSvg} text="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Status
