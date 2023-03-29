export const enum PaymentTypeAttributes {
  Vault = 0,
  Payment = 1,
  Vesting = 2,
}

export declare type PaymentReleaseInput = {
  startDate: string // isoString
  endDate: string // isoString
  duration: number
  amount: number
}
