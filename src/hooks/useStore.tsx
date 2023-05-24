import { useReducer } from 'react'
import { type FromLanguage, type Language } from '../types.d'
import { StoreReducer, initialState } from '../reducer/storeReducer'

export function useStore () {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(StoreReducer, initialState)

  const interchangeLanguages = () => { dispatch({ type: 'INTERCHANGE_LANGUAGES' }) }

  const setFromLanguage = (payload: FromLanguage) => { dispatch({ type: 'SET_FROM_LANGUAGE', payload }) }

  const setToLanguage = (payload: Language) => { dispatch({ type: 'SET_TO_LANGUAGE', payload }) }

  const setFromText = (payload: string) => { dispatch({ type: 'SET_FROM_TEXT', payload }) }

  const setResult = (payload: string) => { dispatch({ type: 'SET_RESULT', payload }) }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
