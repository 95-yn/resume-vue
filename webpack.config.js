const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const SentryPlugin = require('@sentry/webpack-plugin');
var SentryPlugin = require('webpack-sentry-plugin');
module.exports = {
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        path: path.join(__dirname, 'dist'), // 所有的文件都输出到dist/目录下
        chunkFilename: 'js/[name]-[hash:8].js',
        filename: 'js/[name].[hash].js'
    },
    module: {
        rules: [{   
            // 使用vue-loader解析.vue文件
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.css$/,
            // 要加上style-loader才能正确解析.vue文件里的<style>标签内容
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader']
        },
        {
            test: /\.scss$/,
            use: [
                // 处理顺序是从sass-loader到style-loader
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'sass-loader'
            ]
        },
        {
            test: /\.(gif|jpg|jpeg|png|svg|webp)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    // 当文件大小小于limit byte时会把图片转换为base64编码的dataurl，否则返回普通的图片
                    limit: 1024,
                    name: 'images/[name]-[hash:5].[ext]' // 图片文件名称加上内容哈希
                }
            }]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/, // 不处理这两个文件夹里的内容
            loader: 'babel-loader'
        }
        ]
    },
    plugins: [
        new VueLoaderPlugin(), // 最新版的vue-loader需要配置插件
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成的文件名称
            template: 'index.html', // 指定用index.html做模版
            inject: 'body' // 指定插入的<script>标签在body底部
        }),
        new CleanWebpackPlugin(),
        // new SentryPlugin({
        //     release: '1.0',
        //     include: './dist/js',
        //     // urlPrefix: '~/dist/',
        //     ignore: ['node_modules', 'webpack.config.js'],
        // }),
        new SentryPlugin({
            // Sentry options are required
            organization: 'sentry',
            project: 'vue',
            apiKey: '0258108c4ae74cc7b48ac89c6a843c682c9242cbbeca4547a9d2585659532bc7',
            baseSentryURL: 'http://106.52.205.41:9000/api/0',
            // urlPrefix: './js',
            // Release version name/hash is required
            release: 'test-1.0.3'
          })
    ],
    resolve: {
        // 以下配置会将没指定拓展名的文件按如下类型查找匹配
        extensions: [
            '.js', '.json', '.vue'
        ]
    },
    mode: 'production',
    devtool: "source-map",
    devServer: {
        // 配置host及端口
        host: '127.0.0.1',
        port: 8088
    },
}