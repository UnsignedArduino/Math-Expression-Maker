// https://gist.github.com/UnsignedArduino/e23b8329c3a786d1e4e99d8ee941436e

// Include this JavaScript file in your HTML file and it will add a DIV element to the bottom of the page which will hold the console output, including errors!
// For example: <script src="/on_page_console.js"></script>

// Set false to do nothing
const on_page_console = true;

// https://stackoverflow.com/questions/20256760/javascript-console-log-to-html/50773729#50773729

const colorMappings = new Map();
colorMappings.set("warn", "orange");
colorMappings.set("error", "red");
colorMappings.set("info", "skyblue");
colorMappings.set("log", "gray");
colorMappings.set("debug", "gray");

const msgsToKeep = 1000;

function produceOutput(name, args) {
  return args.reduce((output, arg) => {
    // return output +
    //   "<span class=\"log-" + (typeof arg) + " log-" + name + "\">" +
    //       (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) +
    //   "</span>&nbsp;";
    // return output +
    //   "<span>" +
    //       (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) +
    //   "</span>&nbsp;";
    return output +
      "<span style=\"color: " + colorMappings.get(name) + ";\">" +
          (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) +
      "</span>&nbsp;";
  }, "");
}

function fixLoggingFunc(name, eleLocator, eleOverflowLocator, autoScroll, clear_button) {
  console["old" + name] = console[name];
  console[name] = function(...arguments) {
    const output = produceOutput(name, arguments);
    const eleLog = eleLocator();

    if (autoScroll) {
      const eleContainerLog = eleOverflowLocator();
      const isScrolledToBottom = eleContainerLog.scrollHeight - eleContainerLog.clientHeight <= eleContainerLog.scrollTop + 1;
      eleLog.innerHTML += output + "<br>";
      if (isScrolledToBottom) {
        eleContainerLog.scrollTop = eleContainerLog.scrollHeight - eleContainerLog.clientHeight;
      }
    } else {
      eleLog.innerHTML += output + "<br>";
    }

    clear_button.disabled = false;
    while (eleLog.childElementCount > msgsToKeep) {
      eleLog.removeChild(eleLog.firstChild);
    }

    console["old" + name].apply(undefined, arguments);
  };
}

function rewireLoggingToElement(eleLocator, eleOverflowLocator, autoScroll, clear_button) {
  fixLoggingFunc("log", eleLocator, eleOverflowLocator, autoScroll, clear_button);
  fixLoggingFunc("debug", eleLocator, eleOverflowLocator, autoScroll, clear_button);
  fixLoggingFunc("warn", eleLocator, eleOverflowLocator, autoScroll, clear_button);
  fixLoggingFunc("error", eleLocator, eleOverflowLocator, autoScroll, clear_button);
  fixLoggingFunc("info", eleLocator, eleOverflowLocator, autoScroll, clear_button);
}

if (on_page_console) {
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(document.createElement("br"));

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
  command_button.onclick = on_command_run;
  on_page_console_div.appendChild(command_button);

  const clear_button = document.createElement("button");
  clear_button.type = "button";
  clear_button.innerHTML = "Clear on page console";
  clear_button.onclick = clear_page_console;
  clear_button.disabled = true;
  on_page_console_div.appendChild(clear_button);

  document.body.appendChild(on_page_console_div);
  
  const eleLocator = () => document.getElementById("log");
  const eleOverflowLocator = () => document.getElementById("log_container");
  const autoScroll = true;

  function on_command_run() {
    console.log("Result: " + eval(command_input.value));
  }

  function clear_page_console() {
    while (console_pre.firstChild) {
      console_pre.removeChild(console_pre.firstChild);
    }
    clear_button.disabled = true;
  }

  window.onerror = (error_msg, url, line_number, col_number, error) => {
    const name = "error";
    let error_output;
    if (error.stack == null) {  // Should use == see https://stackoverflow.com/a/15992131/10291933
      error_output = error_msg + "\n  URL: " + url + ":" + line_number + ":" + col_number;
    } else {
      error_output = error.stack;
    }
    console.error(error_output);

    // console["old" + name].apply(undefined, arguments);
    return false;
  }

  rewireLoggingToElement(eleLocator, eleOverflowLocator, autoScroll, clear_button);
}
