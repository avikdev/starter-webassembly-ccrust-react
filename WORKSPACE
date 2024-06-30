load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "emsdk",
    sha256 = "a6387de363af5685e30920648a6b8122c2fe8c224c0ab6fe39808db6f1bcac2e",
    strip_prefix = "emsdk-3.1.60/bazel",
    url = "https://github.com/emscripten-core/emsdk/archive/refs/tags/3.1.60.tar.gz",
)

load("@emsdk//:deps.bzl", emsdk_deps = "deps")
emsdk_deps()

load("@emsdk//:emscripten_deps.bzl", emsdk_emscripten_deps = "emscripten_deps")
emsdk_emscripten_deps(emscripten_version = "3.1.60")

load("@emsdk//:toolchains.bzl", "register_emscripten_toolchains")
register_emscripten_toolchains()
