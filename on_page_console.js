// https://gist.github.com/UnsignedArduino/e23b8329c3a786d1e4e99d8ee941436e

// Include this JavaScript file in an HTML file and it will add a DIV element to the bottom of the page which will contain console output and
// an textarea to run JavaScript code!
// Example script include tag: <script src="/on_page_console.js"></script>

// Set false to do nothing
const on_page_console = true;

if (on_page_console) {
  (() => {
    const msgs_to_keep = 1000;
    const element_to_append_to = document.body;
    
    element_to_append_to.appendChild(document.createElement("br"));
    element_to_append_to.appendChild(document.createElement("br"));
  
    const on_page_console_div = document.createElement("div");
    on_page_console_div.style.border = "1px outset black";
    on_page_console_div.style.padding = "5px";
    
    const warning_b = document.createElement("b");
    warning_b.innerHTML = "On page console:";
    on_page_console_div.appendChild(warning_b);
    
    const console_div = document.createElement("div");
    console_div.id = "log_container";
    console_div.style.overflow = "auto";
    console_div.style.height = "150px";
    console_div.style.border = "1px outset black";
    console_div.style.padding = "5px";
    
    const console_pre = document.createElement("pre");
    console_pre.id = "log";
    
    console_div.appendChild(console_pre);
    on_page_console_div.appendChild(console_div);
    
    const command_label = document.createElement("label");
    command_label.for = "command_input";
    command_label.innerHTML = "Run JavaScript code: " + 
                              "(Remember that you can only run code in the context " + 
                              "of <a href=\"/on_page_console.js\"><code>/on_page_console.js</code></a> - see " + 
                              "<a href=\"https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#using_eval_in_content_scripts\">here</a>.)";
    on_page_console_div.appendChild(command_label);
  
    on_page_console_div.appendChild(document.createElement("br"));
  
    const command_input = document.createElement("textarea");
    command_input.type = "text";
    command_input.rows = 5;
    command_input.cols = 40;
    command_input.id = "command_input";
    command_input.name = "command_input";
    on_page_console_div.appendChild(command_input);
  
    on_page_console_div.appendChild(document.createElement("br"));
  
    const command_button = document.createElement("button");
    command_button.type = "button";
    command_button.innerHTML = "Run";
    command_button.onclick = () => {
      console.log("Result: " + eval(command_input.value));
    };
    on_page_console_div.appendChild(command_button);
  
    element_to_append_to.appendChild(on_page_console_div);
    
    const auto_scroll = true;
  
    // https://stackoverflow.com/a/50773729/10291933
  
    const color_mapping = new Map();
    color_mapping.set("warn", "orange");
    color_mapping.set("error", "red");
    color_mapping.set("info", "skyblue");
    color_mapping.set("log", "gray");
    color_mapping.set("debug", "gray");
    
    function produce_html(name, args) {
      return args.reduce((output, arg) => {
        return output +
          "<span style=\"color: " + color_mapping.get(name) + ";\">" +
              (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) +
          "</span>&nbsp;";
      }, "");
    }
    
    function rewire_logging_func(name) {
      console["old" + name] = console[name];
      console[name] = (...arguments) => {
        const output = produce_html(name, arguments);
    
        if (auto_scroll) {
          console_pre.innerHTML += output + "<br>";
          if (console_div.scrollHeight - console_div.clientHeight <= console_div.scrollTop + 1) {
            console_div.scrollTop = console_div.scrollHeight - console_div.clientHeight;
          }
        } else {
          console_pre.innerHTML += output + "<br>";
        }
    
        while (console_pre.childElementCount > msgs_to_keep) {
          console_pre.removeChild(console_pre.firstChild);
        }
    
        console["old" + name].apply(undefined, arguments);
      };
    }
    
    function rewire_logging() {
      rewire_logging_func("log");
      rewire_logging_func("debug");
      rewire_logging_func("warn");
      rewire_logging_func("error");
      rewire_logging_func("info");
    }
  
    window.onerror = (error_msg, url, line_number, col_number, error) => {
      let error_output;
      if (error.stack == null) {
        error_output = error_msg + "\n  URL: " + url + ":" + line_number + ":" + col_number;
      } else {
        error_output = error.stack;
      }
      console.error(error_output);
      return false;
    }
  
    rewire_logging();
  })();
}
