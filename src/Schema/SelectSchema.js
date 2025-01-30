import { gql } from "@apollo/client";

export const SELECT_CATEGORY = gql`
query SelectCategory {
  selectCategory {
    _id
    category_name
  }
}
`;
