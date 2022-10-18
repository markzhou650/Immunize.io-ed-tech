import { createContext, useMemo, useReducer } from 'react'
import { actions } from './actions'

const initialState = {
    displayHelpWidget: false,
    videoHelpWidget: false
}

const AppContext = createContext(initialState)

function reducer(state, action) {
    switch(action.type) {
        case 'displayReadingLink': return {
            ...state,
            displayHelpWidget: action.payload,
            helpWidgetMessage: action.message
        }
        
        case 'displayVideo': return {
            ...state,
            videoHelpWidget: action.payload,
            videoWidgetMessage: action.message
        }

        default:
    }
}


export default function AppProvider ({ children }) {
    const [appState, dispatch] = useReducer(reducer, initialState)

    const value = useMemo(() => {
        return { ...actions(appState, dispatch) }
    }, [appState])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext };
