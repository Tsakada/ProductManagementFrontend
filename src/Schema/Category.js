import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
mutation CreateCategory($input: CategoryInput) {
  createCategory(input: $input) {
    status
    message
  }
}
`;
export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($updateCategoryId: ID, $input: CategoryInput) {
  updateCategory(id: $updateCategoryId, input: $input) {
    status
    message
  }
}
`;


export const GET_CATEGORY = gql`
query GetCategory {
  getCategory {
    _id
    category_name
    remark
  }
}
`;


export const DELETE_CATEGORY = gql`
mutation DeleteCategory($deleteCategoryId: ID) {
  deleteCategory(id: $deleteCategoryId) {
    status
    message
  }
}
`;