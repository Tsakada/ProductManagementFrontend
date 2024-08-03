import { gql } from "@apollo/client"

export const CREATE_AFFAIR = gql`
  mutation CreateAffair($input: AffairInput) {
    createAffair(input: $input) {
      status
      message {
        messageKh
        messageEn
      }
    }
  }
`

export const GET_AFFAIR = gql`
  query GetAffair($keyword: String!, $isUse: Boolean) {
    getAffair(keyword: $keyword, isUse: $isUse) {
      _id
      affairKhName
      affairName
      isUse
      remark
    }
  }
`

export const UPDATE_AFFAIR = gql`
  mutation UpdateAffair($id: ID!, $input: AffairInput) {
    updateAffair(_id: $id, input: $input) {
      status
      message {
        messageKh
        messageEn
      }
    }
  }
`

export const UPDATE_AFFAIR_IS_USE = gql`
  mutation UpdateAffairIsUse($id: ID!, $isUse: Boolean) {
    updateAffairIsUse(_id: $id, isUse: $isUse) {
      status
      message {
        messageKh
        messageEn
      }
    }
  }
`

export const DELETE_AFFAIR = gql`
  mutation DeleteAffair($id: ID!) {
    deleteAffair(_id: $id) {
      status
      message {
        messageKh
        messageEn
      }
    }
  }
`