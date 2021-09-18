import { gql } from "@apollo/client";

export const ORDER_FRAGMENT = gql`
  fragment OrderParts on OrderWithStatus {
    id
    price
    status
    statusHistory {
      id
      status
      user {
        id
        name
        role
      }
    }
    restaurant {
      id
      name
      description
      backgroundImage
    }
    items {
      id
      name
      quantity
      price
      photo
      dish {
        id
        name
      }
    }
  }
`;
