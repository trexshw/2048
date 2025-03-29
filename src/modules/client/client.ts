import chalk from 'chalk';
import { createInterface } from 'readline';
import { ICommand } from '../../types';
import {
  MergeDownCommand,
  MergeLeftCommand,
  MergeRightCommand,
  MergeUpCommand,
} from '../commands';
import { Canvas } from '../canvas';

export class Client {
  private readonly readline: ReturnType<typeof createInterface>;
  private canvas: Canvas;

  constructor() {
    this.readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('Welcome to 2048!\n');
    this.canvas = new Canvas(4, 4);
    this.canvas.draw();
  }

  start() {
    try {
      this.readline.setPrompt(chalk.blue('Enter command (Enter H for help): '));
      this.readline.prompt();

      this.readline.on('line', (line) => {
        console.log('\n');
        const [commandStr, ...args] = line.trim().split(/\s+/);
        try {
          this.runCommand(commandStr, args);

          if (commandStr.toUpperCase() !== 'Q') {
            this.canvas.draw();
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
        command.execute();
        break;
      }
      case 'D': {
        const command = new MergeDownCommand(this.canvas);
        command.execute();
        break;
      }
      case 'L': {
        const command = new MergeLeftCommand(this.canvas);
        command.execute();
        break;
      }
      case 'R': {
        const command = new MergeRightCommand(this.canvas);
        command.execute();
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
