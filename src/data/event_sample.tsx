import type { EventLogs } from '@/types/global-type'

const eventLogs: EventLogs[] = [
    {
        logId: 1001,
        timestamp: '2023-09-15, 08:23:45',
        user: 'System',
        eventType: 'Connection Blocked',
        status: 'blocked',
    },
    {
        logId: 1002,
        timestamp: '2023-09-15, 08:23:45',
        user: 'john.doe@compa...',
        eventType: 'Login Success',
        status: 'in-progress',
    },
    {
        logId: 1002,
        timestamp: '2023-09-15, 08:23:45',
        user: 'jane.smith@com...',
        eventType: 'File Access',
        status: 'resolved',
    },
    {
        logId: 1002,
        timestamp: '2023-09-15, 08:23:45',
        user: 'System',
        eventType: 'Email Quarantined',
        status: 'blocked',
    },
    {
        logId: 1002,
        timestamp: '2023-09-15, 08:23:45',
        user: 'workstation-105',
        eventType: 'Malware Detected',
        status: 'in-progress',
    },
    {
        logId: 1002,
        timestamp: '2023-09-15, 08:23:45',
        user: 'admin@company....',
        eventType: 'User Created',
        status: 'resolved',
    },
    {
        logId: 1002,
        timestamp: '2023-09-15, 08:23:45',
        user: 'app-service',
        eventType: 'Database Query',
        status: 'in-progress',
    },
]

export { eventLogs }
