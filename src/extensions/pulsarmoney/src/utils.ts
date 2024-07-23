import { PaymentTypeAttributes } from './sdk/types'
import { DropdownOption } from './types'

export const VestingMessages = {
  successMessage: 'Vesting creation successful.',
  processingMessage: 'Processing creating vesting...',
  errorMessage: 'An error has occured during creating a vesting.',
}

export const TEN_MINUTES = 10 * 60 * 1000

export const TIMEZONE_OFFSET_MILISECONDS = new Date().getTimezoneOffset() * 60 * 1000

export const currentTimestamp = Date.now()

const INITIAL_CLIFF_STR = new Date(currentTimestamp - TIMEZONE_OFFSET_MILISECONDS + TEN_MINUTES).toISOString()
export const INITIAL_CLIFF = INITIAL_CLIFF_STR.slice(0, INITIAL_CLIFF_STR.length - 8) // we cut the miliseconds part

const INITIAL_END_STR = new Date(currentTimestamp - TIMEZONE_OFFSET_MILISECONDS + TEN_MINUTES * 2).toISOString()
export const INITIAL_END = INITIAL_END_STR.slice(0, INITIAL_END_STR.length - 8) // we cut the miliseconds part

export const MAX_NAME_LENGTH = 30

const createOption = (seconds: number, text: string): DropdownOption => ({
  identifier: seconds,
  text: text,
})

export const options = [
  createOption(1, 'second'),
  createOption(1 * 60, 'minute'),
  createOption(1 * 60 * 60, 'hour'),
  createOption(1 * 60 * 60 * 24, 'day'),
  createOption(1 * 60 * 60 * 24 * 7, 'week'),
  createOption(1 * 60 * 60 * 24 * 30, 'month'),
]

export const createDateFromTimestampMiliseconds = (timestamp: number) => {
  return createUTCDateFromTimestampMiliseconds(timestamp)
}

export const createUTCDateFromTimestampMiliseconds = (timestamp: number) => {
  const date = new Date(timestamp)

  return date.toISOString()
}

export const convertTypeToString = (type: PaymentTypeAttributes) => {
  switch (type) {
    case PaymentTypeAttributes.Vault:
      return 'vault'
    case PaymentTypeAttributes.Payment:
      return 'payment'
    case PaymentTypeAttributes.Vesting:
      return 'vesting'
  }
}

export const adjustEndDateAccordingToDuration = (startDate: number, endDate: number, duration: number) => {
  const noOfIntervals = Math.round((endDate - startDate) / duration)

  return startDate + duration * noOfIntervals
}
