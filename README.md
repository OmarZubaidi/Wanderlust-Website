# Wanderlust Website

<div align='center'>
  <img
    height='150'
    src='./Logo.png'
    alt='Logo'
  />
</div>

<p align='center'>
  The website for the <a href='https://github.com/OmarZubaidi/Wanderlust'>
    Wanderlust
  </a> project.
</p>

<hr>

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href='#about-the-project'>
        About the Project
      </a>
      <ul>
        <li>
          <a href='#built-with'>
            Built With
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href='#getting-started'>
        Getting Started
      </a>
      <ul>
        <li>
          <a href='#prerequisites'>
            Prerequisites
          </a>
        </li>
        <li>
          <a href='#installation'>
            Installation
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href='#contributing'>
        Contributing
      </a>
    </li>
    <li>
      <a href='#contact'>
        Contact
      </a>
    </li>
    <li>
      <a href='#acknowledgements'>
        Acknowledgements
      </a>
    </li>
  </ul>
</details>

## About the Project

You pick your dates and location; it suggests flights and accommodation to book beforehand and then plans your itinerary during the trip. You can also add your friends so you can all see who booked the same flights/hotels.

**Wanderlust** then gives you the points of interest and restaurants to visit (which you can rearrange to your heart's content).

### Built With

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

You need to have:

- An [Auth0](https://auth0.com/) account, with a Single Page Application application (weird naming but okay).
- An [Amadeus](https://console.cloud.google.com/project/_/google/maps-apis/credentials) account, with an API key.
- An [Open Weather Map](https://openweathermap.org/api) account, with an API key.
- Installed Node Version Manager
- Installed the latest LTS version of Node

```shell
nvm install npm@lts -g
```

### Installation

- Clone the repo

```shell
git clone https://github.com/OmarZubaidi/Wanderlust-Website.git
```

- Install NPM packages

```shell
npm i
```

- Create your `.env.local` file in the `website` folder as below.

```
REACT_APP_DOMAIN=YOUR_AUTH0_DOMAIN
REACT_APP_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
REACT_APP_LOCAL_SERVER_URL=http://localhost:3333
REACT_APP_SERVER_URL=YOUR_SERVER_URL
REACT_APP_AMADEUS_API_KEY=YOUR_AMADEUS_API_KEY
REACT_APP_AMADEUS_API_SECRET=YOUR_AMADEUS_SECRET
REACT_APP_WEATHER_API_KEY=YOUR_OPEN_WEATHER_MAP_API_KEY
REACT_APP_WEATHER_URL=http://api.openweathermap.org/geo/1.0/direct?
```

- Run the app using

```
npm run dev
```

## Contributing

Contributions are welcome!

If you have a suggestion that would make this better:

- [Fork the project](https://github.com/OmarZubaidi/Wanderlust-Website/fork).
- Create a branch using `git checkout -b feat-YOUR_FEATURE_NAME`.
- Work on it and commit changes using `npx cz` (you'll get an interactive prompt for the commit message).
- Push to your branch using `git push origin feat-YOUR_FEATURE_NAME`.
- [Open a pull request](https://github.com/OmarZubaidi/Wanderlust-Website/compare).

## Contact

Creators: [Daniele Capano](https://github.com/daniele24134/), [Gabriele Zannini](https://github.com/CosmicZanna/), [Omar Zubaidi](https://github.com/OmarZubaidi/), and [Stefan Feldner](https://github.com/stefanfeldner/).

Project Link: [on GitHub](https://github.com/OmarZubaidi/Wanderlust/).

## Acknowledgements

- [Amadeus](https://developers.amadeus.com/)
- [Auth0](https://auth0.com/)
- [Open Weather Map](https://openweathermap.org/api)
