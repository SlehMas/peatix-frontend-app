<style scoped>
.temperature-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 5px 0;
}

.value {
    font-size: 3rem;
    font-weight: 600;
    color: var(--color);
    text-shadow: var(--text-shadow);
}

.phrase {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-2);
}

.days {
    background-color: var(--card-background);
    display: inline-flex;
    border-radius: 8px;
    box-shadow: var(--card-boxshadow);
}

.day {
    width: calc(375px / 5);
    height: 75px;
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.day:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.day:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}

.temperature-value {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color);
}

.day-date {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-2);
}

@media (max-width: 400px) {
    .days {
        max-width: 360px;
    }
}
</style>
<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue';
import { useStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import axios from "axios"
import type ILocation from '@/stores/location.interface';

const store = useStore()
let weatherWidgetErr = ref(false)
const { location, weather, ipAddress, api } = storeToRefs(store)

function updateLocationStore(fields: ILocation) {
    let tmpLocation = location.value
    tmpLocation = { ...tmpLocation, ...fields }
    store.setLocation(tmpLocation)
}

function updateWeatherStore(fields: any) {
    let tmpWeather = weather.value
    tmpWeather = { ...tmpWeather, ...fields }
    store.setWeather(tmpWeather)
}

function getIpAddress(param = false) {
    axios
        .get("https://api.ipify.org?format=json")
        .then((Response) => {
            store.setIpAddress(Response.data.ip);
            if (param) { getIpLocation() }
        })
        .catch((error) => {
            weatherWidgetErr.value = true
        })
}
function getIpLocation() {
    axios
        .get("https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=" + api.value.apiKey + "&q=" + ipAddress.value + "&language=" + api.value.lang + "&details=false")
        .then((Response) => {
            updateLocationStore({
                locationKey: Response.data.ParentCity.Key as string,
                locationName: Response.data.ParentCity.EnglishName as string
            } as ILocation)
            getWeatherData();
            get5DayWeatherData();
        })
        .catch((error) => {
            weatherWidgetErr.value = true
        })
}
function getMeridianLocation() {
    axios
        .get("https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + api.value.apiKey + "&q=" + location.value.latitude + "," + location.value.longitude + "&language=" + api.value.lang + "&details=false&toplevel=false")
        .then((Response) => {
            updateLocationStore({
                locationKey: Response.data.ParentCity.Key as string,
                locationName: Response.data.ParentCity.EnglishName as string
            } as ILocation)
            getWeatherData();
            get5DayWeatherData();
        })
        .catch((error) => {
            weatherWidgetErr.value = true
        })
}
function getWeatherData() {
    axios
        .get("https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/" + location.value.locationKey + "?apikey=" + api.value.apiKey + "&language=" + api.value.lang + "&details=false&metric=true")
        .then((Response) => {
            updateWeatherStore({
                hourData: Response.data[0]
            })
        })
        .catch((error) => {
            // weatherWidgetErr.value = true
        })
}
function get5DayWeatherData() {
    axios
        .get("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + location.value.locationKey + "?apikey=" + api.value.apiKey + "&language=" + api.value.lang + "&details=false&metric=true")
        .then((Response) => {
            updateWeatherStore({
                fiveDayData: Response.data
            })
        })
        .catch((error) => {
            weatherWidgetErr.value = true
        })
}
function checkLocation() {
    if (weather.value.hourData != null && weather.value.hourData.Link.search(location.value.locationKey) == -1) {
        weather.value.hourData = null;
        weather.value.fiveDayData = null;
        getWeatherData();
        get5DayWeatherData();
    } else {
        getWeatherData();
        get5DayWeatherData();
    }
}
function success(position: any) {
    updateLocationStore({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    } as ILocation)

    getMeridianLocation();
}

function error() {
    alert('Could not get location')
    weatherWidgetErr.value = true



    !location.value.locationKey && !location.value.locationName ? getIpAddress(true) : checkLocation();
}

onMounted(() => {
    if (!location.value.search) {
        if (!navigator.geolocation) {
            if (!location.value.locationKey && !location.value.locationName) {
                getIpAddress(true);
            } else {
                checkLocation();
            }
        } else {
            navigator.geolocation.getCurrentPosition(success, error)
        }
    } else {
        updateLocationStore({ search: false } as ILocation)
        checkLocation();
    }
})
</script>

<template>
    <h3>Today's weather info</h3>
    <div v-if="!weatherWidgetErr">
        <div v-if="weather.hourData && weather.fiveDayData" class="weather-data">
            <div class="temperature-holder">
                {{ location.locationName }}
                <span class="value">{{ weather.hourData.Temperature.Value }}°C</span>
                <span class="phrase">{{ weather.hourData.IconPhrase }}</span>
            </div>
            <div class="days">
                <span class="day" v-for="(day, index) in weather.fiveDayData.DailyForecasts" :key="index">
                    <span class="temperature-value">{{ day.Temperature.Maximum.Value }}°C</span>
                    <span class="day-date">{{ new Date(day.EpochDate * 1000).toLocaleString("en-US", {
                            day: '2-digit', year:
                                '2-digit', month: '2-digit'
                        })
                    }}</span>
                </span>
            </div>
        </div>
        <div v-else>
            Loading today's weather data
            <LoadingSpinner/>
        </div>
    </div>

    <div v-else>
        Could not load weather data
        {{ ':_(' }}
    </div>
</template>

