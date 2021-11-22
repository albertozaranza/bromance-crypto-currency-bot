import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import axios from 'axios';
import getTokens from './services/getTokens';

const tokenBot: string = process.env.BOT_TOKEN as string;

export const bot: Telegraf<Context<Update>> = new Telegraf(tokenBot);

type Token = {
  data: {
    name: string;
    symbol: string;
    price: string;
    price_BNB: string;
  };
};

bot.command('price', async ctx => {
<<<<<<< HEAD
  const tokenName = ctx.message.text.split(' ')[1]?.toUpperCase() || null;
=======
  const tokenName = ctx.message.text.split(' ')[1] || null;
>>>>>>> 399ff63 (added .toUpperCase() inside trycatch)

  if (!tokenName) {
    return ctx.reply('Por favor, especifique o nome do token');
  }

  try {
    tokenName.toUpperCase();

    const url = process.env.API_PANCAKESWAP || '';
    const token = await getTokens(tokenName);

    const response = await axios.get<Token>(`${url}/tokens/${token}`);

    return ctx.replyWithMarkdown(
      `O preço do *${tokenName}* é: $${parseFloat(
        response.data.data.price,
      ).toFixed(2)}`,
    );
  } catch (error) {
    return ctx.reply(
      'Aconteceu um erro ao obter os dados da API (pancakeswap)',
    );
  }
});
