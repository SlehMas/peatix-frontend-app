# Peatix-frontend-test
# Intro
The following is an implementation of the code test that way sent my way on 20/05/2022
This readme aims to show you how to run the project.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Implementation

For this solution i used vue store to have a centralized data store where all the components can communicate with a single source of truth.
All components and views in this app communication with store.ts to handle the app state. 
The bigger the application gets, the harder it is for data to remain consistent and managable in each individual component, therefore it makes it so easier and much more neater to manage the state and information flow in a single place.

ASCII diagram to represent the archtecture


                                       +---------------------------+
                                       |                           |
                                       |                           |
                                       |      store.js             |
                                       |                           |
                                       |                           |
                              +--------+                           +------------+
                              |        +---------------------------+            |
+--------------------------------------------------------------------------------------------------------------------+
|                             |                                                 |                                    |
|                             |                                                 |                                    |
|                             |                                                 |                                    |
|                             |                               +-----------------+--------------------------+         |
|                             |                               |                 |                          |         |
|                             |                               |                 |                          |         |
|                             |                               |                 |                          |         |
|          +------------------+-----+                         |     +-----------+----------------+         |         |
|          |                        |                         |     |                            |         |         |
|          |                        |                         |     |                            |         |         |
|          |                        |                         |     |                            |         |         |
|          |      ThemeToggle.vue   |                         |     |       WeatherWidget        |         |         |
|          |                        |                         |     |                            |         |         |
|          |                        |                         |     |                            |         |         |
|          +------------------------+                         |     +----------------------------+         |         |
|                                                             |                                            |         |
|                                                             |                                            |         |
|                                                             |                                            |         |
|                                                             |                                            |         |
|                                                             |             HomeView.vue                   |         |
|                                                             |                                            |         |
|                                                             +--------------------------------------------+         |
|                                                                                                                    |
|                                           App.vue                                                                  |
|                                                                                                                    |
+--------------------------------------------------------------------------------------------------------------------+



The CSS theme was defined using CSS custom properties (variables), Complex websites have very large amounts of CSS, often with a lot of repeated values. For example, the same color might be used in hundreds of different places, requiring global search and replace if that color needs to change. When changing to light or dark theme, the changes will reflect on all the document. The themes were defined inside src/assets/base.css. 
In the store, the code checks if the page is already visited and has user preference thanks to localStorage.
The preference is saved when the user changes the default theme. If not, the code checks if the current user environment has a prefered color scheme by querying `prefers-color-scheme`



I also opted for accuweather API displaying today's and 5 day forecast of local weather as i felt it will add value to the UI.
