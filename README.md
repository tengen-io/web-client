# tengen.io | Web client
:black_circle: Frontend of the open source Go server

[Server app](https://github.com/tengen-io/server)

[Go](https://en.wikipedia.org/wiki/Go_(game)) is the world's oldest and most popular board game. Yet it is still relatively niche in the United States and Europe. The goal of this project is to offer a simple, perfomant, delightful online experience to learn and play Go. 

We'd like to do to Go what [Lichess](https://lichess.org/) has done to internet chess.

### Running the App with Docker

```bash
docker pull formomosan/go_stop_client

docker run -p 8080:8080 -d formomosan/go_stop_client
```
Then visit http://localhost:8080 to view the app.

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

Some dev app conventions:

* We use ESLint and AirBnB styleguide for JS
* We like Prettier.js and use it to automate formatting
* We prefer a terse functional style in code

The project is in very early stages of development and much of the components are open for contribution. For more specifics, see the [the issues page](https://github.com/ianwessen/go-stop-client/issues).
