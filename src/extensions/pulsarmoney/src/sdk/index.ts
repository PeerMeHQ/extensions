import { createDateFromTimestampMiliseconds, adjustEndDateAccordingToDuration, convertTypeToString } from '../utils'
import { CREATE_PULSAR_PAYMENT } from './config'
import { PaymentReleaseInput, PaymentTypeAttributes } from './types'
import axios from 'axios'

const DEFAULT_FREQUENCY_SECONDS = 1

const getPulsarPaymentTransaction = async (
  sender: string,
  receivers: string[],
  cancellable: boolean,
  tokenId: string,
  name: string,
  type: PaymentTypeAttributes,
  releases: PaymentReleaseInput[]
) => {
  const createPulsarPaymentUrl = CREATE_PULSAR_PAYMENT

  const token = tokenId === 'EGLD' ? '' : tokenId

  try {
    const { data: createPulsarPaymentTransaction } = await axios.post(createPulsarPaymentUrl, {
      type: convertTypeToString(type),
      sender,
      receivers,
      cancellable,
      name,
      token,
      releases,
    })

    return {
      data: createPulsarPaymentTransaction,
      success: createPulsarPaymentTransaction !== undefined,
    }
  } catch (err) {
    return {
      success: false,
    }
  }
}

export const createVesting = async (
  sender: string,
  receivers: string[],
  totalAmount: number,
  cliffDateInMiliseconds: number,
  cliffAmount: number,
  endDateInMiliseconds: number,
  frequency: number,
  cancellable: boolean,
  identifier: string,
  name: string
): Promise<any> => {
  const cliffRelease: PaymentReleaseInput = {
    startDate: createDateFromTimestampMiliseconds(cliffDateInMiliseconds - 1000),
    endDate: createDateFromTimestampMiliseconds(cliffDateInMiliseconds),
    amount: cliffAmount,
    duration: DEFAULT_FREQUENCY_SECONDS,
  }

  const vestingRelease: PaymentReleaseInput = {
    startDate: createDateFromTimestampMiliseconds(cliffDateInMiliseconds),
    endDate: createDateFromTimestampMiliseconds(
      adjustEndDateAccordingToDuration(cliffDateInMiliseconds, endDateInMiliseconds, frequency * 1000)
    ),
    amount: totalAmount - cliffAmount,
    duration: frequency,
  }

  const { data: vestingQuery } = await getPulsarPaymentTransaction(
    sender,
    receivers,
    cancellable,
    identifier,
    name,
    PaymentTypeAttributes.Vesting,
    [cliffRelease, vestingRelease]
  )

  return vestingQuery
}
