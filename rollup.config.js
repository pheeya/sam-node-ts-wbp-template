import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import copyPlugin from "rollup-plugin-copy"
const environment = process.env.NODE_ENV;
export default {
    input: 'src/server.ts',
    external: [/node_modules/],
    preserveModules: true, // use this if you want to maintain folder structure for the server files
    plugins: [
        copyPlugin({
            targets:[
                {src:"./src/views.json", dest:"./dist/"}
            ]
        }),
        typescript({exclude:"node_modules/**"}),
        nodeResolve(),
    ],
    onwarn: () => { return },
    output: {
        dir: 'dist',
        format: 'cjs',
        sourcemap: environment === 'production' ? false : true
    }
}