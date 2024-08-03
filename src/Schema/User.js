import { gql } from "@apollo/client"

export const CREATE_USER = gql`
  mutation AddUser($employeeId: ID!, $role: String!) {
    addUser(employeeId: $employeeId, role: $role) {
      status
      message
    }
  }
`

export const GET_USER = gql`
  query GetUser {
    getUser {
      status
      message
      data {
        _id
        first_name
        last_name
        email
        role
        created_At
        image {
          src
          name
        }
      }
    }
  }
`

export const GET_ALL_USER = gql`
  query GetUsers {
    getUsers {
      _id
      first_name
      last_name
      email
      role
      created_at
      image {
        src
        name
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput, $role: AdminRoleEnum) {
    updateUser(_id: $id, input: $input, role: $role) {
      status
      message {
        messageKh
        messageEn
      }
      data {
        _id
        username
        email
        imageSrc
        lastLogin
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation RemoveUser($employeeId: ID!) {
    removeUser(employeeId: $employeeId) {
      status
      message
    }
  }
`

export const GET_USER_PAGINATION = gql`
  query GetAdminByCompanyPagination($page: Int, $limit: Int, $pagination: Boolean, $keyword: String) {
    getAdminByCompanyPagination(page: $page, limit: $limit, pagination: $pagination, keyword: $keyword) {
      data {
        _id
        username
        tell
        gender
        email
        imageSrc
        isAllow
        isUse
        lastLogin
        remark
      }
      paginator {
        slNo
        prev
        next
        perPage
        totalPosts
        totalPages
        currentPage
        hasPrevPage
        hasNextPage
        totalDocs
      }
    }
  }
`

export const UPDATE_USER_PASSWORD = gql` 
  mutation UpdateUserPassword($id: ID!, $role: LogoutRoleEnum!, $newPassword: String) {
    updateUserPassword(_id: $id, role: $role, newPassword: $newPassword) {
      status
      message {
        messageKh
        messageEn
      }
    }
  }
`