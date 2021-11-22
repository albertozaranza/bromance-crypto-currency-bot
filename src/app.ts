import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import './commands';

const token: string = process.env.BOT_TOKEN as string;

const bot: Telegraf<Context<Update>> = new Telegraf(token);

bot.help((ctx) => {
  ctx.reply('Digite /price {token} para saber o preço do token');
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
