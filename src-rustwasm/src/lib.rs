mod utils;
mod web;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn say_hello_from_rust(name: String) -> String {
    log("This is a logging inside rust");
    format!("Greetings from rust, says: Hola '{}'", name)
}
