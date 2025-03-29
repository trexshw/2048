import { CommandType, ICommand } from '../../types';

export class NewCommand implements ICommand {
  commandType = CommandType.NEW;
  execute(args?: string[]) {
    console.log('Running NewCommand');
    return;
  }
}
