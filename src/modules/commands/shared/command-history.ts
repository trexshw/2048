import { ICommand } from '../../../types';

export class CommandHistory {
  private history: ICommand[] = [];

  constructor() {}

  push(command: ICommand) {
    this.history.push(command);
  }

  pop() {
    return this.history.pop();
  }
}
