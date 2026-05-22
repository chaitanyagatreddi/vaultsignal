import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import type { SelectWrapperProps } from '@/types/global-type'

/*
A wrapper around shadcn
Type - SelectWrapperProps form @global
Default Value will always be the first item of the list

*/

const SelectWrapper: React.FC<SelectWrapperProps> = ({
    items,
    label,
    width,
    selectState,
    columnName,
    selectColumn,
    prefix,
}) => {
    return (
        <Select
            onValueChange={(value) => {
                selectColumn?.(columnName || '')
                selectState(value)
            }}
        >
            <SelectTrigger
                style={{
                    backgroundColor: 'white',
                    border: '1px solid #D4D4D8',
                    height: '2.5rem',
                    fontWeight: 200,
                    width: width ? width : '100%',
                }}
                autoFocus={false}
            >
                <SelectValue
                    placeholder={`${prefix ? prefix + ' :' : ''}  ${label || items[0]?.placeHolder}`}
                />
            </SelectTrigger>
            <SelectContent className="bg-white" color="white">
                {items.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                        {item.placeHolder}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SelectWrapper
