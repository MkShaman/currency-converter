<template>
  <div v-if="currencyStore.getActiveFiatCurrencies.length">
    <div
      v-for="(currency, index) in currencyStore.getActiveFiatCurrencies"
      :key="currency.id"
      class="mb-7 flex items-center justify-between space-x-4"
    >
      <label for="base_currency_input" class="text-base">{{ currency.code }}</label>
      <div class="relative flex w-full flex-col">
        <input
          type="number"
          class="rounded-md border border-slate-300 px-4 py-2 text-sm"
          :value="currency.value * currency.rate"
          @input="updateCurrency(index, $event)"
        />
        <span class="absolute -bottom-4 right-0 text-right text-xs font-light">{{
          currency.title
        }}</span>
      </div>
      <button
        @click="removeCurrency(currency.code)"
        class="inline-flex justify-center rounded-md border border-gray-700 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        X
      </button>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
<script setup>
import { useCurrencyStore } from '@/stores/fiatCurrency'

const currencyStore = useCurrencyStore()

function updateCurrency(index, event) {
  const baseCurrency = currencyStore.getActiveFiatCurrencies[index].code
  const baseCurrencyValue = event.target.value

  const rate = currencyStore.getRateByCode(baseCurrency)
  if (rate.length) {
    updateActiveFiatCurrencies(baseCurrencyValue, rate[0])
  }
}

function updateActiveFiatCurrencies(baseCurrencyValue, rate) {
  currencyStore.getActiveFiatCurrencies.map((item) => {
    item.value = baseCurrencyValue
    item.rate = rate.rates[item.code]
  })
}

const removeCurrency = (code) => {
  currencyStore.removeActiveCurrency(code)
}
</script>
