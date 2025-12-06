import DrawerWrapper from '@/global-components/DrawerWrapper'
import Header from '@/global-components/Header'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <div className="w-[100vw] h-[100v] flex font-inter font-400">
            <DrawerWrapper />
            <div className="w-full">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
