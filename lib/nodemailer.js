import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anmolsharma18022005@gmail.com",
    pass: "gecp gtda ebud viox",
  },
});