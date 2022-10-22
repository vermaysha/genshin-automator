/* eslint-disable */

const { build } = require('esbuild')
const glob = require('glob')
const entryPoints = glob.sync('./src/**/*.ts')
const fs = require('fs')
const chalk = require('chalk')

fs.rmSync('build', { recursive: true, force: true })

build({
  entryPoints,
  outbase: './src',
  outdir: './build',
  platform: 'node',
  watch: false,
  sourcemap: true,
  minify: true,
  target: 'es6',
  format: 'cjs',
}).then(() => {
  const fileList = ['package.json', 'package-lock.json']

  for (const file of fileList) {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, `build/${file}`)
    }
  }

  console.log(chalk.green('Build Success'))
})
