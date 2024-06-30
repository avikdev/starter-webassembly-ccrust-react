#include <stdio.h>

#include <emscripten/bind.h>

using namespace emscripten;

class Greet {
  public:
    static std::string SayHello(const std::string &name);
};

std::string Greet::SayHello(const std::string &name) {
    return "Hello, " + name + "!";
}

std::string StartNewScene() {
  // TODO: Sketch to json and return the JSON object.
  std::string uid = "s01";
  printf("UUID = %s\n", uid.c_str());
  return uid;
}


void RegisterSceneModuleExports() {
  ::emscripten::function("miroStartNewScene", &StartNewScene);
}

EMSCRIPTEN_BINDINGS(Hello_World) {
    emscripten::class_<Greet>("Greet")
        .constructor<>()
        .class_function("SayHello", &Greet::SayHello);
  RegisterSceneModuleExports();
}


int main() {
  printf("hello, world!\n");
  return 0;
}