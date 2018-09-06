import { ShoppingRoutingModule } from './shopping-routing.module';

describe('ShoppingRoutingModule', () => {
  let shoppingRoutingModule: ShoppingRoutingModule;

  beforeEach(() => {
    shoppingRoutingModule = new ShoppingRoutingModule();
  });

  it('should create an instance', () => {
    expect(shoppingRoutingModule).toBeTruthy();
  });
});
