'use strict';

module.exports = () => {
  return {
    register({ strapi }) {
      // Will be called to register the plugin
    },

    bootstrap({ strapi }) {
      // Will be called after Strapi starts
    },
  };
};