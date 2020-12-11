const babelEnvOptions = {
    shippedProposals: true,
    modules: process.env.NODE_ENV === "test" ? "auto" : false,
  };
  
  // by default preset-env will leverage .browserlistrc for browser target information.
  // when BABLE_ENV=legacy is set setting targets to {} will cause preset-env to apply all transformation, effectively targeting es5
  if (process.env.BABEL_ENV === "legacy") {
    babelEnvOptions.targets = {};
  }
  
  const config = {
    presets: [["@babel/preset-env", babelEnvOptions], "@babel/preset-react"],
    plugins: [
      "@babel/plugin-proposal-export-default-from",
    ],
  };
  
  module.exports = config;
  