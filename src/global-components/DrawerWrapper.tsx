import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer'

import Logo from '@/assets/logos/vault-logo.svg?react'
import DashBoard from '@/assets/svgs/dashboard.svg?react'
import Threats from '@/assets/svgs/threats.svg?react'
import Analytics from '@/assets/svgs/analytics.svg?react'
import EventLogs from '@/assets/svgs/event-logs.svg?react'
import Reports from '@/assets/svgs/reports.svg?react'
import Settings from '@/assets/svgs/settings.svg?react'
import DashBoardItem from '@/pages/components/DashBoardItem'

function DrawerWrapper() {
    return (
        <Drawer defaultOpen direction="left" modal={false} dismissible={false}>
            <DrawerContent
                className="bg-[#040966] text-white z-2 w-10 relative h-[100vh]"
                style={{ width: '15rem' }}
            >
                <DrawerHeader className="flex flex-col justify-around gap-2 items-start pt-[2rem] pr-[20px]">
                    <DrawerTitle className="text-white text-2xl">
                        <Logo />
                    </DrawerTitle>
                </DrawerHeader>
                <div className="h-full p-5 flex flex-col gap-5 text-xm pr-[2rem] w-full text-sm">
                    <DashBoardItem
                        ReactComponent={DashBoard}
                        text="Dashboard"
                    />
                    <DashBoardItem ReactComponent={Threats} text="threats" />
                    <DashBoardItem
                        ReactComponent={Analytics}
                        text="analytics"
                    />
                    <DashBoardItem ReactComponent={EventLogs} text="events" />
                    <DashBoardItem ReactComponent={Reports} text="reports" />
                    <DashBoardItem ReactComponent={Settings} text="settings" />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerWrapper
