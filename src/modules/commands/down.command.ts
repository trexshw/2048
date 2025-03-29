import { CommandType, ICommand } from '../../types';

export class DownCommand implements ICommand {
  commandType = CommandType.DOWN;
  execute(args?: string[]) {
    console.log('Running DownCommand');
    return;
  }
}
