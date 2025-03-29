import chalk from 'chalk';
import { createInterface } from 'readline';
import { CommandType, ICommand } from '../../types';
import {
  MergeDownCommand,
  MergeLeftCommand,
  MergeRightCommand,
  MergeUpCommand,
} from '../commands';
import { Canvas } from '../canvas';
import { CommandUtils } from '../commands/shared/command-utils';
import CommandManager from '../commands/shared/command-manager';

export class Client {
  private readonly readline: ReturnType<typeof createInterface>;
  private canvas: Canvas;
  private commandManager: CommandManager;

  constructor() {
    this.readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Enable raw input mode to capture keypress events
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
      if (!this.canvas.getLock()) {
        if (key.name === 'up') this.readline.emit('line', 'U');
        if (key.name === 'down') this.readline.emit('line', 'D');
        if (key.name === 'right') this.readline.emit('line', 'R');
        if (key.name === 'left') this.readline.emit('line', 'L');
      }
    });

    this.commandManager = new CommandManager();

    console.log('Welcome to 2048!\n');
    this.canvas = new Canvas(4, 4);
    this.canvas.draw();
  }

  start() {
    try {
      this.readline.setPrompt(
        chalk.blue(`Press ↑ ↓ ← → or Enter command ('H' for help): `),
      );
      this.readline.prompt();

      this.readline.on('line', (line) => {
        console.log('\n');
        const [commandStr, ...args] = line.trim().split(/\s+/);
        try {
          const command = this.createCommand(commandStr, args);

          if (command) {
            this.commandManager.addCommand(command);
            this.commandManager.runCommand();
          }

          // Print canvas if game not ended
          if (commandStr.toUpperCase() !== 'Q') {
            this.canvas.draw();
          }

          // Check if game ended
          const status = CommandUtils.isGameCompleted(this.canvas.getCanvas());
          if (status.end) {
            this.canvas.setLock(true);
            if (status.win) {
              console.log(chalk.greenBright('Congrats. You have won 2048!'));
            } else {
              console.log(
                chalk.greenBright(
                  'Unfortunately, you have lost the game. Try again!',
                ),
              );
            }

            this.readline.setPrompt(
              chalk.blue(
                `Do you want to start a new game? [N (New Game) / Q (Quit)]: `,
              ),
            );
          }
        } catch (err: unknown) {
          if (!(err instanceof Error)) throw err;
          console.error(err.message, '\n');
        }

        this.readline.prompt();
      });

      this.readline.on('close', () => {
        this.readline.setPrompt('');
        this.readline.prompt();
        process.exit(0);
      });
    } catch (err: unknown) {
      if (!(err instanceof Error)) throw err;
      console.error(err.message);
    }
  }

  createCommand(commandStr: string, args?: string[]) {
    let command: ICommand | null = null;
    switch (commandStr.toUpperCase()) {
      case 'U': {
        command = new MergeUpCommand(this.canvas);
        break;
      }
      case 'D': {
        command = new MergeDownCommand(this.canvas);
        break;
      }
      case 'L': {
        command = new MergeLeftCommand(this.canvas);

        break;
      }
      case 'R': {
        command = new MergeRightCommand(this.canvas);
        break;
      }
      case 'H': {
        console.info(
          '\nAvailable Commands:\n' +
            'H: Help\n' +
            'U: Up\n' +
            'D: Down\n' +
            'L: Left\n' +
            'R: Right\n' +
            'Q: Quit\n',
        );
        break;
      }
      case 'N': {
        this.canvas = new Canvas(4, 4);
        console.info('New game started!\n');
        break;
      }
      case 'Q': {
        this.readline.setPrompt('Thanks for playing. Exiting game...\n');
        this.readline.prompt();
        const EXIT_CODE = 0;
        process.exit(EXIT_CODE);
        return;
      }
      default:
        console.error(
          `No command "${commandStr}" is found. Please enter a valid command.\n`,
        );
    }

    return command;
  }
}
