/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request';

export const MEMBER_DETAIL_FRAGMENT = gql`
  fragment MemberDetailFragment on members {
    id
    name
    guild_class {
      guild_class
    }
  }
`;
