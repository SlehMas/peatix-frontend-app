<script setup lang="ts">
import { useStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import WeatherWidget from '@/components/WeatherWidget.vue'

const store = useStore()
let inputTemp = ref(0)
const { temp, unit } = storeToRefs(store)


function convert() {
  store.setTemp(inputTemp.value)
  store.convert()
}

function setUnit(unit: string) {
  store.setUnit(unit)
  store.setTemp(NaN) // to reset
}

</script>

<template ref="main">
  <main>
    <span class="title">Temperature converter</span>
    <div class="converter">
      <p>Select unit to convert to</p>
      <div class="form">
        <div class="radio">
          Convert to: Celcius <input type="radio" name="temp-unit" id="temp-unit" value="C" :checked="unit === 'C'"
            @change="setUnit('C')">
          Farenheit <input type="radio" name="temp-unit" id="temp-unit" value="F" :checked="unit === 'F'"
            @change="setUnit('F')">
        </div>
        <div class="input form-group">
          <input type="number" v-model="inputTemp" class="form-control">
          <button @click="convert()" class="btn btn-block btn-light my-3">Convert to {{ unit }}</button>
        </div>
      </div>
    </div>
    <hr>
    <div v-if="!isNaN(temp)" class="convert-result">
      <p>
        The temperature in {{ unit }} is {{ parseFloat(temp.toString()).toFixed(2) }}
      </p>
    </div>
    <div class="py-5">
      <WeatherWidget/>
    </div>
    

  </main>
</template>

<style scoped>
* {
  font-family: 'Helvetica Neue', 'sans-cherif';
}

main {
  background-color: var(--background);
  color: var(--color);
  text-align: center;
}

.title {
  font-size: 3em;
  font-weight: 800;
}

.converter {
  margin: 20px 0;
}

.converter .form {

  background-color: var(--card-background);
  box-shadow: var(--card-boxshadow);
  padding: 35px 75px;
  display: inline-block;
  margin: 30px 0;
}

.converter .form .radio {
  padding: 10px 0;
}

.converter .form .input input {
  float: left;
}
.convert-result {
  font-size: 1.4em;
}

</style>
