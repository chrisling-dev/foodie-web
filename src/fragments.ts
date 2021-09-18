import { gql } from "@apollo/client";

export const ORDER_FRAGMENT = gql`
  fragment OrderParts on OrderWithStatus {
    id
    createdAt
    price
    status
    statusHistory {
      id
      createdAt
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
