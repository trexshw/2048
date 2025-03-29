import { ICommand } from '../../../types';
import CommandManager from './command-manager';

// Dummy command for the test
class DummyCommand implements ICommand {
  public message: string;

  constructor(message: string) {
    this.message = message;
  }

  execute() {
    console.log(this.message);
  }
}

describe('CommandManager', () => {
  describe('constructor', () => {
    test('Create command manager, success', () => {
      const commandManager = new CommandManager();
      expect(commandManager).not.toBeNull();
      expect(commandManager).not.toBeUndefined();
      expect(commandManager.commandQueue.length).toBe(0);
      expect(commandManager.commandHistory.length).toBe(0);
    });
  });

  describe('addCommand', () => {
    test('Add command to manager, success', () => {
      const commandManager = new CommandManager();

      const command = new DummyCommand('Dummy command');
      commandManager.addCommand(command);

      expect(commandManager.commandQueue.length).toBe(1);
    });
  });

  describe('runCommand', () => {
    test('No commands, throw error', () => {
      expect(() => {
        const commandManager = new CommandManager();
        commandManager.runCommand();
      }).toThrow(new Error('Invalid command or no commands are found.'));
    });

    test('First command in queue is run, success', () => {
      const commandManager = new CommandManager();

      commandManager.addCommand(new DummyCommand('Dummy command 1'));
      commandManager.addCommand(new DummyCommand('Dummy command 2'));
      commandManager.addCommand(new DummyCommand('Dummy command 3'));

      console.log = jest.fn();
      commandManager.runCommand();
      expect(console.log).toHaveBeenCalledWith('Dummy command 1');
    });
  });
});
