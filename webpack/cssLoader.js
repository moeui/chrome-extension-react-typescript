const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')

exports.cssLoader = (type = 'css', options = {}) => {
    const isProduction = process.env.NODE_ENV === 'production'
    const miniCss = isProduction
        ? [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: project.publicPath,
                },
            },
        ]
        : []
    const typeReg = {
        css: /\.css$/,
        stylus: /\.(styl|stylus)$/,
        less: /\.less$/,
        sass: /\.(sass|scss)$/,
    }
    const typeModuleReg = {
        css: /\.module\.css$/,
        stylus: /\.module\.(styl|stylus)$/,
        less: /\.module\.less$/,
        sass: /\.module\.(sass|scss)$/,
    }
    const preParseLoader =
        type === 'css'
            ? []
            : [
                {
                    loader: `${type}-loader`,
                    options,
                },
            ]
    const loader = [
        {
            test: typeModuleReg[type],
            use: [
                {
                    loader: 'style-loader',
                },
                ...miniCss,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            getLocalIdent: getCSSModuleLocalIdent,
                        },
                    },
                },
                {
                    loader: 'postcss-loader',
                },
                ...preParseLoader,
            ],
        },
        {
            test: typeReg[type],
            exclude: typeModuleReg[type],
            use: [
                {
                    loader: 'style-loader',
                },
                ...miniCss,
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'postcss-loader',
                },
                ...preParseLoader,
            ],
        },
    ]
    return loader
}