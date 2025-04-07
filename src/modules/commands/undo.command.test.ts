import { CommandType, ICommand } from '../../types';
import { Canvas, CanvasCell } from '../canvas';
import { MergeDownCommand } from './merge-down.command';
import { MergeRightCommand } from './merge-right.command';
import { NewCommand } from './new.command';
import CommandManager from './shared/command-manager';
import { UndoCommand } from './undo.command';
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

describe('UndoCommand', () => {
  describe('constructor', () => {
    const command = new NewCommand(new Canvas(4, 4));
    expect(command.id).toMatch(
      /^[a-z|\d]{8}-[a-z|\d]{4}-[a-z|\d]{4}-[a-z|\d]{4}-[a-z|\d]{12}$/,
    );
  });

  describe('execute', () => {
    test('Execute undo with empty history, throw no histories error', () => {
      const canvas = new Canvas(4, 4);
      canvas.setCanvas([
        [2, 2, null, null],
        [2, null, null, null],
        [2, null, null, null],
        [2, null, null, null],
      ]);

      const commandManager = new CommandManager();

      commandManager.debugQueue();

      expect(() => {
        const undoCommand = new UndoCommand(canvas, commandManager);
        undoCommand.execute();
      }).toThrow(new Error('No history command founds.'));
    });

    test('Execute undo with command without getStates func, throw getStates undefined error', () => {
      const canvas = new Canvas(4, 4);
      canvas.setCanvas([
        [2, 2, null, null],
        [2, null, null, null],
        [2, null, null, null],
        [2, null, null, null],
      ]);

      const commandManager = new CommandManager();
      const dummyCommand = new DummyCommand('Dummy command 1');
      commandManager.addCommand(dummyCommand);
      commandManager.runCommand();

      commandManager.debugQueue();

      expect(() => {
        const undoCommand = new UndoCommand(canvas, commandManager);
        undoCommand.execute();
      }).toThrow(new Error('getStates() undefined.'));
    });

    test('Execute undo, return to previous states', () => {
      const canvas = new Canvas(4, 4);
      canvas.setCanvas([
        [2, 2, null, null],
        [2, null, null, null],
        [2, null, null, null],
        [2, null, null, null],
      ]);

      const expectedStates: CanvasCell[][][] = [
        [
          [null, null, null, 4],
          [null, null, 2, 2],
          [null, null, null, 2],
          [null, null, null, 2],
        ],
        [
          [null, null, null, null],
          [null, null, null, 4],
          [2, null, null, 2],
          [null, null, 2, 4],
        ],
      ];

      const commandManager = new CommandManager();

      commandManager.addCommand(new MergeRightCommand(canvas));
      commandManager.runCommand();
      canvas.setCanvas(expectedStates[0]);

      commandManager.addCommand(new MergeDownCommand(canvas));
      commandManager.runCommand();
      canvas.setCanvas(expectedStates[1]);

      const cellsBeforeUndo = canvas.getCanvas();
      expect(JSON.stringify(cellsBeforeUndo)).toBe(
        JSON.stringify(expectedStates[1]),
      );

      commandManager.debugQueue();

      const undoCommand = new UndoCommand(canvas, commandManager);
      undoCommand.execute();

      const cellsAfterUndo = canvas.getCanvas();
      expect(JSON.stringify(cellsAfterUndo)).toBe(
        JSON.stringify(expectedStates[0]),
      );
    });
  });
});
