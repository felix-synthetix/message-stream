## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project Architecture

This project demonstrates a simple message processing pipeline. The flow of data is as follows:

```
[WhatsApp Webhook] -> [Prioritisation Engine] -> [Stream] -> [Feed Service] -> [Gateway]
```

## UI Functionality

A simple web interface is provided to demonstrate the functionality. The user can:
- **Send Messages**: Use the input form to send a message, which simulates an incoming WhatsApp message.
- **View the Feed**: The message feed connects to the server via a WebSocket and displays messages from the buffer.
- **Prioritisation**: When a message is sent, the `PrioritisationEngine` scores it based on the percentage of vowels in its content. By default, only messages with a score of 50% or higher are streamed to the user's feed.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start
```

## Running the Application

Once the application is running, the following endpoints are available:

- **Web Client**: [http://localhost:3000](http://localhost:3000)
- **Healthcheck**: [http://localhost:3000/health](http://localhost:3000/health)
- **OpenAPI Documentation**: [http://localhost:3000/open-api](http://localhost:3000/open-api)
- **AsyncAPI Documentation**: [http://localhost:3000/async-api](http://localhost:3000/async-api)

## Run tests

```bash
# unit tests
$ npm run test
```


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
