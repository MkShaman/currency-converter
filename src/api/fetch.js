import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = async () => {
    try {
      // reset state before fetching..
      data.value = null
      error.value = null

      const response = await fetch(toValue(url))
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const json = await response.json()
      data.value = json
    } catch (err) {
      error.value = err
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
