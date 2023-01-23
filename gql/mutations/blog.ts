/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request';
import { BLOG_DETAIL_FRAGMENT } from '../queries/blogs';

export const BLOG_CREATE_MUTATION = gql`
  mutation BlogInsertMutation($blog: blogs_insert_input!) {
    insert_blogs_one(object: $blog) {
      ...BlogDetailFragment
    }
  }
  ${BLOG_DETAIL_FRAGMENT}
`;
