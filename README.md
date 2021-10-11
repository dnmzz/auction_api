# Auctions API

<!-- TOC -->

- [Description](#description)
- [Getting Started](#getting-started)
- [Running Auction API](#running-auction-api)
- [Tests](#tests)

<!-- /TOC -->

## Description

This microservice will be responsible for managing all the information regarding auctions associated to users serving as a API for a client to consume.

## Getting Started

1. Install nvm (Node Version Manager)

   ```
   https://github.com/nvm-sh/nvm
   ```

   Then expose the `NVM_DIR` env in your `.zshrc file`:

   ```
   export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
   ```

2. Download and install [Visual Studio Code](https://code.visualstudio.com/download)
          
## Running Auction API

To run the application use the following command:

1. Check out the master branch, ```git clone``` it and thereafter run ```npm install```.

2. Run `npm run dev`

## Tests