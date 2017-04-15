const webpack = require('webpack');
const path = require('path');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// 动态插入bundle好的js到index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: true,
    minify: {
        removeComments: true,        //去注释
        collapseWhitespace: true,    //压缩空格
        removeAttributeQuotes: true  //去除属性引用
    }
});

module.exports = (options = {}) => {

    return {
        entry: {
            bundle:[
                // 'babel-polyfill',
                path.resolve(__dirname, 'src/index.js')
                ],
            // vendor: ['react',"react-dom","react-redux","react-router","redux","immutable","socket.io-client","highlight.js","marked","fetch-polyfill"]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name][hash].js',
            publicPath: options.dev ? '/' : './',
            // chunkFilename: '[name].js' //注意这里，用[name]可以自动生成路由名称对应的js文件
        },
        module: {
            rules: [
                // {test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader','postcss-loader']},
                // , include: path.resolve(__dirname, 'src')  highlight的css不在其中
                {
                    test: /\.(css|scss)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        //resolve-url-loader may be chained before sass-loader if necessary
                        use: ['css-loader', 'sass-loader','postcss-loader']
                    })
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                /*
                                 html-loader接受attrs参数, 表示什么标签的什么属性需要调用webpack的loader进行打包.
                                 比如<imgs>标签的src属性, webpack会把<imgs>引用的图片打包, 然后src的属性值替换为打包后的路径.
                                 使用什么loader代码, 同样是在module.rules定义中使用匹配的规则.

                                 如果html-loader不指定attrs参数, 默认值是img:src, 意味着会默认打包<imgs>标签的图片.
                                 这里我们加上<link>标签的href属性, 用来打包入口index.html引入的favicon.png文件.
                                 */
                                attrs: ['imgs:src', 'link:href']
                            }
                        }
                    ]
                },

                {
                    /*
                     匹配favicon.png
                     上面的html-loader会把入口index.html引用的favicon.png图标文件解析出来进行打包
                     打包规则就按照这里指定的loader执行
                     */
                    test: /favicon\.png$/,

                    use: [
                        {
                            // 使用file-loader
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]?[hash]'
                            }
                        }
                    ]
                },
                {test: /\.js[x]?$/, use: 'babel-loader'},
                // exclude: /node_modules/
                // { test: /\.(png|jpg)$/, use: 'file-loader'},
                {test: /\.(png|jpg)$/, exclude: /favicon\.png$/,use: [{loader: 'url-loader', options: {limit: 15000,name:'./[name].[ext]?[hash]'}}]}
                //可以使/开头的文件相对于root目录解析
                // {test: /\.html$/, use: [{loader: 'html-loader', options: {root: path.resolve(__dirname, 'src'), attrs: ['imgs:src', 'link:href']}}]}
            ]
        },
        plugins: [
            HTMLWebpackPluginConfig,
            //热加载插件
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin('style.css'),
            //必须配置，react的公共模块
/*            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor'],
                filename: 'vendor.js'
            }),
            // new OpenBrowserPlugin({ url: 'http://localhost:8080' })
            new webpack.optimize.UglifyJsPlugin({
                comments: false,        //去掉注释
                compress: {
                    warnings: false    //忽略警告
                }
            })*/
        ],
        resolve: {
            alias: {
                '~': path.resolve(__dirname, 'src')
            }
        }
    }
};