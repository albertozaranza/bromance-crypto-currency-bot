import { bot } from './commands';

bot.help(ctx => {
  ctx.reply(
    `Digite /price {token} para saber o preço do token\nDigite /listtokens para listar todos os token`,
  );
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
