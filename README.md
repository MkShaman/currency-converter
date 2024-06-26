# Currency Converter ([Live Demo](https://vue-currency-converter.onrender.com/))

![Vue 3](https://img.shields.io/badge/-Vue%203-blue?style=flat-square&logo=vuedotjs)
![Pinia](https://img.shields.io/badge/-Pinia-purple?style=flat-square&logo=pinia)
![Vite](https://img.shields.io/badge/-Vite-green?style=flat-square&logo=vite)

Currency Converter is an app built using modern technologies such as Vue 3, Pinia, Vite, and the ExchangeRatesAPI.

## Description

Currency Converter allows users to easily convert one currency to another using current exchange rates. The application provides an intuitive interface and supports many currencies.

## Technologies

- **Vue 3**: A library for building user interfaces.
- **Pinia**: A state management library for Vue 3.
- **Vite**: A modern build tool for fast and efficient development.
- **ExchangeRatesAPI**: An API for fetching current exchange [rates](https://api.exchangeratesapi.net).

## Installation

To get started with the project, add a **.env** file to the project root and add variables.

```sh
VITE_APP_ROOT_API=https://api.exchangeratesapi.net/v1/exchange-rates/

VITE_APP_ACCESS_KEY=<YOUR_API_KEY>

```

You can get API Key [here](https://api.exchangeratesapi.net)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile Tailwind Css

```sh
npm run watch
```

### Compile and Minify for Production

```sh
npm run build
```

## License

The project is licensed under the MIT License.
