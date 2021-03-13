const path = require('path');

module.exports = {
  entry: './src/bouncing-ball.js',
  output: {
    filename: 'bouncing-ball.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
