export interface EventInterface {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => void;
}
