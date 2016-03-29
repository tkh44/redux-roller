module.exports = {
  type: 'react-component',
  build: {
    externals: {
      'react': 'React'
    },
    global: 'roller',
    jsNext: true,
    umd: false
  }
}
