import { gql } from '@apollo/client'

export const GraphQl = {
  Queries: {
    xExchangeSwap: gql`
      query ($amountIn: String, $amountOut: String, $tokenInID: String!, $tokenOutID: String!, $tolerance: Float!) {
        swap(amountIn: $amountIn, amountOut: $amountOut, tokenInID: $tokenInID, tokenOutID: $tokenOutID, tolerance: $tolerance) {
          amountIn
          amountOut
          tokenOutID
        }
      }
    `,
  },
}
