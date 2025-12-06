import type { Threat } from '@/types/global-type'

const threatData: Threat[] = [
    {
        threatId: 1,
        detectionTime: '2023-09-05, 08:23:45',
        severity: 'critical',
        status: 'blocked',
    },
    {
        threatId: 2,
        detectionTime: '2023-09-05, 09:15:20',
        severity: 'high',
        status: 'in-progress',
    },
    {
        threatId: 3,
        detectionTime: '2023-09-05, 10:05:55',
        severity: 'medium',
        status: 'pending',
    },
    {
        threatId: 4,
        detectionTime: '2023-09-05, 11:42:30',
        severity: 'low',
        status: 'resolved',
    },
    {
        threatId: 5,
        detectionTime: '2023-09-05, 12:10:12',
        severity: 'critical',
        status: 'blocked',
    },
    {
        threatId: 6,
        detectionTime: '2023-09-05, 13:30:40',
        severity: 'high',
        status: 'in-progress',
    },
    {
        threatId: 7,
        detectionTime: '2023-09-05, 14:50:01',
        severity: 'medium',
        status: 'pending',
    },
    {
        threatId: 8,
        detectionTime: '2023-09-05, 15:25:15',
        severity: 'low',
        status: 'resolved',
    },
    {
        threatId: 9,
        detectionTime: '2023-09-05, 16:45:50',
        severity: 'high',
        status: 'blocked',
    },
    {
        threatId: 10,
        detectionTime: '2023-09-05, 17:55:30',
        severity: 'medium',
        status: 'in-progress',
    },
]

export { threatData }
