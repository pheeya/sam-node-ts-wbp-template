import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';



const environment = process.env.NODE_ENV;
export default {
    input: 'src/server.ts',
    external: [/node_modules/],
    // preserveModules: true, // use this if you want to maintain folder structure for the server files
    plugins: [
        typescript(),
        nodeResolve()
    ],
    onwarn: () => { return },
    output: {
        dir: 'dist',
        format: 'cjs',
        sourcemap: environment === 'production' ? false : true
    }
}