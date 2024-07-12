# Cypress with TypeScript Project

This project is configured to use Cypress with TypeScript for end-to-end testing.

## Requirements

- Node.js v22.4.1
- npm (installed with Node.js)
- nvm (Node Version Manager) to manage Node.js versions

## Installation

### Step 1: Install Node.js with nvm

1. Install nvm following the instructions at [nvm-sh/nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

2. Install Node.js v22.4.1:

  - nvm install 22.4.1
  - nvm use 22.4.1

3. Install project:

  - npm ci

## Running Cypress Tests

### Case 1: Open Cypress in Interactive Mode

  To open Cypress in interactive mode, run the following command:

  - npx cypress open

### Case 2: Open Cypress in Headless Mode

  To open Cypress in Headless Mode, run the following command:

  - npx cypress run