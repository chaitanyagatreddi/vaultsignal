import Status from './components/Status'
import { AgGridTable } from '@/components/ui/table'
import { eventLogs } from '@/data/event_sample'
import BlockedIcon from '@/assets/svgs/blocked.svg?react'
import InProgressIcon from '@/assets/svgs/in-progress.svg?react'
import ResolvedIcon from '@/assets/svgs/resolved.svg?react'
import SearchSvg from '@/assets/svgs/search.svg?react'
import { Input } from '@/components/ui/input'
import SelectWrapper from '@/components/wrappers/SelectWrapper'
import type { SelectWrapperProps } from '@/types/global-type'
import CalendarWrapper from '@/components/wrappers/CalendarWrapper'
import { useState, useCallback } from 'react'

const EventLog = () => {
    const defaultColDef = {
        flex: 1,
        cellClass: 'text-left pt-[16px]',
        headerClass: 'ag-header-left-align',
        resizable: false,
        sortable: false,
    }
    const colDefs = [
        {
            headerName: 'Log ID',
            field: 'logId',
        },
        { field: 'timestamp' },
        { field: 'user' },
        {
            field: 'eventType',
            filter: true,
        },
        {
            field: 'status',
            filter: true,
            cellRenderer: (params: { value: string }) => {
                const value = params.value
                const stylesByStatus: Record<string, string> = {
                    blocked: 'bg-[#CFF7D3] text-[#0F5132]',
                    'in-progress': 'bg-[#C5E4FF] text-[#1D40B0]',
                    resolved: 'bg-[#E8E8E8] text-[#1E1E1E]',
                    pending: 'bg-[#E9D5FF] text-[#6B21A8]',
                }
                const klass =
                    stylesByStatus[value] ?? 'bg-[#E2E3E5] text-[#41464B]'
                const iconByStatus: Record<string, any> = {
                    blocked: BlockedIcon,
                    'in-progress': InProgressIcon,
                    resolved: ResolvedIcon,
                }
                const Icon = iconByStatus[value]
                return (
                    <span
                        className={`inline-flex items-center justify-center pr-[8px] pl-[4px] py-[4px] rounded-[100px] text-xs font-medium gap-[8px] ${klass}`}
                    >
                        {Icon ? <Icon /> : null}
                        <span className="capitalize">{value}</span>
                    </span>
                )
            },
        },
    ]

    const [severity, setSeverity] = useState<string>('')
    const [columnName, selectColumn] = useState<string>('')

    // Fix: wire the search input so it actually filters the table
    const [searchTerm, setSearchTerm] = useState<string>('')
    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }, [])

    // Status dropdown takes priority over free-text search
    const effectiveFilterCol = columnName || (searchTerm ? 'user' : '')
    const effectiveFilterVal = columnName ? severity : searchTerm

    const statusOptions: SelectWrapperProps = {
        items: [
            { value: 'all', placeHolder: 'All' },
            { value: 'in-progress', placeHolder: 'In Progress' },
            { value: 'blocked', placeHolder: 'Blocked' },
            { value: 'resolved', placeHolder: 'Resolved' },
            { value: 'pending', placeHolder: 'Pending' },
        ],
        selectState: setSeverity,
        columnName: 'status',
        selectColumn: selectColumn,
    }
    return (
        <div className="flex flex-col px-8 pt-6 bg-[#FAFAFA] h-[calc(100vh-64px)] w-full gap-[24px]">
            <Status />
            <div className="w-full h-full flex flex-col gap-[24px] bg-white p-[24px]">
                <div className="flex items-center justify-between gap-[8px]">
                    <div className="flex items-center gap-[8px] border border-[#D9D9D9] rounded-[4px] w-[260px] py-[8px] px-[12px]">
                        <SearchSvg />
                        {/* Fix: added value + onChange so the input actually filters the table */}
                        <Input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="flex items-center gap-[12px]">
                        <CalendarWrapper />
                        <SelectWrapper
                            label="Status"
                            items={statusOptions.items}
                            width="6.43rem"
                            selectState={setSeverity}
                            columnName="status"
                            selectColumn={selectColumn}
                        />
                    </div>
                </div>
                <AgGridTable
                    defaultColDefs={defaultColDef}
                    columnDefs={colDefs}
                    rowData={eventLogs}
                    filterColumn={effectiveFilterCol}
                    filterValue={effectiveFilterVal}
                />
            </div>
        </div>
    )
}

export default EventLog
