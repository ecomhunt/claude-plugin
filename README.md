# Ecomhunt Claude Plugin

The Ecomhunt Claude Plugin connects Claude to Ecomhunt and guides you through a
complete, research-backed Shopify product launch plan.

## What Ecomhunt Does

- discovers and evaluates product opportunities;
- helps you choose a product, market, buyer profile, brand direction, and name;
- creates product-page strategy, advertising concepts, and creative assets;
- preserves your project so you can resume it in a later conversation;
- asks for approval before important decisions and credit charges;
- packages the approved launch strategy and creative assets for download.

This version prepares the launch package. It does not create a Shopify store or
publish advertising campaigns.

## Install

1. Open **Customize** in Claude.
2. Open **Plugins**, click **Add** (the **+** button), then **Add marketplace**.
3. Select **Add from repository**.
4. Enter `https://github.com/ecomhunt/claude-plugin`.
5. Leave **Sync automatically** checked and click **Sync**.
6. Open the Ecomhunt marketplace, install the **Ecomhunt** plugin, and enable it.
7. Connect the bundled Ecomhunt connector and complete OAuth sign-in.
8. Start a fresh conversation.

If you have `ecomhunt-claude-plugin.zip`, you can also upload it through Claude's
plugin file-upload option. See [setup instructions](SETUP.md) for ZIP installation
and connection help.

## Start Your First Project

Ask Claude:

```text
Build me a $10K/month Shopify store. My budget is $500.
```

Ecomhunt will begin product discovery and guide you through the required review
and approval steps.

## Resume An Existing Project

In a fresh conversation, ask:

```text
Resume my most recent active Ecomhunt launch project.
```

Claude will retrieve the saved project and continue from its next unfinished
step.

## Security And Support

Do not paste API keys, access tokens, passwords, or payment-card details into
Claude. Authentication must happen through the Ecomhunt OAuth page.

For connection help, see [SETUP.md](SETUP.md) or visit https://ecomhunt.com/support.

Privacy policy: https://ecomhunt.com/privacy-policy

Terms: https://ecomhunt.com/terms-conditions
