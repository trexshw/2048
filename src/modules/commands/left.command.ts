import { CommandType, ICommand } from '../../types';

export class LeftCommand implements ICommand {
  commandType = CommandType.LEFT;
  execute(args?: string[]) {
    console.log('Running LeftCommand');
    return;
  }
}
