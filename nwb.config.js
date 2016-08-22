module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ACForms',
      externals: {
        react: 'React'
      }
    }
  }
}
