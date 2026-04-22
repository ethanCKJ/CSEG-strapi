export default ({env}) => ({
  email: {
    config: {
      provider: '@strapi/provider-email-nodemailer',
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

  'custom-content-manager3': {
    enabled: true,
    resolve: './src/plugins/custom-content-manager3',
  },

  'membership-list':{
    enabled: true,
    resolve: './src/plugins/membership-list',
  },
  'tester-plugin':{
    enabled: false,
    resolve: './src/plugins/tester-plugin',
  },
  'shared':{
    enabled: false,
  },
  'events-plugin':{
    enabled: true,
    resolve: './src/plugins/events-plugin'
  },
  'publication-plugin':{
    enabled: true,
    resolve: './src/plugins/publication-plugin'
  },
  'member-application-plugin':{
    enabled: true,
    resolve: './src/plugins/member-application-plugin'
  },
  'contact-plugin':{
    enabled: true,
    resolve: './src/plugins/contact-plugin'
  },
  'documentation-viewer':{
    enabled: true,
    resolve: './src/plugins/documentation-viewer'
  },
  'research-plugin':{
    enabled: true,
    resolve: './src/plugins/research-plugin'
  }
});
