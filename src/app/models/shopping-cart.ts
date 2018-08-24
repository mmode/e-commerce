import { ShoppingCartItem } from './shopping-cart-item';
import { AppProduct } from './app-product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};

        for (const productId in itemsMap) {
            if (productId) {
                const item = itemsMap[productId];
                this.items.push(new ShoppingCartItem({ key: productId, ...item }));
            }
        }
    }

    get totalItemsCount() {
        let count = 0;
        for (const productId in this.itemsMap) {
            if (productId) count += this.itemsMap[productId].quantity;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (const productId in this.items) {
            if (productId) sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    getQuantity(product: AppProduct) {
      const item = this.itemsMap[product.key];
      return item ? item.quantity : 0;
    }
}
