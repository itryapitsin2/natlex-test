import { GraphQLClient } from 'graphql-request';

export const url = '/graphql';

export const client = new GraphQLClient(url);
