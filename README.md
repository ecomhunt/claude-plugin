# Ecomhunt Claude Marketplace

Connect Claude to Ecomhunt for product research and guided Shopify launch planning.

## Install

1. Open **Customize** in Claude and go to **Plugins**.
2. Click **Add**, then **Add marketplace**.
3. Select **Add from repository**.
4. Enter `https://github.com/ecomhunt/claude-plugin`.
5. Leave **Sync automatically** checked and click **Sync**.
6. Install and enable the **Ecomhunt** plugin.
7. Connect its Ecomhunt connector and complete OAuth sign-in.
8. Start a fresh conversation.

Ask Claude:

```text
Build me a $10K/month Shopify store. My budget is $500.
```

See the [plugin guide](plugins/ecomhunt/README.md) for features and resuming a
project, or [setup instructions](plugins/ecomhunt/SETUP.md) for ZIP installation
and connection help.

## Repository Layout

The marketplace catalog is `.claude-plugin/marketplace.json`. It references the
complete plugin at `./plugins/ecomhunt`, including its manifest, MCP configuration,
skills, and setup guides.

To publish this marketplace, copy this directory's contents, including the hidden
`.claude-plugin` directory, to the GitHub repository root. Keep `plugins/ecomhunt`
in place.

When updating the previous layout, remove the old root `.claude-plugin/plugin.json`,
`.mcp.json`, `skills/`, and `SETUP.md`; those files now belong inside
`plugins/ecomhunt/`. Keep the root `.claude-plugin/marketplace.json`.

Validate the checkout with `node scripts/validate.mjs`. For a direct plugin upload,
use `ecomhunt-claude-plugin.zip`, whose contents start at the plugin directory.
