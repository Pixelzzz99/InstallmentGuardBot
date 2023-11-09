import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx.session);
      ctx.reply(
        "Welcome",
        Markup.inlineKeyboard([Markup.button.callback("😁", "some_action")])
      );
    });

    this.bot.action("some_action", (ctx) => {
      console.log(ctx.session);
      //   ctx.editMessageText("😁");
      ctx.answerCbQuery("😁");
    });
  }
}
