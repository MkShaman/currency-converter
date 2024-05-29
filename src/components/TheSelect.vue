<template>
  <div class="flex items-center justify-center" v-if="currencyStore.getAllFiatCurrencies.length">
    <div class="group relative w-3/4">
      <button
        id="dropdown-button"
        @click="toggleDropdown"
        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        <span class="mr-2">Add Currency</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="-mr-1 ml-2 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div
        id="dropdown-menu"
        v-show="isOpen"
        class="absolute right-0 mt-2 max-h-60 w-full space-y-1 overflow-x-auto rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <input
          v-model.trim="searchTerm"
          id="search-input"
          class="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none"
          type="text"
          placeholder="Search items"
          autocomplete="off"
        />
        <a
          v-for="item in filteredData"
          :key="item.id"
          href="#"
          @click="addCurrency(item)"
          class="block cursor-pointer rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100"
          >{{ item.code }} - {{ item.title }}</a
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useCurrencyStore } from '@/stores/fiatCurrency'
import { getFiatCurrencyRates } from '@/api/fiatCurrency'

const currencyStore = useCurrencyStore()
const isOpen = ref(false)
const searchTerm = ref('')
const requestResult = ref(null)

const filteredData = computed(() => {
  return currencyStore.getAllFiatCurrencies.filter((item) => {
    return searchTerm.value
      ? item['code'].toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          item['title'].toLowerCase().includes(searchTerm.value.toLowerCase())
      : true
  })
})

function addCurrency(currency) {
  if (
    !currencyStore.getActiveFiatCurrencies.filter((activeItem) => activeItem.code === currency.code)
      .length
  ) {
    const rate = currencyStore.getRateByCode(currency.code)
    if (!rate.length) {
      requestResult.value = getFiatCurrencyRates(currency.code).data
    }
  }

  currencyStore.$patch((state) => {
    if (
      !state.activeFiatCurrencies.filter((activeItem) => activeItem.code === currency.code).length
    ) {
      currency.value = state.activeFiatCurrencies.length ? state.activeFiatCurrencies[0].value : 1
      state.activeFiatCurrencies.push(currency)
      toggleDropdown()
      searchTerm.value = ''
    }
  })
}

watchEffect(() => {
  if (requestResult.value) {
    currencyStore.$patch((state) => {
      if (requestResult.value.value) state.rates.push(requestResult.value.value)
    })
  }
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}
</script>
