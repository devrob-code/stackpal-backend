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
  ekoElectric = 'eko-electric',
  kanoElectric = 'kano-electric',
  portharcourtElectric = 'portharcourt-electric',
  josElectric = 'jos-electric',
  ibadanElectric = 'ibadan-electric',
  kadunaElectric = 'kaduna-electric',
  abujaElectric = 'abuja-electric',
}

export enum ElectricityPaymentTypes {
  postpaid = 'postpaid',
  prepaid = 'prepaid',
}

export const ElectricityList = [
  { name: 'Ikeja Electricity', image: null, ACRN: 'IKEDC', network: 'ikeja-electric' },
  { name: 'Eko Electricity', image: null, ACRN: 'EKEDC', network: 'eko-electric' },
  { name: 'Kano Electricity', image: null, ACRN: 'KEDCO', network: 'kano-electric' },
  { name: 'Port Harcourt Electricity', image: null, ACRN: 'PHED', network: 'portharcourt-electric' },
  { name: 'Jos Electricity', image: null, ACRN: 'JED', network: 'jos-electric' },
  { name: 'Ibadan Electricity', image: null, ACRN: 'IBEDC', network: 'ibadan-electric' },
  { name: 'Kaduna Electricity', image: null, ACRN: 'KAEDCO', network: ' kaduna-electric' },
  { name: 'Abuja Electricity', image: null, ACRN: 'AEDC', network: 'abuja-electric' },
];

export enum EducationTypes {
  waec = 'waec',
  jamb = 'jamb',
}
