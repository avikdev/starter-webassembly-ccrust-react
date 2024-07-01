use wasm_bindgen::prelude::*;
use web_sys::{OffscreenCanvas, OffscreenCanvasRenderingContext2d};

#[wasm_bindgen]
pub struct StudioWrapper {
  canvas: Option<OffscreenCanvas>,
  context: Option<OffscreenCanvasRenderingContext2d>,
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
impl StudioWrapper {
  pub fn set_canvas_list(&mut self, val: JsValue) {
    let canvas = OffscreenCanvas::unchecked_from_js(val);
    let returned_ctx = canvas.get_context("2d").unwrap().unwrap();
    let context = OffscreenCanvasRenderingContext2d::unchecked_from_js(returned_ctx.into());
    self.canvas = Some(canvas);
    self.context = Some(context);
    log("[rust] set canvas + ctx");
  }

  pub fn add_new_element(&mut self, clazz: String, x: f64, y:f64) {
    let Some(context) = &self.context else { return };
    log(&format!("[rust] added new elem : {}", clazz));
    let pi: f32 = 3.141596;
    context.set_line_width(1.0);
    context.set_stroke_style(&JsValue::from_str("#FF0000"));
    context.begin_path();
    match clazz.as_str() {
      "line" => {
        log(&format!("[rust] drawing line {}, {}", x, y));
        context.move_to(x -10.0 + 0.5, y - 10.0 + 0.5);
        context.line_to(x + 10.0 + 0.5, y + 10.0 + 0.5);
      },
      "rect" => {
        log(&format!("[rust] drawing rect {}, {}", x, y));
        context.move_to(x -10.0, y - 10.0);
        context.rect(x - 15.0, y - 10.0, 30.0, 20.0);
      },
      "ellipse" => {
        log(&format!("[rust] drawing ellipse {}, {}", x, y));
        context.arc(x, y, 20.0, 0.0, 2.0 * f64::from(pi)).unwrap();
      }
      _ => (),
    };
    context.stroke();
  }

  pub fn handle_event(&mut self, clazz: String, x: f64, y: f64) {
    let Some(context) = &self.context else { return };
    context.begin_path();
    let pi: f32 = 3.141596;
    match clazz.as_str() {
      "mousedown" => {
        context.set_stroke_style(&JsValue::from_str("#000055"));
        context.arc(x, y, 4.0, 0.0, 2.0 * f64::from(pi)).unwrap();
      },

      "mousemove" => {
        context.set_stroke_style(&JsValue::from_str("#000055"));
        context.arc(x, y, 1.0, 0.0, 2.0 * f64::from(pi)).unwrap();
      },

      "mouseup" => {
        context.set_stroke_style(&JsValue::from_str("#990000"));
        context.arc(x, y, 2.0, 0.0, 2.0 * f64::from(pi)).unwrap();
      },
      _ => (),
    };
    context.stroke();
  }
}

impl StudioWrapper {
  pub fn new() -> Self {
    Self {
      canvas: None,
      context: None,
    }
  }
}
