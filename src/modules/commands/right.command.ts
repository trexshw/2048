import { CommandType, ICommand } from '../../types';

export class RightCommand implements ICommand {
  commandType = CommandType.RIGHT;
  execute(args?: string[]) {
    console.log('Running RightCommand');
    return;
  }
}
