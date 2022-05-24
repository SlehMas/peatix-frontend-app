import { defineStore } from 'pinia'
import { useCookies } from "vue3-cookies";
import type IApi from './api.interface';
import type ILocation from './location.interface';

const { cookies } = useCookies()

export const useStore = defineStore({
  id: 'temp',
  state: () => ({
    temp: NaN,
    isDarkTheme: localStorage.getItem('theme') ? localStorage.getItem('theme') === 'dark' : window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches,
    unit: 'F',
    location: {
      locationKey: cookies.get("locationKey") ? cookies.get("locationKey") : '',
      locationName: cookies.get("locationName") ? cookies.get("locationName") : '',
      latitude: NaN,
      longitude: NaN,
      search: false
    } as ILocation,
    ipAddress: '' as string,
    api: {
      apiKey: "IKsuOiyoB8VfiEwAfC1u4bii5KnKkevM",
      lang: "en-en"
    } as IApi,
    weather: {
      hourData: null,
      fiveDayData: null
    } as any
  }),
  getters: {
    getUnit: (state) => state.unit,
    getTemp: (state) => state.temp,
    getLocation: (state) => state.location,
    getIpAddress: (state) => state.ipAddress,
    getApi: (state) => state.api,
    getWeather: (state) => state.weather,
    getIsDarkTheme: (state) => state.isDarkTheme
  },
  actions: {
    setUnit(_unit: string) {
      this.unit = _unit
    },
    setTemp(_temp: number) {
      this.temp = _temp
    },
    setLocation(_location: ILocation) {
      this.location = _location
    },
    setIpAddress(ip: string) {
      this.ipAddress = ip
    },
    setApi(_api: IApi) {
      this.api = _api
    },
    setWeather(_weather: any) {
      this.weather = _weather
    },
    setDarkTheme(flag: boolean) {
      this.isDarkTheme = flag
    },
    convert() {
      this.unit === 'C' ? this.temp = (this.temp - 32) * 5 / 9 : this.temp = (this.temp * 9 / 5) + 32
    }
  }
})
