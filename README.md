# steam-heatmap

The intention of this project is to collect a user's Steam playtime data so that it can be used to generated a heatmap similar to the github heatmap that shows a heatmap of the activity of a user's github account. This project pulls recently played game data from a user's Steam account and stores the data in a mariadb instance. 

## Prerequisites and Dev Setup 

This project requires [Node](https://nodejs.org) v26 or later. This project contains a `.tool-versions` file, so if you have [asdf](https://asdf-vm.com) installed, you can run `asdf install nodejs` to ensure that you have the proper version of Node installed for this project.

This project also requires [Docker](https://docs.docker.com) to run the MariaDB instance. It also helps to have the [mariadb Command-Line Client](https://mariadb.com/docs/server/clients-and-utilities/mariadb-client/mariadb-command-line-client) installed.

## First Time Setup

If you are running the project for the first time, perform the following steps:

* Copy the variables in `.env.example` to `.env` and provide necessary values
* Start the mariadb instance: `docker compose up`
* Create the database: `mariadb -D steam -P 3306 -u steam -p < ./sql/database-setup.sql`
    * Note: this assumes the database and mariadb user are named `steam`

## Running the Project

To run the project, first start the mariadb instance:
```bash
docker compose up
```

You can then run the data collection script by running:
```bash
node main.ts
```

