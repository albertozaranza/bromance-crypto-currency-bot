import { bot } from './commands';

bot.help((ctx) => {
  ctx.reply('Digite /price {token} para saber o preço do token');
  ctx.reply('Digite /list-tokens para listar todos os tokens');
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
