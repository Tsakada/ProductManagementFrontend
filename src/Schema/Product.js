import { gql } from "@apollo/client";

export const CREATE_AFFAIR = gql`
  mutation CreateProduct($input: ProductInput) {
    createProduct(input: $input) {
      status
      message
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct {
    getProduct {
      _id
      product_name
      image
      price
      type_cash
    }
  }
`;
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput) {
    createProduct(input: $input) {
      status
      message
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($updateProductId: ID, $input: ProductInput) {
    updateProduct(id: $updateProductId, input: $input) {
      status
      message
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: ID) {
    deleteProduct(id: $deleteProductId) {
      status
      message
    }
  }
`;
