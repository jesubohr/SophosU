import type { Option } from "@/types/RecordComponents"
import { Button, MenuItem } from "@blueprintjs/core"
import { Select2 } from "@blueprintjs/select"
import { useState, useRef } from "react"

export interface ISingleSelectProps {
  id: string
  name: string
  placeholder: string
  options: Option[]
}

export const SingleSelect = ({
  id,
  name,
  options,
  placeholder
}: ISingleSelectProps) => {
  const [selected, setSelected] = useState<Option>()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(value: Option) {
    if (inputRef.current) inputRef.current.value = String(value.value)
    setSelected(value)
  }

  interface OptionRendererProps {
    handleClick: React.MouseEventHandler<HTMLElement>
    modifiers: {
      active: boolean
      matchesPredicate: boolean
    }
  }
  function renderOption(
    option: Option,
    { handleClick, modifiers }: OptionRendererProps
  ) {
    if (!modifiers.matchesPredicate) return null

    return (
      <MenuItem
        key={option.value}
        text={option.label}
        active={modifiers.active}
        onClick={handleClick}
        roleStructure="listoption"
      />
    )
  }

  return (
    <Select2
      items={options}
      filterable={false}
      itemRenderer={renderOption}
      onItemSelect={handleChange}
      menuProps={{ style: { marginTop: 5 } }}
      popoverProps={{ matchTargetWidth: true, minimal: true }}
    >
      <Button
        fill
        large
        id={id}
        text={selected?.label ?? placeholder}
        rightIcon="caret-down"
      />
      <input ref={inputRef} type="hidden" name={name} />
    </Select2>
  )
}
