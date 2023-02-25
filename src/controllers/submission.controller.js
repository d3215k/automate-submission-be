import puppeteer from "puppeteer";
import User from "../models/User";
import { Errors } from "../utils/errors";

let submissionController = {
  add: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user)
        return res.status(400).send({ error: Errors.NONEXISTENT_USER });

      const $photo = user.gender === "male" ? "male.jpg" : "female.jpg";
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      await page.goto("https://laravel-jetstream-livewire.test/register");
      await page.type("#name", user.name);
      await page.type("#email", user.email);
      await page.type("#password", "password");
      await page.type("#password_confirmation", "password");
      await page.click("form button");
      await page.goto("https://laravel-jetstream-livewire.test/user/profile");
      await page.waitForSelector("input[type=file]");
      const input = await page.$("input[type=file]");
      await input.uploadFile(`storage/photos/${$photo}`);
      await page.waitForNetworkIdle();
      if (user.gender === "male") {
        await page.click("#male");
      } else {
        await page.click("#female");
      }
      await page.select("#city", user.city);
      const inputName = await page.$("#name");
      await inputName.click({ clickCount: 3 });
      await inputName.type(user.name);
      await page.keyboard.press("Enter");

      await page.screenshot({
        path: `storage/images/${id}-result.png`,
        fullPage: true,
      });

      await browser.close();

      return res.status(200).json({
        name: user.name,
        result: `http://localhost:3000/images/${id}-result.png`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },
};

export default submissionController;
