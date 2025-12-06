'use client'

import * as React from 'react'
import CalendarSvg from '@/assets/svgs/calendar.svg?react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

export function Calendar22() {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    return (
        <div className="flex flex-col gap-3 border-2 border-solid border-[#D9D9D9] rounded-[8px]">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        // className="w-48 justify-between font-normal"
                        style={{ backgroundColor: 'white', fontWeight: '200' }}
                    >
                        {date ? (
                            date.toLocaleDateString()
                        ) : (
                            <div className="flex items-center gap-[8px]">
                                Select date{' '}
                                <span>
                                    <CalendarSvg />
                                </span>
                            </div>
                        )}
                        {/* <ChevronDownIcon /> */}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Calendar22
