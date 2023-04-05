import { useLocalStorage } from '../src/useLocalStorage.js'
import { useSessionStorage } from '../src/useSessionStorage.js'
import { useStorage } from '../src/useStorage.js'
import { act, renderHook } from './utils.js'

describe('useStorage', () => {
  it('should be defined', () => {
    expect(useStorage).toBeDefined()
    expect(useLocalStorage).toBeDefined()
    expect(useSessionStorage).toBeDefined()
  })

  it('should be render hook', () => {
    renderHook(() => useSessionStorage('foo', 'bar'))
    const { result } = renderHook(() => useLocalStorage('foo', 'bar'))
    expect(result.current[0]).toBe('bar') // value
    act(() => result.current[1]('baz')) // set
    expect(result.current[0]).toBe('baz') // value
    act(() => result.current[2]()) // reset
    expect(result.current[0]).toBe('bar') // value
  })
})
