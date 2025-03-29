import { CommandType, ICommand } from '../../types';

export class QuitCommand implements ICommand {
  commandType = CommandType.QUIT;
  execute(args?: string[]) {
    console.log('Running UpCommand');
    return;
  }
}
