import DashBoard from '@/assets/svgs/dashboard.svg?react'
import Threats from '@/assets/svgs/threats.svg?react'
import Analytics from '@/assets/svgs/analytics.svg?react'
import EventLogs from '@/assets/svgs/event-logs.svg?react'
import Reports from '@/assets/svgs/reports.svg?react'
import Settings from '@/assets/svgs/settings.svg?react'
import DashBoardItem from '@/pages/components/DashBoardItem'

function DrawerWrapper() {
    return (
        <aside
            className="shrink-0 h-screen sticky top-0 flex flex-col text-white"
            style={{ width: '15rem', backgroundColor: '#01065e' }}
        >
            <div className="pt-5 px-5">
                <p className="text-white text-[22px] font-bold tracking-tight leading-none">
                    VaultSignal
                </p>
            </div>
            <nav className="flex-1 px-5 pt-6 pb-5 flex flex-col gap-2 text-sm">
                <DashBoardItem
                    ReactComponent={DashBoard}
                    text="Dashboard"
                    path=""
                />
                <DashBoardItem
                    ReactComponent={Threats}
                    text="Contributors"
                    path="scan"
                />
                <DashBoardItem
                    ReactComponent={Analytics}
                    text="Trending"
                    path="analytics"
                />
                <DashBoardItem
                    ReactComponent={EventLogs}
                    text="Targeted Search"
                    path="events"
                />
                <DashBoardItem
                    ReactComponent={Reports}
                    text="Campaigns"
                    path="reports"
                />
                <DashBoardItem
                    ReactComponent={Settings}
                    text="Settings"
                    path="settings"
                />
            </nav>
        </aside>
    )
}

export default DrawerWrapper
