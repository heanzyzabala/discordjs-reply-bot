export class CommandError extends Error {
  readonly id: string;
  constructor(id: string, message: string) {
    super(message);
    this.id = id;
  }
}
