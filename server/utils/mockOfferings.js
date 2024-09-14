const mockOfferings = {
  VertexFiDid: [
    {
      metadata: {
        from: 'did:dht:enwguxo8uzqexq14xupe4o9ymxw3nzeb9uug5ijkj9rhfbf1oy5y',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945sesdss5xnzkzs0w64',
        createdAt: '2024-08-23T18:51:45.721Z',
      },
      data: {
        description: 'Exchange your Euros for US Dollars',
        payoutUnitsPerPayinUnit: '1.09',
        payout: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay out USD to',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'EUR',
          methods: [
            {
              kind: 'EUR_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'EUR Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'IBAN',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'EUR Bank Account Number',
                    description: 'Bank account number to pay in EUR',
                    type: 'string',
                  },
                  IBAN: {
                    title: 'EUR IBAN',
                    description: 'International Bank Account Number for the EUR account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZW53Z3V4bzh1enFleHExNHh1cGU0bzl5bXh3M256ZWI5dXVnNWlqa2o5cmhmYmYxb3k1eSMwIn0..Pv46W9ePaQMHDB9u3tvX4toPkJ9HGLgNRzYJR5RQL5l8JB3yfLmXijXU4TuBVuKUjRutPXLVruxOvYgeooxRCA',
    },
    {
      metadata: {
        from: 'did:dht:enwguxo8uzqexq14xupe4o9ymxw3nzeb9uug5ijkj9rhfbf1oy5y',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945wfx88rz21417mhz8r',
        createdAt: '2024-08-23T18:51:45.724Z',
      },
      data: {
        description: 'Exchange your Euros for USDC',
        payoutUnitsPerPayinUnit: '1.18',
        payout: {
          currencyCode: 'USDC',
          methods: [
            {
              kind: 'USDC_WALLET_ADDRESS',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USDC Required Payment Details',
                type: 'object',
                required: [
                  'address',
                ],
                additionalProperties: false,
                properties: {
                  address: {
                    title: 'USDC Wallet Address',
                    description: 'Wallet address to pay out USDC to',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'EUR',
          methods: [
            {
              kind: 'EUR_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'EUR Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'IBAN',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'EUR Bank Account Number',
                    description: 'Bank account number to pay in EUR',
                    type: 'string',
                  },
                  IBAN: {
                    title: 'EUR IBAN',
                    description: 'International Bank Account Number for the EUR account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZW53Z3V4bzh1enFleHExNHh1cGU0bzl5bXh3M256ZWI5dXVnNWlqa2o5cmhmYmYxb3k1eSMwIn0..iSf6L9rR8luG4U9tGjNF0wzqE5-n5KJDiDFn7Z47Wx7J7CuElKN0N_RIcrQJNuYAOKvuNQu_ABvVnHBfeMDMAw',
    },
    {
      metadata: {
        from: 'did:dht:enwguxo8uzqexq14xupe4o9ymxw3nzeb9uug5ijkj9rhfbf1oy5y',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945yeat8m92mzbz0qqah',
        createdAt: '2024-08-23T18:51:45.726Z',
      },
      data: {
        description: 'Exchange your US Dollars for Euros',
        payoutUnitsPerPayinUnit: '0.92',
        payout: {
          currencyCode: 'EUR',
          methods: [
            {
              kind: 'EUR_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'EUR Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'IBAN',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'EUR Bank Account Number',
                    description: 'Bank account number to pay out EUR to',
                    type: 'string',
                  },
                  IBAN: {
                    title: 'EUR IBAN',
                    description: 'International Bank Account Number for the EUR account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay in USD',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZW53Z3V4bzh1enFleHExNHh1cGU0bzl5bXh3M256ZWI5dXVnNWlqa2o5cmhmYmYxb3k1eSMwIn0..aru8EZrTKQ5oUYwm_7Wq6sjcFZRtDfr-6pyevkDM-AqLRxTpOVnlI3w37emUFQlqRVrXpPL1wnOGXjRU05GKAA',
    },
    {
      metadata: {
        from: 'did:dht:enwguxo8uzqexq14xupe4o9ymxw3nzeb9uug5ijkj9rhfbf1oy5y',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j6099460en1sesecavr328j2',
        createdAt: '2024-08-23T18:51:45.728Z',
      },
      data: {
        description: 'Exchange your Euros for British Pounds',
        payoutUnitsPerPayinUnit: '0.86',
        payout: {
          currencyCode: 'GBP',
          methods: [
            {
              kind: 'GBP_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'GBP Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'sortCode',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'GBP Bank Account Number',
                    description: 'Bank account number to pay out GBP to',
                    type: 'string',
                  },
                  sortCode: {
                    title: 'GBP Sort Code',
                    description: 'Bank sort code for the GBP account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'EUR',
          methods: [
            {
              kind: 'EUR_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'EUR Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'IBAN',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'EUR Bank Account Number',
                    description: 'Bank account number to pay in EUR',
                    type: 'string',
                  },
                  IBAN: {
                    title: 'EUR IBAN',
                    description: 'International Bank Account Number for the EUR account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZW53Z3V4bzh1enFleHExNHh1cGU0bzl5bXh3M256ZWI5dXVnNWlqa2o5cmhmYmYxb3k1eSMwIn0..VnLYRa8AFelAFciDj0JpgaOnP5IrojUcy7sl6wAN2bjt7cgpk-KcJANOfWBeWVcS-MP_nQ-VDz1JKMavvz-HDw',
    },
  ],
  TitaniumFiDid: [
    {
      metadata: {
        from: 'did:dht:ozn5c51ruo7z63u1h748ug7rw5p1mq3853ytrd5gatu9a8mm8f1o',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945te1evjf9nbcvbx3ah',
        createdAt: '2024-08-23T18:51:45.722Z',
      },
      data: {
        description: 'Exchange your US Dollars for Australian Dollars',
        payoutUnitsPerPayinUnit: '1.30',
        payout: {
          currencyCode: 'AUD',
          methods: [
            {
              kind: 'AUD_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'AUD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'BSB',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'AUD Bank Account Number',
                    description: 'Bank account number to pay out AUD to',
                    type: 'string',
                  },
                  BSB: {
                    title: 'AUD BSB',
                    description: 'Bank State Branch (BSB) number for the AUD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay in USD',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6b3puNWM1MXJ1bzd6NjN1MWg3NDh1ZzdydzVwMW1xMzg1M3l0cmQ1Z2F0dTlhOG1tOGYxbyMwIn0..ynVuHYsz-BnKTSmRrmqY7swAPADWoHitKc3Ox04iP0l3WQhY6rT7-54-SmyNffNCMU6cmiU1c1owti8gbiC8Dw',
    },
    {
      metadata: {
        from: 'did:dht:ozn5c51ruo7z63u1h748ug7rw5p1mq3853ytrd5gatu9a8mm8f1o',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945wfx88rz21455b70ss',
        createdAt: '2024-08-23T18:51:45.725Z',
      },
      data: {
        description: 'Exchange your US Dollars for British Pounds',
        payoutUnitsPerPayinUnit: '0.78',
        payout: {
          currencyCode: 'GBP',
          methods: [
            {
              kind: 'GBP_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'GBP Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'sortCode',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'GBP Bank Account Number',
                    description: 'Bank account number to pay out GBP to',
                    type: 'string',
                  },
                  sortCode: {
                    title: 'GBP Sort Code',
                    description: 'Bank sort code for the GBP account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay in USD',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6b3puNWM1MXJ1bzd6NjN1MWg3NDh1ZzdydzVwMW1xMzg1M3l0cmQ1Z2F0dTlhOG1tOGYxbyMwIn0..QS2hPRr-UqNJ6toLbVy3BtXHWjgTFb0to2Ubl5W45mKbbbSgnZdUI-6xc7bbZpDTQSa-jKYOLSyGZD6OworVCg',
    },
    {
      metadata: {
        from: 'did:dht:ozn5c51ruo7z63u1h748ug7rw5p1mq3853ytrd5gatu9a8mm8f1o',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945yeat8m92mzdxrwmz3',
        createdAt: '2024-08-23T18:51:45.726Z',
      },
      data: {
        description: 'Exchange your US Dollars for Kenyan Shilling',
        payoutUnitsPerPayinUnit: '129.94',
        payout: {
          currencyCode: 'KES',
          methods: [
            {
              kind: 'KES_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'KES Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'KES Bank Account Number',
                    description: 'Bank account number to pay out KES to',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay in USD',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6b3puNWM1MXJ1bzd6NjN1MWg3NDh1ZzdydzVwMW1xMzg1M3l0cmQ1Z2F0dTlhOG1tOGYxbyMwIn0..VMNhCye2eSVlXE32QinjeCF2uJCVGy1eIQ6C_TIfmgXe3cKYZIopJ3WA5ZVbI5eMzj8Df3b-RVNHpR0-_ksUCg',
    },
    {
      metadata: {
        from: 'did:dht:ozn5c51ruo7z63u1h748ug7rw5p1mq3853ytrd5gatu9a8mm8f1o',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j6099460en1sesecaw90hcbx',
        createdAt: '2024-08-23T18:51:45.728Z',
      },
      data: {
        description: 'Exchange your US Dollars for Mexican Pesos',
        payoutUnitsPerPayinUnit: '20.00',
        payout: {
          currencyCode: 'MXN',
          methods: [
            {
              kind: 'MXN_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'MXN Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'CLABE',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'MXN Bank Account Number',
                    description: 'Bank account number to pay out MXN to',
                    type: 'string',
                  },
                  CLABE: {
                    title: 'MXN CLABE',
                    description: 'Clave Bancaria Estandarizada (CLABE) for the MXN account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay in USD',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6b3puNWM1MXJ1bzd6NjN1MWg3NDh1ZzdydzVwMW1xMzg1M3l0cmQ1Z2F0dTlhOG1tOGYxbyMwIn0..LDEVM8hxFszpvaUjW48EVQB6tXuT76_uFFY9hLSftWUvS-my3k7ubk4eU0BIt4yeW2M5SBZ72PuBuXe3skvpDw',
    },
  ],
  AquaFiDid: [
    {
      metadata: {
        from: 'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945hf088ftk6vgke40y3',
        createdAt: '2024-08-23T18:51:45.714Z',
      },
      data: {
        description: 'Exchange your Ghanaian Cedis for USDC',
        payoutUnitsPerPayinUnit: '0.10',
        payout: {
          currencyCode: 'USDC',
          methods: [
            {
              kind: 'USDC_WALLET_ADDRESS',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USDC Required Payment Details',
                type: 'object',
                required: [
                  'address',
                ],
                additionalProperties: false,
                properties: {
                  address: {
                    title: 'USDC Wallet Address',
                    description: 'Wallet address to pay out USDC to',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'GHS',
          methods: [
            {
              kind: 'GHS_BANK_TRANSFER',
              requiredPaymentDetails: {

              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6M2ZrejVzc2Z4YnJpd2tzM2l5NW53eXMzcTVreXg2NGV0dHA5d2ZuMXlmZWtma2lndWoxeSMwIn0..OGRjggiDJlZc0SGdBVD2BeLuolMTQNuRpVGAvO3R20Y11nv5O-I-4lA92SVlfgfSTnsubzLrrG2GeSssJn4LCw',
    },
    {
      metadata: {
        from: 'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945vfm49rf5zef5sp5rr',
        createdAt: '2024-08-23T18:51:45.723Z',
      },
      data: {
        description: 'Exchange your Nigerian Naira for Kenyan Shilling',
        payoutUnitsPerPayinUnit: '0.30',
        payout: {
          currencyCode: 'KES',
          methods: [
            {
              kind: 'KES_BANK_TRANSFER',
              estimatedSettlementTime: 86400,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'KES Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'KES Bank Account Number',
                    description: 'Bank account number to pay out KES to',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'NGN',
          methods: [
            {
              kind: 'NGN_BANK_TRANSFER',
              requiredPaymentDetails: {

              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6M2ZrejVzc2Z4YnJpd2tzM2l5NW53eXMzcTVreXg2NGV0dHA5d2ZuMXlmZWtma2lndWoxeSMwIn0..AFd9_PiUTlwTNtJe7S58Xj-KynxRnAe8rkk_BXqOkP0iQr7str2KeCfMZnTBGyMfxNTTX94qk9UILUu4GxStDA',
    },
    {
      metadata: {
        from: 'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945xe18tc33hfbvpx4zq',
        createdAt: '2024-08-23T18:51:45.725Z',
      },
      data: {
        description: 'Exchange your Kenyan Shilling for US Dollars',
        payoutUnitsPerPayinUnit: '0.007',
        payout: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay out USD to',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'KES',
          methods: [
            {
              kind: 'KES_BANK_TRANSFER',
              requiredPaymentDetails: {

              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6M2ZrejVzc2Z4YnJpd2tzM2l5NW53eXMzcTVreXg2NGV0dHA5d2ZuMXlmZWtma2lndWoxeSMwIn0..IZ9gWZw1H0vgvJNFbmAoxflExbbW29RhReQ8JmHsNtSvuCvDDijJOHIs5qtzW9xG_jvYVPUYXCYer9F7VG3ODg',
    },
    {
      metadata: {
        from: 'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945yeat8m92mzgc12nk0',
        createdAt: '2024-08-23T18:51:45.726Z',
      },
      data: {
        description: 'Exchange your US Dollars for Kenyan Shilling',
        payoutUnitsPerPayinUnit: '140.00',
        payout: {
          currencyCode: 'KES',
          methods: [
            {
              kind: 'KES_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'KES Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'KES Bank Account Number',
                    description: 'Bank account number to pay out KES to',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay in USD',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6M2ZrejVzc2Z4YnJpd2tzM2l5NW53eXMzcTVreXg2NGV0dHA5d2ZuMXlmZWtma2lndWoxeSMwIn0..5vG4pVZlHGF8UH6LbZhkYXbV59QgZpNc7UTarH3OCj5ihP50YD9X4sXUg4_8shsfDfTxqFL_w7qu3Ge3r9iTDg',
    },
  ],
  FlowBackFiDid: [
    {
      metadata: {
        from: 'did:dht:zkp5gbsqgzn69b3y5dtt5nnpjtdq6sxyukpzo68npsf79bmtb9zy',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945qegjb9w98wh67vv9a',
        createdAt: '2024-08-23T18:51:45.719Z',
      },
      data: {
        description: 'Exchange your US Dollars for Euros',
        payoutUnitsPerPayinUnit: '0.85',
        payout: {
          currencyCode: 'EUR',
          methods: [
            {
              kind: 'EUR_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'EUR Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'IBAN',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'EUR Bank Account Number',
                    description: 'Bank account number to pay out EUR to',
                    type: 'string',
                  },
                  IBAN: {
                    title: 'EUR IBAN',
                    description: 'International Bank Account Number for the EUR account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay in USD',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6emtwNWdic3Fnem42OWIzeTVkdHQ1bm5wanRkcTZzeHl1a3B6bzY4bnBzZjc5Ym10Yjl6eSMwIn0..rMoQJPXEH18kG-QFX0YEOYfW7A7zzsNC8tCNM4ERNZirxOJ-GszkCEGD5E9Poe4afeHJ163eMAvOq0Wlio3kBA',
    },
    {
      metadata: {
        from: 'did:dht:zkp5gbsqgzn69b3y5dtt5nnpjtdq6sxyukpzo68npsf79bmtb9zy',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945wfx88rz213zq9jgrk',
        createdAt: '2024-08-23T18:51:45.724Z',
      },
      data: {
        description: 'Exchange your Euros for US Dollars',
        payoutUnitsPerPayinUnit: '1.17',
        payout: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay out USD to',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'EUR',
          methods: [
            {
              kind: 'EUR_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'EUR Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'IBAN',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'EUR Bank Account Number',
                    description: 'Bank account number to pay in EUR',
                    type: 'string',
                  },
                  IBAN: {
                    title: 'EUR IBAN',
                    description: 'International Bank Account Number for the EUR account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6emtwNWdic3Fnem42OWIzeTVkdHQ1bm5wanRkcTZzeHl1a3B6bzY4bnBzZjc5Ym10Yjl6eSMwIn0..b_95LJ3F7EUyEmXeOf-uKRYOPGTrvCSK9srqGO7tFChuZ2_sPs6OPn5eAwGIETtSdc8M1YcoOw7VCggwxzchDQ',
    },
    {
      metadata: {
        from: 'did:dht:zkp5gbsqgzn69b3y5dtt5nnpjtdq6sxyukpzo68npsf79bmtb9zy',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945xe18tc33hfkvgfvg7',
        createdAt: '2024-08-23T18:51:45.726Z',
      },
      data: {
        description: 'Exchange your US Dollars for British Pounds',
        payoutUnitsPerPayinUnit: '0.75',
        payout: {
          currencyCode: 'GBP',
          methods: [
            {
              kind: 'GBP_BANK_TRANSFER',
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'GBP Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'sortCode',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'GBP Bank Account Number',
                    description: 'Bank account number to pay out GBP to',
                    type: 'string',
                  },
                  sortCode: {
                    title: 'GBP Sort Code',
                    description: 'Bank sort code for the GBP account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay in USD',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6emtwNWdic3Fnem42OWIzeTVkdHQ1bm5wanRkcTZzeHl1a3B6bzY4bnBzZjc5Ym10Yjl6eSMwIn0..b3gU3Hsd15k205UQRj7hoAEAJ1bKzgaU0kQBedgptbpcJ87UzCrncTEYuOgGqnplYuPuzVc4-VvMpCAg4Uq2BA',
    },
    {
      metadata: {
        from: 'did:dht:zkp5gbsqgzn69b3y5dtt5nnpjtdq6sxyukpzo68npsf79bmtb9zy',
        protocol: '1.0',
        kind: 'offering',
        id: 'offering_01j609945zeb1bq5bph7gbx8f9',
        createdAt: '2024-08-23T18:51:45.727Z',
      },
      data: {
        description: 'Exchange your US Dollars for Bitcoin',
        payoutUnitsPerPayinUnit: '0.000033',
        payout: {
          currencyCode: 'BTC',
          methods: [
            {
              kind: 'BTC_WALLET_ADDRESS',
              estimatedSettlementTime: 3600,
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'BTC Required Payment Details',
                type: 'object',
                required: [
                  'address',
                ],
                additionalProperties: false,
                properties: {
                  address: {
                    title: 'BTC Wallet Address',
                    description: 'Wallet address to pay out BTC to',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: 'USD',
          methods: [
            {
              kind: 'USD_BANK_TRANSFER',
              requiredPaymentDetails: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'USD Required Payment Details',
                type: 'object',
                required: [
                  'accountNumber',
                  'routingNumber',
                ],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: 'USD Bank Account Number',
                    description: 'Bank account number to pay in USD',
                    type: 'string',
                  },
                  routingNumber: {
                    title: 'USD Bank Routing Number',
                    description: 'Bank routing number for the USD account',
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
          format: {
            jwt_vc: {
              alg: [
                'ES256K',
                'EdDSA',
              ],
            },
          },
          input_descriptors: [
            {
              id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
              constraints: {
                fields: [
                  {
                    path: [
                      '$.vc.credentialSchema.id',
                      '$.credentialSchema.id',
                    ],
                    filter: {
                      type: 'string',
                      const: 'https://vc.schemas.host/kcc.schema.json',
                    },
                  },
                  {
                    path: [
                      '$.vc.issuer',
                      '$.issuer',
                    ],
                    filter: {
                      type: 'string',
                      const: 'did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature: 'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6emtwNWdic3Fnem42OWIzeTVkdHQ1bm5wanRkcTZzeHl1a3B6bzY4bnBzZjc5Ym10Yjl6eSMwIn0..q_0PYYRgkxrZJr76KJtIEGVCn2WHp8lVqi-odkqWmYtyny2g3XK_2EnQ3lY3pjRaAgyaXu1VbYBw0RNsVPOyAw',
    },
  ],
};

export default mockOfferings;
