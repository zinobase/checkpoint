import { defineConfig } from "vite";
import wasmSupport from "vite-plugin-wasm";

export default defineConfig({
	base: "./",
	plugins: [wasmSupport()],
	server: { fs: { allow: [".."] } },
	esbuild: { target: "es2022" },
	optimizeDeps: {
		exclude: ["@midnightntwrk/onchain-runtime-v4"],
		esbuildOptions: { target: "es2022" }
	},
	build: {
		target: "es2022",
		outDir: "../dist",
		emptyOutDir: true
	}
});
