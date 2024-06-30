load("@rules_cc//cc:defs.bzl", "cc_binary")
load("@emsdk//emscripten_toolchain:wasm_rules.bzl", "wasm_cc_binary")


package(default_visibility = ["//visibility:public"])

DEFAULT_EMSCRIPTEN_LINKOPTS = [
    # LTO broken when using hermetic emsdk
    # "-flto",                            # Specify lto (has to be set on for compiler as well)
    "--bind",                           # Compiles the source code using the Embind bindings to connect C/C++ and JavaScript

    "--clear-cache=1",

    "-O2",
    "-s MODULARIZE=1",
    "-s EXPORT_ES6=1",
    "-s USE_ES6_IMPORT_META=1",
    "-s ENVIRONMENT=web,worker",
    "-s EXPORT_NAME=WasmModule",
    "--sandbox_debug",

    "-lembind --embind-emit-tsd interface.d.ts",
]

WASM_LINKOPTS = [
    "-s WASM=1",                    # Specify wasm output
]

cc_binary(
    name = "demo",
    srcs = ["demo_main.cc"],
    linkopts = WASM_LINKOPTS + DEFAULT_EMSCRIPTEN_LINKOPTS,
)

wasm_cc_binary(
    name = "demo_wasm",
    cc_target = ":demo",
    outputs = [
      "demo.wasm",
      "demo.js",
    ],
)
