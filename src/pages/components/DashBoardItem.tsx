import type React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'

type DashBoardItemType = {
    ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >
    text: string
}

const DashBoardItem: React.FC<DashBoardItemType> = ({
    ReactComponent,
    text,
}) => {
    const [hoveredState, setHoveredState] = useState<boolean>(false)
    const [selectedColor, setSelectedColor] = useState<boolean>(false)
    const locationName = useLocation()
    const navigte = useNavigate()

    useEffect(() => {
        if (locationName.pathname.substring(1) == text) {
            setSelectedColor(true)
            setHoveredState(false)
        } else {
            setSelectedColor(false)
        }
    }, [locationName.pathname])

    return (
        <div
            className="flex flex-row justify-start items-center gap-[12px] rounded-lg px-3 py-2 cursor-pointer"
            onMouseEnter={() => setHoveredState(true)}
            onMouseLeave={() => setHoveredState(false)}
            style={
                selectedColor
                    ? { backgroundColor: '#0080FB' }
                    : hoveredState
                      ? { backgroundColor: '#0080FB' }
                      : { background: 'transparent' }
            }
            onClick={(_e) => navigte(`/${text}`)}
        >
            <ReactComponent />
            <p className="capitalize">{text}</p>
        </div>
    )
}

export default DashBoardItem
