// https://esbuild.github.io/getting-started/
import esbuild from 'esbuild'
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
  const ctx = await esbuild.context({
    entryPoints: ['backend/src/**/*.ts'],
    format: 'esm',
    minify: false,
    outdir: 'backend/out',
    platform: 'node',
    target: ['node16'],
    bundle: true,
    banner: {
      js: 'import { createRequire } from "node:module"; const require = createRequire(import.meta.url);'
    }
  })
  ctx
    .watch()
    .then(() => {
      console.log('Build and watching...')
    })
    .catch((err) => {
      console.log('Build failed')
      console.log(err)
    })
} else {
  esbuild
    .build({
      entryPoints: ['backend/src/index.ts'],
      outfile: 'backend/dist/index.js',
      bundle: true,
      minify: true,
      platform: 'node',
      format: 'esm',
      banner: {
        js: 'import { createRequire } from "node:module"; const require = createRequire(import.meta.url);'
      }
    })
    .then(() => {
      console.log('Build successful')
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
