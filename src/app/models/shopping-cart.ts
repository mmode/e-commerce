import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        for (const productId in itemsMap) {
            if (productId) {
                const item = itemsMap[productId];
                this.items.push(new ShoppingCartItem(item.product, item.quantity));
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
}
