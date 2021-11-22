import { Context, Markup, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import axios from 'axios';
import getTokens from './services/getTokens';

const token: string = process.env.BOT_TOKEN as string;

export const bot: Telegraf<Context<Update>> = new Telegraf(token);

type Token = {
  data: {
    name: string;
    symbol: string;
    price: string;
    price_BNB: string;
  };
};

bot.command('price', async ctx => {
  const tokenName = ctx.message.text.split(' ')[1].toUpperCase() || null;

  if (!tokenName) {
    return ctx.reply('Por favor, especifique o nome do token');
  }

  try {
    const url = process.env.API_PANCAKESWAP || '';
    const token = await getTokens(tokenName);

    const response = await axios.get<Token>(`${url}/tokens/${token}`);

    ctx.replyWithMarkdown(
      `O preço do *${tokenName}* é: $` +
        parseFloat(response.data.data.price).toFixed(2),
    );
  } catch (error) {
    return ctx.reply('Aconteceu um erro ao obter os dados da API (pancakeswap)');
  }
});
