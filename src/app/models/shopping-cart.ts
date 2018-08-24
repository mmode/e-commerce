import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        for (const productId in itemsMap) {
            if (productId) this.items.push(itemsMap[productId]);
        }
    }

    get totalItemsCount() {
        let count = 0;
        for (const productId in this.itemsMap) {
            if (productId) count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}
