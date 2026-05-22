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

type ReportType = PredefinedReportType

type SafetyCheckType = {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    svgBgColor: string
    bgColor: string
}

type ComplianceType = {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    svgBgColor: string
    bgColor: string
}

type ThreatIntelligenceType = {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    svgBgColor: string
    bgColor: string
}

type SystemType = {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    svgBgColor: string
    bgColor: string
}

type NetworkSecurityType = {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    svgBgColor: string
    bgColor: string
}

type PredefinedReportType =
    | SafetyCheckType
    | ComplianceType
    | ThreatIntelligenceType
    | SystemType
    | NetworkSecurityType

type Report = {
    reportName: ReportName
    type:
        | SafetyCheckType
        | ComplianceType
        | ThreatIntelligenceType
        | SystemType
        | NetworkSecurityType
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
    SafetyCheckType,
    ComplianceType,
    ThreatIntelligenceType,
    SystemType,
    NetworkSecurityType,
    PredefinedReportType,
}
