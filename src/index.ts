import { add } from './service/service';

export class PracteraSDK {

  protected environment: string;

  constructor(environment: string) {
    this.environment = environment;
  }

  addTwoNumbers(firstNum: any, secondNum: any): number {
    return add(firstNum, secondNum);
  }

}
