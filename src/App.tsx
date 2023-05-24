import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { ArrowsIcon } from './components/icon'

import { useDebounce } from './hooks/useDebounce'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'

import { SectionType } from './types.d'
import { useEffect } from 'react'
import { translate } from './services/translate'

function App () {
  const {
    toLanguage,
    fromLanguage,
    interchangeLanguages,
    fromText,
    result,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    loading
  } = useStore()

  const debounceFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debounceFromText === '') return
    translate({ fromLanguage, toLanguage, text: debounceFromText })
      .then(data => {
        if (data == null) return
        const resultText = data.response

        setResult(resultText)
      })
      .catch(err => { console.log('error', err) })
  }, [debounceFromText, toLanguage])

  return (

      <Container fluid>
        <h1 style={{ paddingBlock: '1.5em' }}>Translate now</h1>
        <Row>
          <Col>
          <Stack gap={2}>
              <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
          </Col>
          <Col xs='auto'>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
              <ArrowsIcon />
            </Button>
          </Col>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage} />
              <TextArea
                type={SectionType.To}
                value={result}
                onChange={setResult}
                loading={loading}
              />
            </Stack>
          </Col>
        </Row>
      </Container>

  )
}

export default App
