import type {
    Report,
    SafetyCheckType,
    ComplianceType,
    ThreatIntelligenceType,
    SystemType,
    NetworkSecurityType,
} from '@/types/global-type'
import BlockedIcon from '@/assets/svgs/blocked.svg?react'
import CheckedIcon from '@/assets/svgs/checked.svg?react'
import SystemTrayIcon from '@/assets/svgs/system-tray.svg?react'

// Define the report type map
const reportTypeMap = {
    SafetyCheckType: {
        svg: BlockedIcon,
        svgBgColor: '#1D40B0',
        bgColor: '#C5E4FF',
        value: 'Safety Check',
    } as unknown as SafetyCheckType,
    ComplianceType: {
        svg: CheckedIcon,
        svgBgColor: '#166534',
        bgColor: '#DCFCE7',
        value: 'Compliance',
    } as unknown as ComplianceType,
    ThreatIntelligenceType: {
        svg: BlockedIcon,
        svgBgColor: '#6B21A8',
        bgColor: '#F3E8FF',
        value: 'Threat Intelligence',
    } as unknown as ThreatIntelligenceType,
    SystemType: {
        svg: SystemTrayIcon,
        svgBgColor: '#864700',
        bgColor: '#F5F0BB',
        value: 'Incident',
    } as unknown as SystemType,
    NetworkSecurityType: {
        svg: BlockedIcon,
        svgBgColor: '#166434',
        bgColor: '#CFF7D3',
        value: 'Network Security',
    } as unknown as NetworkSecurityType,
}

const rowData: Report[] = [
    {
        reportName: {
            reportId: 1001,
            name: 'Monthly Security Report',
        },
        type: reportTypeMap.SafetyCheckType,
        type_value: 'Security Summary',
        schedule: 'January',
        format: 'PDF',
    },
    {
        reportName: {
            reportId: 1002,
            name: 'Quaterly Security Report',
        },
        type: reportTypeMap.ComplianceType,
        type_value: 'Compliance',
        schedule: 'February',
        format: 'PDF, CSV',
    },
    {
        reportName: {
            reportId: 1003,
            name: 'Quaterly Security Report',
        },
        type: reportTypeMap.ThreatIntelligenceType,
        type_value: 'Threat Intelligence',
        schedule: 'March',
        format: 'PDF, PPT',
    },
    {
        reportName: {
            reportId: 1004,
            name: 'Quaterly Security Report',
        },
        type: reportTypeMap.NetworkSecurityType,
        type_value: 'Incident',
        schedule: 'April',
        format: 'PDF',
    },
    {
        reportName: {
            reportId: 1005,
            name: 'Quaterly Security Report',
        },
        type: reportTypeMap.SystemType,
        type_value: 'System Health',
        schedule: 'May',
        format: 'PDF, CSV',
    },
    {
        reportName: {
            reportId: 1006,
            name: 'Quaterly Security Report',
        },
        type: reportTypeMap.ComplianceType,
        type_value: 'Access Control',
        schedule: 'June',
        format: 'PDF, XLSX',
    },
    {
        reportName: {
            reportId: 1007,
            name: 'Quaterly Security Report',
        },
        type: reportTypeMap.SafetyCheckType,
        type_value: 'Data Loss Prevention',
        schedule: 'July',
        format: 'PDF, CSV',
    },
    {
        reportName: {
            reportId: 1008,
            name: 'Quaterly Security Report',
        },
        type: reportTypeMap.ComplianceType,
        type_value: 'Vulnerability Management',
        schedule: 'August',
        format: 'PDF, PPT',
    },
    {
        reportName: {
            reportId: 1009,
            name: 'Quaterly Security Report',
        },
        type: reportTypeMap.ThreatIntelligenceType,
        type_value: 'User Activity Monitoring',
        schedule: 'September',
        format: 'PDF, CSV',
    },
    {
        reportName: {
            reportId: 1010,
            name: 'Quaterly Security Report',
        },
        type: reportTypeMap.NetworkSecurityType,
        type_value: 'Network Security',
        schedule: 'October',
        format: 'PDF, XLSX',
    },
    {
        reportName: {
            reportId: 1011,
            name: 'Quaterly Security Report',
        },
        type: reportTypeMap.SystemType,
        type_value: 'Backup and Recovery',
        schedule: 'November',
        format: 'PDF',
    },
]

export default rowData
