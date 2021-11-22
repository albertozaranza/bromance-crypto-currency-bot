import axios from 'axios';

const cacheToken: any = {};

export default async function getTokens(tokenName: string): Promise<any> {
  if (cacheToken[tokenName]) {
    return cacheToken[tokenName];
  }
  try {
    const token = await axios.get(
      `${process.env.API_COINMARKETCAP}/cryptocurrency/quotes/latest?symbol=${tokenName}`
    );
    cacheToken[tokenName] = token.data.data[tokenName].platform.token_address;
    return cacheToken[tokenName];
  } catch (error) {
    throw 'Aconteceu um erro ao obter os dados da API';
  }
}
