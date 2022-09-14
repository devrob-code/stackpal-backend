export enum NetworkTypes {
  mtn = 'mtn',
  glo = 'glo',
  airtel = 'airtel',
  etisalat = 'etisalat',
}

export enum DataNetworkTypes {
  mtn = 'mtn',
  glo = 'glo',
  airtel = 'airtel',
  etisalat = 'etisalat',
  smile = 'smile',
  spectranet = 'spectranet',
}

export enum TVNetworkTypes {
  dstv = 'dstv',
  gotv = 'gotv',
  startimes = 'startimes',
  showmax = 'showmax',
}

export enum TVSubscriptionType {
  renew = 'renew',
}

export enum ElectricityNetworkTypes {
  ikejaElectric = 'ikeja-electric',
}

export enum ElectricityPaymentTypes {
  postpaid = 'postpaid',
  prepaid = 'prepaid',
}

export const ElectricityList = [
  { name: 'Ikeja Electricity', image: null, network: 'IKEDC' },
  { name: 'Eko Electricity', image: null, network: 'EKEDC' },
  { name: 'Kano Electricity', image: null, network: 'KEDCO' },
  { name: 'Port Harcourt Electricity', image: null, network: 'PHED' },
  { name: 'Jos Electricity', image: null, network: 'JED' },
  { name: 'Ibadan Electricity', image: null, network: 'IBEDC' },
  { name: 'Kaduna Electricity', image: null, network: 'KAEDCO' },
  { name: 'Abuja Electricity', image: null, network: 'AEDC' },
];
