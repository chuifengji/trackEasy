import typescript from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'

export default {
    input: 'core/index.ts',
    output: [
        {
            file: 'dist/trackeasy.es.js',
            format: 'esm',
            sourcemap: true,
        },{
            file: 'dist/trackeasy.umd.js',
            name: 'trackeasy',
            format: 'umd',
            
        },{
            file: 'dist/trackeasy.cjs.js',
            format: 'cjs',
        }
    ],
    plugins: [
        replace({
            __DEV__: process.env.NODE_ENV !== 'production'
        }),
        typescript({
            tsconfig: 'tsconfig.json',
            removeComments: true,
            useTsconfigDeclarationDir: true,
        }),
    ]
}