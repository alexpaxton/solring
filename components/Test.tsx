import { ChangeEvent, FC, useState } from 'react'

const scyrfallUrl = 'https://api.scryfall.com/cards/search'

export const Test: FC =() => {
  const [inputValue, setInputValue] = useState<string>('')
  const fetchyFetch = async () => {
    try {
      const query = encodeURIComponent(inputValue)
      const resp = await fetch(`${scyrfallUrl}?q=${query}`)
      const data = await resp.json()
      console.log(data)
    } catch(err) {
      throw new Error
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder="Search scryfall"
        onChange={handleInputChange}
        maxLength={1000}
      />
      <button onClick={fetchyFetch}>Fetch</button>
    </div>
  )
}