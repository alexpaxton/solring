import { useCards } from 'components/deck/CardsContext'
import { useDeck } from 'components/deck/DeckContext'
import throttle from 'lodash.throttle'
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Cards } from 'scryfall-sdk'
import styled from 'styled-components'
import { useOnClickOutside } from 'utils'

export const SearchWidget: FC = () => {
  const [isSuggesting, setSuggesting] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [pending, setPending] = useState<boolean>(false)
  const [results, setResults] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selected, setSelected] = useState<string>('')
  const { loading } = useDeck()
  const { addCard, isCardInDeck } = useCards()

  const nothingIsSelected = selected === '' && results.length
  const selectedIsNotInResults =
    selected && results.length && !results.includes(selected)

  useEffect(() => {
    if (nothingIsSelected || selectedIsNotInResults) {
      setSelected(results[0])
    }
  }, [nothingIsSelected, selectedIsNotInResults, results])

  useOnClickOutside(containerRef, handleStopSuggesting)

  const getSuggestions = async (query: string) => {
    setPending(true)
    const data = await Cards.autoCompleteName(query)
    setResults(data)
    setPending(false)
  }

  const throttledGetSuggestions = useMemo(
    () => throttle(getSuggestions, 75),
    [],
  )

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
    throttledGetSuggestions(e.target.value)
  }

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case 'Enter':
        return handleSubmit()
      case 'Escape':
        return handleStopSuggesting()
      case 'ArrowUp':
        return handleSelectPrevious()
      case 'ArrowDown':
        return handleSelectNext()
    }
  }

  function getResultClassName(result: string): string {
    const classList = []
    if (result === selected) {
      classList.push('selected')
    }
    if (isCardInDeck(result)) {
      classList.push('disabled')
    }
    return classList.join(' ')
  }

  function handleResultHover(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement
    const text = target.innerText
    setSelected(text)
  }

  function handleStopSuggesting() {
    setSuggesting(false)
    setResults([])
    setSelected('')
    inputRef.current?.blur()
  }

  function handleFocus() {
    setSelected('')
    setSuggesting(true)
  }

  function handleSelectPrevious() {
    if (!results.length || selected === '') {
      return
    }

    const selectedIndex = results.indexOf(selected)
    const previousIndex = selectedIndex > 1 ? selectedIndex - 1 : 0
    setSelected(results[previousIndex])
  }

  function handleSelectNext() {
    if (!results.length || selected === '') {
      return
    }

    const selectedIndex = results.indexOf(selected)
    const lastIndex = results.length - 1
    const nextIndex = selectedIndex < lastIndex ? selectedIndex + 1 : lastIndex
    setSelected(results[nextIndex])
  }

  async function handleSubmit() {
    const card = selected
    if (isCardInDeck(card)) {
      return
    }
    handleStopSuggesting()
    setInputValue('')
    setPending(true)
    await addCard(card)
    setPending(false)
  }

  return (
    <Container>
      <Search ref={containerRef}>
        <input
          type="text"
          value={inputValue}
          placeholder="Add a card..."
          onChange={handleInputChange}
          maxLength={1000}
          ref={inputRef}
          onKeyUp={handleKeyUp}
          onFocus={handleFocus}
          disabled={loading}
        />
        {isSuggesting && (
          <Results>
            {pending && <p>Loading...</p>}
            {!pending &&
              results.map((result) => (
                <Result
                  key={result}
                  className={getResultClassName(result)}
                  onMouseOver={handleResultHover}
                  onClick={handleSubmit}
                >
                  {result}
                </Result>
              ))}
            {!pending && !results.length && inputValue.length >= 2 && (
              <Result>
                No cards match <strong>{inputValue}</strong>
              </Result>
            )}
          </Results>
        )}
      </Search>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  border-bottom: 1px solid #eee;
`

const Search = styled.div`
  flex: 1 0 0;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 100;

  input {
    height: 40px;
    flex: 1 0 0;
  }

  button {
    height: 40px;
    margin-left: 8px;
  }
`

const Results = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: #eee;
`

const Result = styled.div`
  padding: 0 12px;
  height: 26px;
  line-height: 26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.selected {
    background-color: #000;
    color: #fff;
  }

  &.disabled {
    font-style: italic;
    color: #999;
    cursor: default;
  }

  &.selected.disabled {
    color: #999;
  }
`
