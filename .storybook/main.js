const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = {
    stories: ['../src/components/**/*.mdx'],
    addons: [
        // 1. register the docs panel (as opposed to '@storybook/addon-docs' which
        //    will configure everything with a preset)
        '@storybook/addon-docs/register',
        '@storybook/addon-essentials',
    ],
    webpackFinal: config => {
        // Load `.mdx` files as CSF and generate the docs page from the markdown
        // (the @storybook/addons-docs preset usually handles this, delete this rule
        // if we use that preset later)
        config.module.rules.push({	
            test: /\.mdx$/,	
            use: [	
                {	
                    loader: "babel-loader"	
                },	
                {	
                    loader: "@mdx-js/loader",	
                    options: {	
                        compilers: [createCompiler({})]	
                    }	
                }	
            ]	
        });
        // Run `source-loader` on story files to show their source code
        // automatically in `DocsPage` or the `Source` doc block.
        // (the @storybook/addons-docs preset usually handles this, delete this rule
        // if we use that preset later)
        config.module.rules.push({
            test: /\.(stories|story)\.[tj]sx?$/,
            loader: require.resolve("@storybook/source-loader"),
            exclude: [/node_modules/],
            enforce: "pre"
        });

        return config;
    }
}