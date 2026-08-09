type SelectWrapperPropObject = {
    value: string
    placeHolder: string
}

type SelectWrapperProps = {
    items: SelectWrapperPropObject[]
    label?: string
    width?: string
    columnName?: string
    selectState: React.Dispatch<React.SetStateAction<string>>
    selectColumn?: React.Dispatch<React.SetStateAction<string>>
    prefix?: string
}

type Threat = {
    threatId: number
    detectionTime: string
    severity: 'high' | 'critical' | 'medium' | 'low'
    status: 'in-progress' | 'blocked' | 'resolved' | 'pending'
}

type EventLogs = {
    logId: number
    timestamp: string
    user: string
    eventType: string
    status: 'in-progress' | 'blocked' | 'resolved' | 'pending'
}

type ReportName = {
    name: string
    reportId: number
}

/**
 * Shared shape for all dashboard card categories (safety, compliance,
 * threat intelligence, system, network security).
 * All five previously-separate types were structurally identical.
 */
type DashboardCardType = {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    svgBgColor: string
    bgColor: string
}

// Named aliases for readability and backward compatibility
type SafetyCheckType = DashboardCardType
type ComplianceType = DashboardCardType
type ThreatIntelligenceType = DashboardCardType
type SystemType = DashboardCardType
type NetworkSecurityType = DashboardCardType

type PredefinedReportType = DashboardCardType

type ReportType = PredefinedReportType

type Report = {
    reportName: ReportName
    type: PredefinedReportType
    type_value: string
    schedule: string
    format: string
}

export type {
    SelectWrapperProps,
    Threat,
    EventLogs,
    Report,
    ReportName,
    ReportType,
    DashboardCardType,
    SafetyCheckType,
    ComplianceType,
    ThreatIntelligenceType,
    SystemType,
    NetworkSecurityType,
    PredefinedReportType,
}
