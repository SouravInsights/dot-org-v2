import { gql } from 'graphql-request';

export const BLOG_DETAIL_FRAGMENT = gql`
  fragment BlogDetailFragment on blogs {
    id
    title
    slug
    description
    author
    tags
    image
    created_at
    content
  }
`;

export const BLOG_LIST_QUERY = gql`
  query BlogList {
    blogs {
      ...BlogDetailFragment
    }
  }
  ${BLOG_DETAIL_FRAGMENT}
`;

export const BLOG_DETAIL_QUERY = gql`
  query BlogDetail($slug: String!) {
    blogs(where: { slug: { _eq: $slug } }) {
      ...BlogDetailFragment
    }
  }
  ${BLOG_DETAIL_FRAGMENT}
`;
