# GoStop
:black_circle: Frontend of the open source Go server

[Server app](https://github.com/camirmas/go-stop-server)

### Contribute

Jump in and check out [the issues page](https://github.com/ianwessen/go-stop-client/issues).

The frontend uses:

* React 16.6 for the interface + state management
* Webpack 3.11 for development, linting, and building
* React Router
* GraphQL + Apollo Client for talking to the API
* Bulma CSS for basic components and layout
* Ramda.js for data manipulation (similar to Underscore.js)
* Jest + Enzyme for testing

We have a live GraphQL API which you can interact with at https://go-stop.herokuapp.com/api/graphiql (It is a free-tier Heroku app, so give it a moment to spool up).

The project is structured like this:

```
- ApolloClient
    + Router/App
        * Home
        * Register
            - SignUpForm
            - LogInForm
        * About
        * Lobby
            - Game (page)
                * Game (component)
                    + Display
                    + Board
                        * Intersection
        * 404
```

Some dev app conventions:

* We use ESLint and AirBnB styleguide for JS
* We like Prettier.js and use it to automate formatting
* We prefer a terse functional style in code

The project is in very early stages of development and much of the components are open for contribution. For more specifics, see the [the issues page](https://github.com/ianwessen/go-stop-client/issues).
