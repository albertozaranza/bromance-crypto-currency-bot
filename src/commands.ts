import { Context, Markup, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import axios from 'axios';

import { TOKENS } from './tokens';

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

bot.command('price', async (ctx) => {
  const token = TOKENS[ctx.message.text.toLowerCase() as keyof typeof TOKENS];

  if (!token) {
    return ctx.reply('O token o não existe');
  }

  const response = await axios.get<Token>(process.env.API_PANCAKESWAP + token);

  ctx.reply(
    `O preço do ${token} é: ` + parseFloat(response.data.data.price).toFixed(2)
  );
});

bot.command('listtokens', (ctx) => {
  ctx.reply('**Os tokens disponível são:**\n' + Object.keys(TOKENS).join('\n'));
});
