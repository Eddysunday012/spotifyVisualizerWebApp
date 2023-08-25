import re
import sys
import os
import json
import pathlib
from subprocess import run

# Script that helps create new modules after running `yarn new-module`


def print_error(msg):
    print(f"\033[91m{msg}", file=sys.stderr)


module_name = input("What would you like to name the module? ").lower()
module_name = re.sub(r"[ _]", "-", module_name)

module_name_regex = r"^[a-z\-]+$"
if not re.match(module_name_regex, module_name):
    print_error(
        "Error: Invalid module name, must only contain letters, spaces, and underscores.")
    exit(1)

local_modules = os.listdir("packages")
for local_module in local_modules:
    if not re.match(module_name_regex, local_module):
        local_modules.remove(local_module)

if module_name in local_modules:
    print_error("Module with the same name already exists.")
    exit(1)

package_json_info = {
    "name": module_name,
    "version": "0.0.0",
    "main": "src/index.js",
    "license": "MIT",
    "scripts": {
        "test": "vitest run --coverage --passWithNoTests"
    },
    "jest": {
        "collectCoverage": True
    },
    "babel": {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    },
    "devDependencies": {
        "@babel/preset-env": "^7.19.4",
        "@babel/core": "^7.19.3",
        "@babel/preset-react": "^7.18.6",
        "@testing-library/user-event": "^14.4.3",
        "@vitejs/plugin-react": "^2.2.0",
        "vitest": "^0.24.3",
        "jsdom": "^20.0.1",
        "jest": "^29.1.2"
    }
}


def yes_or_no(msg, default):
    user_input = input(f"{msg} (y/n) (default: {default}) ")
    return len(user_input) > 0 and user_input[0] == "y"


should_add_react = yes_or_no("Add react?", default="n")
if should_add_react:
    package_json_info["devDependencies"]["react"] = "^18.2.0"

    # Chakra UI can't be used without react
    should_add_chakra_ui = yes_or_no(
        "Add chakra-ui (if the module is a feature module like \"chat-feature\", then this should be yes)?", default="n")
    if should_add_chakra_ui:
        package_json_info["devDependencies"]["@chakra-ui/react"] = "^2.3.5"
        package_json_info["devDependencies"]["@emotion/react"] = "^11.10.4"
        package_json_info["devDependencies"]["@emotion/styled"] = "^11.10.4"
        package_json_info["devDependencies"]["framer-motion"] = "^7.5.3"
        package_json_info["devDependencies"]["react-dom"] = "^18.2.0"

    should_add_mui = yes_or_no(
        "Add material-ui (if the module is a ui module, then this would be yes)?", default="n")
    if should_add_mui:
        package_json_info["devDependencies"]["@mui/material"] = "*"
        package_json_info["devDependencies"]["@mui/icons-material"] = "*"

separated_local_modules = "\n".join(local_modules)
add_local_modules_message = f"""
Listed below are all current local modules:
{separated_local_modules}
Indicate any modules you would like to add as a dependency separated by columns.
Or just hit enter if there are none.
(Ex. app-feature,firebase-client)
"""

input_modules = map(lambda x: x.strip(), input(
    add_local_modules_message).lower().split(","))
for module in input_modules:
    if module in local_modules and module != "":
        package_json_info["devDependencies"][module] = "*"

pathlib.Path(f"packages/{module_name}/src").mkdir(parents=True, exist_ok=True)

with open(f"packages/{module_name}/vite.config.js", "w") as vite_config_file:
    viteFileTxt = """import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    deps: {
      fallbackCJS: true,
    },
  },
});
"""
    vite_config_file.write(viteFileTxt)

with open(f"packages/{module_name}/package.json", "w") as manifest_file:
    json.dump(package_json_info, manifest_file, indent=2)

with open(f"packages/{module_name}/README.md", "w") as readme_file:
    base_markdown = f"""# {module_name}
TODO: - Add documentation
"""
    readme_file.write(base_markdown)

open(f"packages/{module_name}/src/index.js", "w")

run(["cd", f"packages/{module_name}"])
run(["yarn"])

print("Done, module created.")
