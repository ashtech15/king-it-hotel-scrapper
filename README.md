# King It Test Hotel Offers

This is a Next.js application for displaying hotel offers, containerized using Docker.

## Table of Contents

- [King It Test Hotel Offers](#king-it-test-hotel-offers)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
  - [Running the Application](#running-the-application)
  - [Building the Docker Image](#building-the-docker-image)
  - [Environment Variables](#environment-variables)
  - [License](#license)

## Requirements

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ashtech15/king-it-hotel-scrapper.git
   cd king-it-hotel-scrapper/
   ```

2. Configuring environment
   ```bash
   cp .env.example .env
   ```

## Running the Application

To run the application locally using Docker Compose, follow these steps:

1. Open a terminal and navigate to the project root directory where your `docker-compose.yml` file is located.

2. Use the following command to start the services:

   ```bash
   docker-compose up
   ```

   This command will build the Docker images if they are not already built and start the services as defined in your `docker-compose.yml`.

3. After the command executes successfully, you can access the application in your web browser at:

   ```
   http://localhost:3000
   ```

4. To stop the application, you can press `CTRL+C` in the terminal or run:

   ```bash
   docker-compose down
   ```

## Building the Docker Image

If you want to build the Docker image without starting the containers, you can use the following command:

```bash
docker-compose build
```

## Environment Variables

Make sure to set up the necessary environment variables in your `docker-compose.yml` or through an `.env` file as needed for your application to run correctly.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
