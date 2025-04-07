import { CommandType, ICommand } from '../../types';
import { Canvas, CanvasCell } from '../canvas';
import { DebugCommand } from './debug.command';
import { NewCommand } from './new.command';
import CommandManager from './shared/command-manager';
import { v4 as uuidv4 } from 'uuid';

class DummyCommand implements ICommand {
  public id: string;
  public type: CommandType | string;
  public message: string;

  constructor(message: string) {
    this.message = message;
    this.id = uuidv4();
    this.type = 'DUMMY';
  }

  setId(id: string) {
    this.id = id;
  }

  execute() {
    console.log(this.message);
  }
}

describe('DebugCommand', () => {
  describe('constructor', () => {
    const command = new NewCommand(new Canvas(4, 4));
    expect(command.id).toMatch(
      /^[a-z|\d]{8}-[a-z|\d]{4}-[a-z|\d]{4}-[a-z|\d]{4}-[a-z|\d]{12}$/,
    );
  });

  describe('execute', () => {
    test('Execute debug, print command queue and history', () => {
      const commandManager = new CommandManager();

      const commands = [
        new DummyCommand('Dummy command 1'),
        new DummyCommand('Dummy command 2'),
        new DummyCommand('Dummy command 3'),
      ];

      const expected = [];

      for (const command of commands) {
        const newId = uuidv4();
        command.setId(newId);
        commandManager.addCommand(command);
        expected.push({ id: newId, type: 'DUMMY' });
      }

      // Run commands
      commandManager.runCommand();
      commandManager.runCommand();

      console.log = jest.fn();
      const debugCommand = new DebugCommand(commandManager);
      debugCommand.execute();

      expect((console.log as jest.Mock).mock.calls).toEqual([
        [`Debug pending: ${expected[2].id} | ${expected[2].type}`],
        [`Debug history: ${expected[0].id} | ${expected[0].type}`],
        [`Debug history: ${expected[1].id} | ${expected[1].type}`],
      ]);
    });
  });
});
