import { createContext, Dispatch, FC, useContext, useReducer } from 'react'
import { CMCMode, ColorMode } from 'types'

export interface FiltersState {
  queryText: string
  cardName: string
  cardType: string
  ruleText: string
  colors: string[]
  colorMode: ColorMode
  cmc: number
  cmcAlt: number
  cmcMode: CMCMode
  active: {
    cardName: boolean
    cardType: boolean
    ruleText: boolean
    colors: boolean
    cmc: boolean
  }
}

interface UpdateNameAction {
  type: 'updateName'
  payload: {
    cardName: string
  }
}

interface UpdateTypeAction {
  type: 'updateType'
  payload: {
    cardType: string
  }
}

interface UpdateColorsAction {
  type: 'updateColors'
  payload: {
    colors: string[]
  }
}

interface UpdateColorModeAction {
  type: 'updateColorMode'
  payload: {
    colorMode: ColorMode
  }
}

interface UpdateRuleTextAction {
  type: 'updateRuleText'
  payload: {
    ruleText: string
  }
}

interface CMCPayload {
  cmc: number
  cmcAlt: number
  cmcMode: CMCMode
}

interface UpdateCMCAction {
  type: 'updateCMC'
  payload: Partial<CMCPayload>
}

interface RehydrateFiltersAction {
  type: 'rehydrateFilters'
  payload: FiltersState
}

interface ResetAction {
  type: 'reset'
}

interface UpdateQueryTextAction {
  type: 'updateQueryText'
  payload: {
    queryText: string
  }
}

interface UpdateActiveFilterAction {
  type: 'updateActiveFilter'
  payload: {
    [key: string]: boolean
  }
}

type FiltersAction =
  | UpdateNameAction
  | UpdateTypeAction
  | UpdateColorsAction
  | UpdateColorModeAction
  | UpdateRuleTextAction
  | UpdateCMCAction
  | RehydrateFiltersAction
  | ResetAction
  | UpdateQueryTextAction
  | UpdateActiveFilterAction

export const initialFiltersState: FiltersState = {
  queryText: '',
  cardName: '',
  cardType: '',
  ruleText: '',
  colors: [],
  colorMode: 'include',
  cmc: 0,
  cmcAlt: 0,
  cmcMode: 'atLeast',
  active: {
    cardName: false,
    cardType: false,
    ruleText: false,
    colors: false,
    cmc: false,
  },
}

const filtersReducer = (state: FiltersState, action: FiltersAction) => {
  switch (action.type) {
    case 'updateName':
      return {
        ...state,
        cardName: action.payload.cardName,
      }
    case 'updateType':
      return {
        ...state,
        cardType: action.payload.cardType,
      }
    case 'updateRuleText':
      return {
        ...state,
        ruleText: action.payload.ruleText,
      }
    case 'updateColors':
      return {
        ...state,
        colors: action.payload.colors,
      }
    case 'updateColorMode':
      return {
        ...state,
        colorMode: action.payload.colorMode,
      }
    case 'updateCMC':
      return {
        ...state,
        ...action.payload,
      }
    case 'updateQueryText':
      return {
        ...state,
        ...action.payload,
      }
    case 'rehydrateFilters':
      return {
        ...state,
        ...action.payload,
      }
    case 'reset':
      return {
        ...initialFiltersState,
        ruleText: '',
        cardType: '',
        cardName: '',
      }
    case 'updateActiveFilter':
      return {
        ...state,
        active: {
          ...state.active,
          ...action.payload,
        },
      }
    default:
      throw new Error()
  }
}

export interface FiltersContextType extends FiltersState {
  dispatch: Dispatch<FiltersAction>
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

export const FiltersContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(filtersReducer, initialFiltersState)

  return (
    <FiltersContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export function useFilters(): FiltersContextType {
  const context = useContext(FiltersContext)

  if (context === undefined) {
    throw new Error(
      'useFilters must be called from a child component of FiltersContext',
    )
  }

  return context
}
