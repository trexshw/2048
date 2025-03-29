# 2048

A simple implementation of the game 2048.

https://play2048.co

## Prerequisite
- Node ^22
- NPM ^10.9

## Quick Start
```sh
$ npm install
$ npm run dev
```

## Package Scripts
- Run in development mode: `npm run dev`
- Run the program in production mode : `npm run start`
- Build project: `npm run build`
- Run test suites: `npm run test`
- Run test suites in watch mode: `npm run test-watch`
- Check for linting errors: `npm run lint`
- Format code: `npm run format`

## Available commands
| Keystroke | Description |
|---------|-------------|
| ↑ / U  | Merge up |
| ↓ / D  | Merge down |
| ← / L  | Merge left |
| → / R  | Merge right |
| N  | Start/Restart a new game |
| Q  | Exit the game |

### Design
Command Pattern has be used to implement the program

* Client
  * Control the program flow
  * Read console input
  * Identify command type and create commands
  * Pass command to CommandManager
  * Call Canvas to print 

* Command
  * Interface for all commands
  * Sub class must implement an `execute()` method

* Canvas Class (Receiver)
  * Canvas Class
    * Store canvas data model
    * Get/Set canvas data
    * Draw canvas

* CommandManager (Invoker)
  * Queue commands
  * Execute commands
  * Keep command histories


## Assumption

1. Size of the game board is n x n

## TODO

* Undo command
* Score board
