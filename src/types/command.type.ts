import { CanvasCell } from '../modules/canvas';

export enum CommandType {
  NEW = 'NEW', // New
  UP = 'UP', // Up
  DOWN = 'DOWN', // Down
  LEFT = 'LEFT', // Left
  RIGHT = 'RIGHT', // Right
  QUIT = 'QUIT', // Quit
}

export interface ICommand {
  execute: (args?: string[]) => void;
  getStates?: () => Record<string, unknown>;
}
