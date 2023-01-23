import { gql } from 'graphql-request';
import { MEMBER_DETAIL_FRAGMENT } from '../fragments';

export const PORTFOLIO_DETAIL_FRAGMENT = gql`
  fragment PortfolioDetailFragment on portfolios {
    id
    name
    description
    portfolios_roles {
      guild_class {
        guild_class
      }
      member {
        ...MemberDetailFragment
      }
    }
    case_study
    repo_link
    result_link
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;

// {portfolio_roles: [{guild_class: {guild_class: "Warrior"}}]}

export const PORTFOLIO_LIST_QUERY = gql`
  query PortfolioList {
    portfolios {
      ...PortfolioDetailFragment
    }
  }
  ${PORTFOLIO_DETAIL_FRAGMENT}
`;

export const PORTFOLIO_DETAIL_QUERY = gql`
  query PortfolioDetail($slug: String!) {
    portfolios(where: { name: { _eq: $slug } }) {
      ...PortfolioDetailFragment
    }
  }
  ${PORTFOLIO_DETAIL_FRAGMENT}
`;
