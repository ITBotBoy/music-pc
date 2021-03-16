const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    publicPath: '/',
    outputDir:'pc',
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: false,
    parallel: undefined,
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                // 根据自己样式文件的位置调整
                data: `@import "@/assets/style/var.scss";`
            }
        }
    },
    devServer: {
        disableHostCheck: true,
        port: 8888,
        proxy: {
            '/':{
                target:'http://localhost'
            }
        },
    },
    chainWebpack: config => {
        if (process.env.use_analyzer) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
        // 忽略的打包文件
        config.optimization.minimizer([
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true, // console
                        pure_funcs: ['console.log'] // 绉婚櫎console
                    }
                }
            })
        ])
        config.externals({
            'vue-router': 'VueRouter',
            'vue': 'Vue',
            'vuex':'Vuex',
            'jquery':'$',
            'element-ui': 'ELEMENT',
            'axios': 'axios'
        })
    }
}
