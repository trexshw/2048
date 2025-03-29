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

export class Client {
  private readonly readline: ReturnType<typeof createInterface>;
  private canvas: Canvas;

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
          this.runCommand(commandStr, args);

          if (commandStr.toUpperCase() !== 'Q') {
            this.canvas.draw();
          }

          // Check if game ended
          const status = CommandUtils.isGameCompleted(this.canvas.getCanvas());
          if (status.end) {
            this.canvas.setLock(true);
            console.log(status);
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

  async runCommand(commandStr: string, args?: string[]) {
    const isGameLocked = this.canvas.getLock();

    switch (commandStr.toUpperCase()) {
      case 'H':
      case 'HELP': {
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
      case 'U': {
        const command = new MergeUpCommand(this.canvas);
        if (!isGameLocked) {
          command.execute();
        }
        break;
      }
      case 'D': {
        const command = new MergeDownCommand(this.canvas);
        if (!isGameLocked) {
          command.execute();
        }
        break;
      }
      case 'L': {
        const command = new MergeLeftCommand(this.canvas);
        if (!isGameLocked) {
          command.execute();
        }
        break;
      }
      case 'R': {
        const command = new MergeRightCommand(this.canvas);
        if (!isGameLocked) {
          command.execute();
        }
        break;
      }
      case 'Q': {
        this.readline.setPrompt('Thanks for playing. Exiting game...\n');
        this.readline.prompt();
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        const EXIT_CODE = 0;
        process.exit(EXIT_CODE);
        return;
      }
      default:
        console.error(
          `No command "${commandStr}" is found. Please enter a valid command.\n`,
        );
    }
  }
}
