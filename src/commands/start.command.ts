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

// import { Markup, Telegraf } from "telegraf";
// import { IBotContext } from "../context/context.interface";
// import { Command } from "./command.class";

// export class StartCommand extends Command {
//   constructor(public bot: Telegraf<IBotContext>) {
//     super(bot);
//   }

//   handle(): void {
//     this.bot.start((ctx) => {
//       ctx.reply(
//         "Welcome, please enter your name, surname, phone number, and organization",
//         Markup.inlineKeyboard([Markup.button.callback("😁", "some_action")])
//       );
//       ctx.scene.enter("registration");
//     });

//     this.bot.action("some_action", (ctx) => {
//       ctx.answerCbQuery("😁");
//     });

//     this.bot.on("text", (ctx) => {
//       const text = ctx.message.text;
//       const session = ctx.session;
//       if (!session.name) {
//         session.name = text;
//         ctx.reply("Please enter your surname");
//       } else if (!session.surname) {
//         session.surname = text;
//         ctx.reply("Please enter your phone number");
//       } else if (!session.phone) {
//         session.phone = text;
//         ctx.reply("Please enter your organization");
//       } else if (!session.organization) {
//         session.organization = text;
//         ctx.reply(`Welcome ${session.name} ${session.surname}, your phone number is ${session.phone}, and your organization is ${session.organization}`);
//         ctx.scene.leave();
//       }
//     });
//   }
// }