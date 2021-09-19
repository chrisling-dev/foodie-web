import { gql } from "@apollo/client";

export const ORDER_FRAGMENT = gql`
  fragment OrderParts on OrderWithStatus {
    id
    createdAt
    price
    status
    items {
      id
      description
      name
      photo
      price
      quantity
      dish {
        id
        name
      }
    }
    restaurant {
      id
      name
      description
      backgroundImage
    }
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
  }
`;
