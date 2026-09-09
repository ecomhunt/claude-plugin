# Ecomhunt Plugin Setup

## Install From GitHub

1. Open **Customize** in Claude and go to **Plugins**.
2. Click **Add** (the **+** button), then **Add marketplace**.
3. Select **Add from repository**.
4. Enter `https://github.com/ecomhunt/claude-plugin`.
5. Leave **Sync automatically** checked and click **Sync**.
6. Open the Ecomhunt marketplace, install the **Ecomhunt** plugin, and enable it.
7. Follow the connection steps below to sign in to Ecomhunt.

## Install From A ZIP

If you already have `ecomhunt-claude-plugin.zip`:

1. Open **Customize**, then **Plugins**, and choose the file-upload option.
2. Upload `ecomhunt-claude-plugin.zip` and enable the **Ecomhunt** plugin.
3. Follow the connection steps below.

## Connect

1. Open the installed plugin and enable the Ecomhunt connector if it is not
   already enabled.
2. Select **Connect** or **Sign in** for Ecomhunt.
3. Complete the Ecomhunt OAuth authorization in the browser window.
4. Return to Claude and start a fresh conversation.

## Start Your First Project

Ask Claude:

```text
Build me a $10K/month Shopify store. My budget is $500.
```

Claude should use the Ecomhunt connector to create a new launch project and begin
product discovery.

## Resume An Existing Project

If you already have an unfinished Ecomhunt project, ask:

```text
Resume my most recent active Ecomhunt launch project.
```

Claude should retrieve the saved project and continue from its next unfinished
step.

## Security

Do not paste API keys, access tokens, passwords, or payment-card details into
Claude. Authentication must happen through the Ecomhunt OAuth page.

## Troubleshooting

- If the marketplace synced but Ecomhunt tools are missing, open the marketplace
  and check that the **Ecomhunt** plugin is installed and enabled, then connect
  its Ecomhunt connector.
- If Ecomhunt tools are missing, disable and re-enable the plugin, then start a
  fresh conversation.
- If authentication expired, disconnect and reconnect Ecomhunt from Claude's
  connector settings.
- If an organization blocks custom plugins or connectors, ask its Claude owner
  or administrator to allow the Ecomhunt plugin.
- For support, visit https://ecomhunt.com/support.

Privacy policy: https://ecomhunt.com/privacy-policy

Terms: https://ecomhunt.com/terms-conditions
