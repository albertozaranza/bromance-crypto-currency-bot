import { bot } from './commands';

bot.help((ctx) => {
  ctx.reply('Digite /price {token} para saber o preço do token');
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
