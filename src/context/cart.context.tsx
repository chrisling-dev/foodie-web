import { createContext, useState } from "react";
import { useMutation, useQuery, gql, useReactiveVar } from "@apollo/client";
import { toast } from "react-toastify";
import { addToCart, addToCartVariables } from "../__generated__/addToCart";
import { myCart, myCart_myCart_cart } from "../__generated__/myCart";
import { isLoggedInVar } from "../apollo";

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

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
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
  addingToCart: boolean;
  cart?: myCart_myCart_cart;
  error?: ErrorProps | null;
  loading: boolean;
  changeCart: (cartInput: CartInput) => void;
}
export const cartContext = createContext<IProps>({
  addingToCart: false,
  loading: false,
  changeCart: () => {},
});
const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<myCart_myCart_cart>();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery<myCart>(MY_CART_QUERY, {
    onCompleted({ myCart }) {
      if (myCart.cart) {
        setCart(myCart.cart);
      }
      if (myCart.error) {
        toast.error(myCart.error.message);
      }
    },
    skip: !isLoggedIn,
  });

  const [addToCartMutation, { data: addToCartData, loading: addingToCart }] =
    useMutation<addToCart, addToCartVariables>(ADD_TO_CART_MUTATION, {
      onCompleted({ addToCart }) {
        if (addToCart.cart) {
          setCart(addToCart.cart);
        }
      },
    });

  const changeCart = ({ id, quantity }: CartInput) => {
    addToCartMutation({
      variables: {
        input: {
          dishId: id,
          quantity,
        },
      },
    });
  };
  return (
    <cartContext.Provider
      value={{
        addingToCart,
        cart,
        error: data?.myCart.error || addToCartData?.addToCart.error,
        loading,
        changeCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
