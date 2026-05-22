import { useState } from 'react'
import Status from './components/Status'
import SearchSvg from '@/assets/svgs/search.svg?react'
import ReportSvg from '@/assets/svgs/report.svg?react'
import { Input } from '@/components/ui/input'
import SelectWrapper from '@/components/wrappers/SelectWrapper'
import CalendarWrapper from '@/components/wrappers/CalendarWrapper'
import { AgGridTable } from '@/components/ui/table'
import type {
    ReportName,
    SelectWrapperProps,
    Report,
} from '@/types/global-type'
import rowData from '@/data/report_sample'
import type { ColDef } from 'ag-grid-community'

const Reports = () => {
    const defaultColDef = {
        flex: 1,
        cellClass: 'text-left pt-[16px]', // Tailwind center
        headerClass:
            // 'ag-header-cell-label hidden flex justify-start items-start',
            'ag-header-left-align',
        resizable: false,
        sortable: false,
    }

    const colDefs: ColDef[] = [
        {
            headerName: 'Report Name',
            field: 'reportName',
            autoHeight: true,
            wrapText: true,
            cellRenderer: (params: { value: ReportName }) => {
                return (
                    <div
                        className="flex gap-[8px] items-center align-top mb-[10px]"
                        style={{ paddingTop: '-100px !important' }}
                        onClick={() => alert('File will be sent from backend')}
                    >
                        <ReportSvg />
                        <div className="flex flex-col justify-center align-text-top">
                            <span className="text-[12px] h-[20px] leading-[15px] font-[500] text-[#111827]">
                                {params.value.name}
                            </span>
                            <span className="text-[10px] h-[16px] leading-[10px]">
                                REP-{params.value.reportId}
                            </span>
                        </div>
                    </div>
                )
            },
        },
        {
            headerName: 'Type',
            field: 'type_value',
            filter: true,
            cellRenderer: (params: { data: Report }) => {
                const SvgComponent = params.data.type.svg
                const color = params.data.type.svgBgColor
                return (
                    <span
                        className={`inline-flex items-center justify-center pr-[8px] pl-[4px] py-[4px] rounded-[100px] text-xs font-medium gap-[8px]`}
                        style={{
                            backgroundColor: params.data.type.bgColor,
                            color: color,
                        }}
                    >
                        <SvgComponent
                            ref={(ref) => {
                                if (ref) {
                                    const paths = ref.querySelectorAll('path')
                                    paths.forEach((path) => {
                                        path.setAttribute('stroke', color)
                                    })
                                }
                            }}
                        />
                        <span>{params.data.type_value}</span>
                    </span>
                )
            },
        },
        {
            headerName: 'Schedule',
            field: 'schedule',
            cellStyle: { fontWeight: 500 },
        },
        {
            headerName: 'Format',
            field: 'format',
            filter: true,
            cellStyle: { fontWeight: 500 },
        },
    ]

    const [columnName, setColumnName] = useState<string>('')
    const [type, setType] = useState<string>('')

    const reportTypeOptions: SelectWrapperProps = {
        items: [
            { value: 'all', placeHolder: 'All' },
            { value: 'Security Summary', placeHolder: 'Security Summary' },
            { value: 'Compliance', placeHolder: 'Compliance' },
            {
                value: 'Threat Intelligence',
                placeHolder: 'Threat Intelligence',
            },
            { value: 'Incident', placeHolder: 'Incident' },
            { value: 'System Health', placeHolder: 'System Health' },
            { value: 'Access Control', placeHolder: 'Access Control' },
            {
                value: 'Data Loss Prevention',
                placeHolder: 'Data Loss Prevention',
            },
            {
                value: 'Vulnerability Management',
                placeHolder: 'Vulnerability Management',
            },
            {
                value: 'User Activity Monitoring',
                placeHolder: 'User Activity Monitoring',
            },
            { value: 'Network Security', placeHolder: 'Network Security' },
            {
                value: 'Backup and Recovery',
                placeHolder: 'Backup and Recovery',
            },
        ],
        selectState: setType,
        columnName: 'type',
        selectColumn: setColumnName,
    }

    const formatTypeOptions: SelectWrapperProps = {
        items: [
            { value: 'all', placeHolder: 'All' },
            { value: 'pdf', placeHolder: 'PDF' },
            { value: 'xlsx', placeHolder: 'XLSX' },
            { value: 'csv', placeHolder: 'CSV' },
            { value: 'ppt', placeHolder: 'PPT' },
        ],
        selectState: setType,
        columnName: 'format',
        selectColumn: setColumnName,
    }
    const schduleOptions: SelectWrapperProps = {
        items: [
            { value: 'all', placeHolder: 'All' },
            { value: 'monthly', placeHolder: 'Monthly' },
            { value: 'quaterly', placeHolder: 'Quaterly' },
            { value: 'weekly', placeHolder: 'Weekly' },
            { value: 'daily', placeHolder: 'Daily' },
            { value: 'annually', placeHolder: 'Annually' },
        ],
        selectState: setColumnName,
        columnName: 'Schedule',
        selectColumn: setColumnName,
    }

    return (
        <div>
            <div className="flex flex-col px-8 pt-6 bg-[#FAFAFA] h-[calc(100vh-64px)] w-full gap-[24px] font-inter">
                <Status />
                <div className="w-full h-full flex flex-col gap-[24px] bg-white p-[24px]">
                    <div className="flex items-center justify-between gap-[8px]">
                        <div className="flex items-center gap-[8px] border border-[#D9D9D9] rounded-[4px] w-[260px] py-[8px] px-[12px]">
                            <SearchSvg />
                            <Input type="text" placeholder="Search" />
                        </div>
                        <div className="flex items-center gap-[12px]">
                            <SelectWrapper
                                prefix="Schedule"
                                items={schduleOptions.items}
                                selectState={schduleOptions.selectState}
                                columnName="schedule"
                                selectColumn={schduleOptions.selectColumn}
                            />
                            <SelectWrapper
                                label="Type"
                                items={reportTypeOptions.items}
                                width="6.43rem"
                                selectState={reportTypeOptions.selectState}
                                columnName="type_value"
                                selectColumn={reportTypeOptions.selectColumn}
                            />
                            <SelectWrapper
                                label="Format"
                                items={formatTypeOptions.items}
                                selectState={formatTypeOptions.selectState}
                                columnName="format"
                                selectColumn={formatTypeOptions.selectColumn}
                            />
                            <CalendarWrapper />
                        </div>
                    </div>
                    <AgGridTable
                        defaultColDefs={defaultColDef}
                        columnDefs={colDefs}
                        rowData={rowData}
                        filterColumn={columnName}
                        filterValue={type}
                    />
                </div>
            </div>
        </div>
    )
}

export default Reports
