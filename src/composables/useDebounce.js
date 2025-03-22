import { ref } from 'vue'

export function useDebounce(fn, delay = 300) {
  const timeoutId = ref(null)

  return (...args) => {
    clearTimeout(timeoutId.value)

    return new Promise((resolve) => {
      timeoutId.value = setTimeout(async () => {
        const result = await fn(...args)
        resolve(result)
      }, delay)
    })
  }
}
