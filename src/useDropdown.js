import React, { useState } from 'react'

const useDropdown = (label, defaultState, options, optionKey) => {
	const [state, setState] = useState(defaultState)
	const id = `use-dropdown${label.replace(' ', '').toLowerCase()}`

	const Dropdown = () => {
		return (
			<div className="input-row">
				<label htmlFor={id}>{label}</label>
				<div>
					<select
						id={id}
						value={state}
						onChange={e => setState(e.target.value)}
						onBlur={e => setState(e.target.value)}
					>
						<option value=""></option>
						{options.map(item => (
							<option key={item.id} value={item.id}>
								{item[optionKey]}
							</option>
						))}
					</select>
				</div>
			</div>
		)
	}
	return [state, Dropdown, setState]
}

export default useDropdown
