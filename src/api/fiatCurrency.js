import { ref } from 'vue'
import { useFetch } from '@/api/fetch.js'

export function getFiatCurrencyCodes() {
  const url = ref(
    `${import.meta.env.VITE_APP_ROOT_API}currency_codes?access_key=${import.meta.env.VITE_APP_ACCESS_KEY}`
  )

  return useFetch(url)
}

export function getFiatCurrencyRates(baseCurrency = 'USD') {
  const url = ref(
    `${import.meta.env.VITE_APP_ROOT_API}latest?access_key=${import.meta.env.VITE_APP_ACCESS_KEY}&base=${baseCurrency}`
  )

  return useFetch(url)
}
