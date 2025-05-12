export const COUNTRIES_LIST_URL = 'https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,region';

export const getCountryFlagUrl = (countryName: string): string =>
  `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=flags`;
