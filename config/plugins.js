const { resolve } = require('path');
const pckg = import('@openshift/dynamic-plugin-sdk-webpack');
const webpack = require('webpack');
const remotePluginOptions = require('./remotePlugin');
const TestWebpackPlugin = require('html-webpack-plugin');


const plugins = [];

// Save 20kb of bundle size in prod
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.NormalModuleReplacementPlugin(/redux-logger/, resolve(__dirname, './empty.js')),
  );
}

module.exports = async () => {
  const { DynamicRemotePlugin } = await pckg;

  the_plugin = new DynamicRemotePlugin(remotePluginOptions);
  console.log("-----------test", the_plugin["pluginMetadata"]);

  // TODO the version of @openshift/dynamic-plugin-sdk-webpack needs to be updated to ^2.0.0 to support passing loadScripts and registration method fields
  plugins.push(the_plugin);
  // merge(baseConfig, {
  //   plugins: [
  //     new TestWebpackPlugin({
  //       meta: {
  //         'Content-Security-Policy': {
  //           'http-equiv': 'Content-Security-Policy',
  //           content: "default-src 'self'; connect-src 'self' http: https;",
  //         },
  //       },
  //       ...remotePluginOptions
  //     }),
  //   ],
  // });
 
  return plugins;
};
