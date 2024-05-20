import { ref, watchEffect } from 'vue'
import { getFiatCurrencyCodes, getFiatCurrencyRates } from '@/api/fiatCurrency'
import { useCurrencyStore } from '@/stores/fiatCurrency'

export function processFiatCurrencyData() {
  const currencyCodes = getFiatCurrencyCodes().data
  const currencyRates = getFiatCurrencyRates().data
  const currencyStore = useCurrencyStore()
  const result = ref([])
  const defaultCurrencies = ['USD', 'EUR']
  let currencies = []

  watchEffect(() => {
    if (currencyCodes.value && currencies.length === 0 && currencyRates.value) {
      let i = 0
      for (let key in currencyCodes.value.currency_codes) {
        let newItem = {
          id: i,
          code: key,
          title: currencyCodes.value.currency_codes[key],
          rate: currencyRates.value.rates[key],
          value: 1
        }
        currencies.push(newItem)
        i++
      }

      currencyStore.$patch((state) => {
        state.allFiatCurrencies = currencies.map((item) => item)
      })

      defaultCurrencies.map((code) => {
        let item = currencyStore.getAllFiatCurrencies.filter((currency) => currency.code === code)
        if (item.length) {
          currencyStore.$patch((state) => {
            if (
              !state.activeFiatCurrencies.filter((activeItem) => activeItem.code === item[0].code)
                .length
            ) {
              state.activeFiatCurrencies.push(item[0])
            }
          })
        }

        const rate = currencyStore.getRateByCode(code)
        if (!rate.length) {
          result.value.push(getFiatCurrencyRates(code).data)
        }
      })
    }

    if (result.value.length === defaultCurrencies.length) {
      result.value.map((item) => {
        if (item.value) {
          currencyStore.$patch((state) => {
            if (!state.rates.filter((rate) => rate.base === item.value.base).length)
              state.rates.push(item.value)
          })
        }
      })
    }
  })
}
