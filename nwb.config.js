module.exports = {
    type: 'react-component',
    build: {
        externals: {
            'react': 'React'
        },
        global: 'roller',
        jsNext: true,
        umd: false
    },
    babel: {
        stage: 0,
        optional: ['runtime']
    },
    webpack: {
        extra: {
            devtool: 'eval'
        }
    }
};
