// eslint.config.mjs
import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    quotes: "double",
    semi: true,
  },
  rules: {
    "antfu/if-newline": true,
  },
});
