import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      const keyboard = Markup.keyboard([
        Markup.button.contactRequest("📞 Отправить свой телефон"),
      ]);

      ctx.reply("Введите номер телефона:", keyboard);
    });

    this.bot.on("contact", async (ctx) => {
      const phone = ctx.message.contact.phone_number;
      const message = `Ваш телефон: ${phone}`;
      ctx.reply(message);
      ctx.reply("Спасибо!", Markup.removeKeyboard());
    });

    this.bot.on("text", async (ctx) => {
      const text = ctx.message.text;
      const session = ctx.session;

      if (!session.phone_number) {
        const phoneNumber = ctx.message.text;
        if (!this.phoneValidator(phoneNumber)) {
          ctx.reply("Неправильный телефон");
        }
        session.phone_number = phoneNumber;
        ctx.reply("Пожалуйста введите ваше имя!", Markup.removeKeyboard());
      } else if (!session.name) {
        session.name = text;
        ctx.reply("Пожалуйста введите вашу фамилию!");
      } else if (!session.surname) {
        session.surname = text;
        ctx.reply("Пожалуйста введите вашу организацию!");
      } else {
        session.organization = text;
        ctx.reply("Спасибо за регистрацию!");
      }
    });
  }

  phoneValidator(phoneNumber: string): boolean {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regex.test(phoneNumber);
  }
}
