import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply("Добро пожаловать в телеграм бот!");
      ctx.reply("Ваше имя?");
      ctx.session.step = "name";
    });

    this.bot.on("text", (ctx) => {
      switch (ctx.session.step) {
        case "name":
          ctx.session.name = ctx.message.text;
          ctx.reply("Отлично!");
          ctx.reply("Ваша фамилия?");
          ctx.session.step = "surname";
          break;
        case "surname":
          ctx.session.surname = ctx.message.text;
          ctx.reply("Отлично!");
          ctx.reply("Ваша организация?");
          ctx.session.step = "organization";
          break;
        case "organization":
          ctx.session.organization = ctx.message.text;
          ctx.reply("Отлично!");
          const keyboard = Markup.keyboard([
            Markup.button.contactRequest("📞 Отправить свой телефон"),
          ]);
          ctx.reply("Ваш телефон?", keyboard);
          ctx.session.step = "phone";
          break;
        case "phone":
          if (this.phoneValidator(ctx.message.text)) {
            ctx.session.phone_number = ctx.message.text;
            ctx.reply("Отлично!", Markup.removeKeyboard());
          }
          break;
        default:
          ctx.reply("Неверный ввод!");
          ctx.session.step = "age";
          break;
      }
    });

    this.bot.on("contact", async (ctx) => {
      const phone = ctx.message.contact.phone_number;
      const message = `Ваш телефон: ${phone}`;
      ctx.reply(message);
      ctx.reply("Спасибо!", Markup.removeKeyboard());
    });
  }

  phoneValidator(phoneNumber: string): boolean {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regex.test(phoneNumber);
  }
}
