import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { createContext, useState } from "react";
import { myCart, myCart_myCart_cart } from "../__generated__/myCart";

const MY_CART_QUERY = gql`
  query myCart {
    myCart {
      ok
      error {
        code
        message
      }
      cart {
        restaurant {
          id
          name
          description
          backgroundImage
        }
        cartItems {
          id
          quantity
          dish {
            id
            name
            price
            photo
          }
        }
        totalPrice
      }
    }
  }
`;
interface CartInput {
  quantity: number;
  id: number;
}

interface ErrorProps {
  code: string;
  message: string;
}

interface IProps {
  cart?: myCart_myCart_cart;
  error?: ErrorProps | null;
  loading: boolean;
  changeCart: (cartInput: CartInput) => void;
}
export const cartContext = createContext<IProps>({
  loading: true,
  changeCart: () => {},
});
const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<myCart_myCart_cart>();
  const { data, loading } = useQuery<myCart>(MY_CART_QUERY, {
    onCompleted({ myCart }) {
      if (myCart.cart) {
        setCart(myCart.cart);
      }
    },
  });

  const changeCart = ({ id, quantity }: CartInput) => {
    console.log(id, quantity);
  };
  return (
    <cartContext.Provider
      value={{
        cart,
        error: data?.myCart.error,
        loading,
        changeCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
