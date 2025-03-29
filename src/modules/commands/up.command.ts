import { CommandType, ICommand } from '../../types';

export class UpCommand implements ICommand {
  commandType = CommandType.UP;
  execute(args?: string[]) {
    console.log('Running UpCommand');
    return;
  }
}
