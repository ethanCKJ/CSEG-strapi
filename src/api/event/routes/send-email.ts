/**
 * Custom routes
 */
module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/event/send-email',
      handler: 'api::event.event.sendEmail',
      config: {
        auth: false,
      }
    },
  ],
};

