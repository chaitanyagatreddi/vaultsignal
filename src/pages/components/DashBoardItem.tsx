import type React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'

type DashBoardItemType = {
    ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >
    text: string
    path?: string
}

const DashBoardItem: React.FC<DashBoardItemType> = ({
    ReactComponent,
    text,
    path
}) => {
    const [hoveredState, setHoveredState] = useState<boolean>(false)
    const [selectedColor, setSelectedColor] = useState<boolean>(false)
    const locationName = useLocation()
    const navigte = useNavigate()
    const targetPath = path ?? text.toLowerCase()

    useEffect(() => {
        const current = locationName.pathname.replace(/^\//, '')
        setSelectedColor(current === targetPath)
        if (current === targetPath) setHoveredState(false)
    }, [locationName.pathname, targetPath])

    return (
        <div
            className="flex flex-row justify-start items-center gap-[12px] rounded-lg px-3 py-2 cursor-pointer"
            onMouseEnter={() => setHoveredState(true)}
            onMouseLeave={() => setHoveredState(false)}
            style={
                selectedColor
                    ? { backgroundColor: '#007aff' }
                    : hoveredState
                      ? { backgroundColor: 'rgba(0, 122, 255, 0.35)' }
                      : { background: 'transparent' }
            }
            onClick={() => navigte(targetPath ? `/${targetPath}` : '/')}
        >
            <ReactComponent />
            <p className="capitalize">{text}</p>
        </div>
    )
}

export default DashBoardItem
