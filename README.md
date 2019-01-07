# NY Times

## Specification

The website uses the New York Times API to create a single page application that presents the latest 10 news about a topic. The goal is to get the latest 10 news from the API, along with a small summary and a link for each one. The final result should be a search input and a list with the 10 news items, each one comprising an image and a title. By default it will load the news related to any topic you decide. Clicking on an item shows its summary, along with an external link to the original article. The search input should change the news topic.

## Explanation

Mocha and Chai were used for Unit Testing.
Yarn and NPM were used as package managers.
JavaScript ES6+, SASS and Vue.js were used for the implementation of the code challenge.
The App component has the following structure:
* data: search, articles, loading, error429 & errorFetch.
* created()
* mounted()
* watch: search()
* methods: debounce(), find(), flip() & reset()

The search property is bound to the search input. Anytime the user types in it, the clear button will show next to it in order to improve the user experience. Each of the articles are displayed like cards, with front and back side. The front side shows the title and image. THe back side shows a summary, a link to the original article and the same image as background.

The transitions are done with CSS3. SASS was used with the Block Element Modifier approach in order to create semantic and organized stylesheets. Anytime the user types a topic, the Vue model will wait a second to make the request in order to avoid the 429 error (too many requests). We can do only 1 call per second to the New York Times API according to their Article API documentation. 

A loading property and verbose messages were added to the page, in order to improve the user experience as well. 

The color palette consists mainly of black, white and green, because these colors are related to news, seriousness, elegance and tranquility. These colors are necessary to reflect those emotions to the viewer, because this is a website that focuses on accesing and consuming information.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Tech Stack

* JavaScript ES6+
* Jest
* NPM
* SASS
* Vue.js

## Build Version

0.0.1

## About Me

Kevin Martínez Montero

Senior Front End Engineer

Currently living in Costa Rica