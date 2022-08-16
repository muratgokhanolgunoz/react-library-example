import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import generatePackageJson from 'rollup-plugin-generate-package-json'
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import { getFolders } from './utility/buildUtils'
import packageJson from "./package.json";

const plugins = [
    external(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss(),
    terser(),
    replace({
        __IS_DEV__: process.env.NODE_ENV === 'development',
        preventAssignment: true
    })
]

const subfolderPlugins = (folderName) => [
    ...plugins,
    generatePackageJson({
        baseContents: {
            name: `${packageJson.name}/${folderName}`,
            private: true,
            main: '../cjs/index.js',
            module: './index.js',
            types: './index.d.ts',
        },
    }),
]

const folderBuilds = getFolders('./src').map((folder) => {
    return {
        input: `src/${folder}/index.ts`,
        output: {
            file: `dist/${folder}/index.js`,
            sourcemap: true,
            exports: 'named',
            format: 'esm',
        },
        plugins: subfolderPlugins(folder),
        external: ['react', 'react-dom'],
    }
})

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                exports: "named"
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
                exports: "named"
            }
        ],
        plugins,
        external: ["react", "react-dom"] // peerDependencies
    },
    ...folderBuilds
]