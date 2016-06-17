module.exports = function (kibana) {
  return new kibana.Plugin({

    uiExports: {
      app: {
        title: 'Kibana Guard',
        description: 'A Kibana plugin for authentication and authorization',
        main: 'plugins/kibana-guard-plugin/app'
      }
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },
    init(server, options) {

    }

  });
};
