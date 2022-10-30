import { BigNumber } from 'bignumber.js'

export const barToAtomic = (bar) => BigNumber.clone({ DECIMAL_PLACES: 6 })(bar).shiftedBy(6).toFixed(6)
export const atomicToBar = (atomic) => BigNumber.clone({ DECIMAL_PLACES: 6 })(atomic).shiftedBy(-6).toFixed(6)

export const stampToAtomic = (stamp) => BigNumber.clone({ DECIMAL_PLACES: 12 })(stamp).shiftedBy(12).toFixed(0)
export const atomicToStamp = (atomic) => BigNumber.clone({ DECIMAL_PLACES: 12 })(atomic).shiftedBy(-12).toFixed(12)