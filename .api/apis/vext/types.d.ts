import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export type HttpRequestQueryBodyParam = FromSchema<typeof schemas.HttpRequestQuery.body>;
export type HttpRequestQueryMetadataParam = FromSchema<typeof schemas.HttpRequestQuery.metadata>;
export type HttpRequestQueryResponse200 = FromSchema<typeof schemas.HttpRequestQuery.response['200']>;
export type HttpRequestQueryResponse202 = FromSchema<typeof schemas.HttpRequestQuery.response['202']>;
export type HttpRequestQueryResponse400 = FromSchema<typeof schemas.HttpRequestQuery.response['400']>;
