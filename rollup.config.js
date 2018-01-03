import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'

const env = process.env.NODE_ENV
const config = {
  input: 'build/todomvc.es.js',
  plugins: []
}

if (env === 'es' || env === 'cjs') {
  config.output = { format: env }
  config.external = ['microstates']
  config.plugins.push(
    babel({
      babelrc: false,
      plugins: ['external-helpers']
    })
  )
}

if (env === 'development' || env === 'production') {
  config.output = { format: 'umd' }
  config.name = 'MicrostatesTodoMVC'
  config.plugins.push(
    nodeResolve({
      jsnext: true
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  )
}

export default config
