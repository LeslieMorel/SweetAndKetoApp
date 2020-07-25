export class OrderStates {
  static get(): string[] {
    return [
      'Pending',
      'InProcess',
      'Finished',
      'Delivered',
      'Canceled'

    ];
  }
}
