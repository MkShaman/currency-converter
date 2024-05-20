<script setup>
import TheSelect from '@/components/TheSelect.vue'
import TheCurrencyItem from '@/components/TheCurrencyItem.vue'
import { processFiatCurrencyData } from '@/actions/fiatCurrency'

processFiatCurrencyData()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-emerald-500 to-cyan-900 py-5">
    <form
      class="mx-auto w-full max-w-lg space-y-3 rounded-md bg-white p-5 text-sm shadow"
      @submit.prevent="submit"
    >
      <TheCurrencyItem />
      <TheSelect />
    </form>
    <!--<div
      class="mx-auto my-5 w-full max-w-sm divide-y divide-dotted divide-slate-300 rounded-md bg-white px-5 py-3 text-sm shadow"
    >
      Currency Convertor on Vue.js
    </div>-->
  </div>
</template>
