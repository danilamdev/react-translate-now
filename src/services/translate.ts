import { type FromLanguage, type Language } from '../types'

const TRANSLATE_ENDPOINT = 'https://translate281.p.rapidapi.com/'

export async function translate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  const fromCode = fromLanguage === 'auto' ? 'es' : fromLanguage

  const encodedParams = new URLSearchParams()
  encodedParams.set('from', fromCode)
  encodedParams.set('to', toLanguage)
  encodedParams.set('text', text)

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'dd52bfd327msh381dd6e7bc9ad14p184a97jsndfc332bfd933',
      'X-RapidAPI-Host': 'translate281.p.rapidapi.com'
    },
    body: encodedParams
  }

  try {
    const response = await fetch(`${TRANSLATE_ENDPOINT}`, options)
    const data = await response.json()

    return data
  } catch (error) {
    throw new Error('ha habido un problema con la traducción, intenta nuevamente')
  }
}
