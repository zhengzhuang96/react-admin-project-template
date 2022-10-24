import { useMemo } from 'react'
import useToggle from './useToggle'

export interface Actions {
	setTrue: () => void
	setFalse: () => void
	toggle: (value?: boolean | undefined) => void
}

function useBoolean(defaultValue = false): [boolean, Actions] {
	const [state, { toggle }] = useToggle(defaultValue)

	const actions: Actions = useMemo(() => {
		const setTrue = () => toggle(true)
		const setFalse = () => toggle(false)
		return { setTrue, setFalse, toggle }
	}, [toggle])

	return [state, actions]
}

export default useBoolean
