import {env} from "@strapi/utils";

export default ({env}) => ({
  // email: {
  //   config: {
  //     provider: "strapi-provider-email-resend",
  //     providerOptions: {
  //       apiKey: env("RESEND_API_KEY"), // Required
  //     },
  //     settings: {
  //       defaultFrom: env("RESEND_DEFAULT_EMAIL"),
  //       defaultReplyTo: env("RESEND_USER_EMAIL"),
  //     },
  //   },
  // },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'noreply.cseg@gmail.com',
          pass: env('GMAIL_APP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: 'noreply.cseg@gmail.com',
      },
    },
  },


  // 'custom-content-manager': {
  //   enabled: true,
  //   resolve: './src/plugins/shared2',
  // },
  // 'custom-content-manager2': {
  //   enabled: true,
  //   resolve: './src/plugins/custom-content-manager2',
  // },
  'custom-content-manager3': {
    enabled: true,
    resolve: './src/plugins/custom-content-manager3',
  },
  // 'cseg-applications': {
  //   enabled: true,
  //   resolve: './src/plugins/cseg-applications',
  // },
  'membership-list':{
    enabled: true,
    resolve: './src/plugins/membership-list',
  },
  'tester-plugin':{
    enabled: true,
    resolve: './src/plugins/tester-plugin',
  },
  'events-plugin':{
    enabled: true,
    resolve: './src/plugins/events-plugin'
  }
});
