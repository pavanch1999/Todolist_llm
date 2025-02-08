declare const HttpRequestQuery: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["payload"];
        readonly properties: {
            readonly payload: {
                readonly type: "string";
                readonly description: "This is the input that you'll be sending to your LLM pipeline";
            };
            readonly custom_variables: {
                readonly type: "object";
                readonly description: "If you have custom input parameters defined, you should include it here";
                readonly properties: {
                    readonly custom_input: {
                        readonly type: "string";
                        readonly description: "The `{custom_input}` will be defined by you via the Vext platform, and there could be multiple instances of such inputs.";
                    };
                };
            };
            readonly long_polling: {
                readonly type: "boolean";
                readonly description: "If your pipeline includes several models and you're facing timeout issues, enabling this option will generate a 'request_id' for you.";
            };
            readonly request_id: {
                readonly type: "string";
                readonly description: "Include the long_polling request ID in the body to receive updates until the final result is delivered.";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly endpoint_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The unique identifier of your HTTP request endpoint. Find this ID via your project > API Access";
                };
                readonly channel_token: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Mandatory for message retrieval and memory use. This can be user id or session id from your app, or a fixed string.";
                };
            };
            readonly required: readonly ["endpoint_id", "channel_token"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly text: {
                    readonly type: "string";
                    readonly examples: readonly ["According to the information provided, the IT person in the organization is Emily Turner, who holds the role of Systems Analyst. Her email address is emily.turner@company.com."];
                };
                readonly citation: {
                    readonly type: "object";
                    readonly properties: {
                        readonly sources: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly source_id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["{uuid}"];
                                    };
                                    readonly source_url: {
                                        readonly type: "string";
                                        readonly examples: readonly ["file url"];
                                    };
                                    readonly source_name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["file name"];
                                    };
                                    readonly source_chunk: {
                                        readonly type: "string";
                                        readonly examples: readonly ["file chunk"];
                                    };
                                    readonly vector_ids: {
                                        readonly type: "string";
                                        readonly examples: readonly ["{uuid}"];
                                    };
                                };
                            };
                        };
                        readonly source_deduplicate: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly source_id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["{uuid}"];
                                    };
                                    readonly source_url: {
                                        readonly type: "string";
                                        readonly examples: readonly ["file url"];
                                    };
                                    readonly source_name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["file name"];
                                    };
                                };
                            };
                        };
                        readonly score: {
                            readonly type: "number";
                            readonly default: 0;
                            readonly examples: readonly [0.8];
                        };
                    };
                };
                readonly custom_output_1: {
                    readonly type: "string";
                    readonly examples: readonly ["Custom output you defined in the output component"];
                };
                readonly custom_output_2: {
                    readonly type: "string";
                    readonly examples: readonly ["Custom output you defined in the output component"];
                };
                readonly request_id: {
                    readonly type: "string";
                    readonly examples: readonly ["{uuid}"];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "202": {
            readonly type: "object";
            readonly properties: {
                readonly text: {
                    readonly type: "string";
                    readonly examples: readonly ["processing on action number #X"];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly text: {
                    readonly type: "string";
                    readonly examples: readonly ["result of request_id: xxxxxxxx has expired"];
                };
                readonly request_id: {
                    readonly type: "string";
                    readonly examples: readonly ["xxxxxxxx"];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { HttpRequestQuery };
