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

bot.command('price', async ctx => {
  const tokenName = ctx.message.text.split(' ')[1].toLowerCase();
  const token = TOKENS[tokenName as keyof typeof TOKENS];

  if (!token) {
    return ctx.reply('O token não existe');
  }

  const response = await axios.get<Token>(process.env.API_PANCAKESWAP + token);

  ctx.replyWithMarkdown(
    `O preço do *${tokenName}* é: $` +
      parseFloat(response.data.data.price).toFixed(2),
  );
});

bot.command('listtokens', ctx => {
  ctx.replyWithMarkdown(
    '*Os tokens disponível são:*\n\n' +
      Object.keys(TOKENS)
        .map(token => `- ${token}`)
        .join('\n'),
  );
});
