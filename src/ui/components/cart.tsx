import { cn } from "~/lib/cn";

import { CartClient } from "./cart-client";

export interface CartItem {
  category: string;
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  className?: string;
}

const mockCart: CartItem[] = [
  {
    category: "Birthday",
    id: "1",
    image: "/plaza/home/giftcards/gift-card1.png",
    name: "Digital Gift Card - ₹500",
    price: 500,
    quantity: 1,
  },
  {
    category: "Anniversary",
    id: "2",
    image: "/plaza/home/giftcards/gift-card2.png",
    name: "Anniversary Gift Card - ₹1000",
    price: 1000,
    quantity: 1,
  },
];

export function Cart({ className }: CartProps) {
  return (
    <div className={cn("relative", className)}>
      {/* // TODO: Fetch cart from e.g. LocalStorage and/or database */}
      <CartClient className={cn("", className)} mockCart={mockCart} />
    </div>
  );
}
