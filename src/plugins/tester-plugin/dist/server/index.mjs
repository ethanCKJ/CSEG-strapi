const bootstrap = ({ strapi }) => {
  const actions = [
    {
      section: "plugins",
      displayName: "Increment Counter",
      uid: "increment",
      pluginName: "tester-plugin"
    }
  ];
  strapi.admin.services.permission.actionProvider.registerMany(actions);
};
const destroy = ({ strapi }) => {
};
const register = ({ strapi }) => {
};
const config = {
  default: {},
  validator() {
  }
};
const contentTypes = {};
const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin("tester-plugin").service("service").getWelcomeMessage();
  }
});
const controllers = {
  controller
};
const middlewares = {};
const policies = {};
const contentAPIRoutes = [
  {
    method: "GET",
    path: "/",
    // name of the controller file & the method.
    handler: "controller.index",
    config: {
      policies: []
    }
  }
];
const routes = {
  "content-api": {
    type: "content-api",
    routes: contentAPIRoutes
  }
};
const service = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  }
});
const services = {
  service
};
const index = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
export {
  index as default
};
