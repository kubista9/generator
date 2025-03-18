export class Answer<T> {
  constructor(private value : T) {}
  
  public get(): T {
    return this.value;
  }
  
  public set(value: T): void {
    this.value = value;
  }

  public validate(): boolean{
    return this.value !== null && this.value !== undefined;
  }
}