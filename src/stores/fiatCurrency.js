import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', () => {
  const activeFiatCurrencies = ref([])
  const allFiatCurrencies = ref([])
  const rates = ref([])

  const getAllFiatCurrencies = computed(() => allFiatCurrencies.value)
  const getActiveFiatCurrencies = computed(() => activeFiatCurrencies.value)

  const getRateByCode = (code) => {
    return rates.value.filter((data) => data.base === code)
  }

  function removeActiveCurrency(code) {
    activeFiatCurrencies.value.filter((item, index, arr) => {
      if (item.code === code) {
        arr.splice(index, 1)
        return true
      }
      return false
    })
  }

  return {
    activeFiatCurrencies,
    allFiatCurrencies,
    rates,
    getAllFiatCurrencies,
    getActiveFiatCurrencies,
    getRateByCode,
    removeActiveCurrency
  }
})
