#include <stdio.h>

#include <emscripten/bind.h>

using namespace emscripten;

class Greet {
  public:
    static std::string SayHello(const std::string &name);
};

std::string Greet::SayHello(const std::string &name) {
  return "Greetings from C++, says hello " + name + " !";
}

std::string DemoFunc()
{
  // TODO: Sketch to json and return the JSON object.
  std::string uid = "s01";
  return uid;
}

void RegisterSceneModuleExports() {
  ::emscripten::function("DemoFunc", &DemoFunc);
}

EMSCRIPTEN_BINDINGS(Hello_World) {
    emscripten::class_<Greet>("Greet")
        .constructor<>()
        .class_function("SayHello", &Greet::SayHello);
  RegisterSceneModuleExports();
}


int main() {
  printf("In C++ main!\n");
  return 0;
}
