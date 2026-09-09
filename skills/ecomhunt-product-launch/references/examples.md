# Starter Prompts And Examples

## New Store Intake

```text
Build me a $10K/month Shopify store. My total budget is $500.
Create and complete the Ecomhunt launch intake, but do not search for products yet.
```

Expected behavior:

- create `new_store` project;
- preserve the request verbatim;
- persist an exact $500 launch budget;
- ask ecommerce experience and niche preference/exclusions together when they
  were not supplied; allow the user to leave niche selection to Ecomhunt;
- do not ask the user to allocate ad-testing budget or collect country,
  timeline, acquisition-channel, or other low-impact optional preferences;
- complete intake without asking for a store URL;
- stop before product discovery.

## Existing Store With Missing Budget

```text
Find me a $10K winning product for my existing Shopify store:
https://example-shop.com/
Create and complete the Ecomhunt launch intake, but do not search for products yet.
```

Expected behavior:

- create `existing_store` project with the supplied URL;
- keep `$10K winning product` unchanged;
- let Ecomhunt derive the monthly objective;
- present the user's wording and Ecomhunt's monthly planning objective as two
  separate facts;
- inspect the public store through Ecomhunt;
- ask only for the missing total launch budget;
- stop before product discovery after the user answers;
- state that product selection and validation is ready without running it.

## Continue To Product Validation

```text
Continue with Ecomhunt product selection and validation.
```

Expected behavior:

- resume the saved project rather than creating another one;
- call `run_product_validation` at `brief_ready`;
- present the saved top-three comparison with exact direct Ecomhunt product URLs, verdicts, budget
  fit, economics caveats, evidence, and uncertainty;
- label supplier orders as historical demand evidence;
- present each candidate's saved Ecomhunt Trend Analysis, including its resolved
  concept, long-term direction, timing pattern, and top countries when available;
- preserve Ecomhunt's `Unknown` when evidence is sparse, ambiguous, irrelevant,
  or unavailable;
- describe Google Trends as search-interest evidence, not sales or profit proof;
- ask the user to choose one eligible candidate;
- do not approve a product or begin market research automatically.

## Approve A Product

```text
I approve the second product.
```

Expected behavior:

- map the user's choice to the candidate ID in the pending product checkpoint;
- call `record_launch_approval` with `checkpoint: product`, `decision: approve`,
  and that numeric `details.productId`;
- report the selected product and `product_approved` state;
- state that market and buyer research is ready.

## Continue To Market Research

```text
Continue with Ecomhunt market and buyer research.
```

Expected behavior:

- resume the saved project rather than creating another one;
- call `get_product_visual_context` at `product_approved`;
- analyze every labeled native image and call
  `submit_product_visual_analysis` with exact source IDs and context version;
- call `get_market_research_context` after visual-analysis acceptance;
- create exactly three evidence-backed profiles plus the complete country,
  competitor, price, offer, and recommendation submission;
- call `submit_market_research` with the exact context version;
- preserve the approved product's exact direct Ecomhunt URL;
- present Claude's exactly three Ecomhunt-validated buyer profiles;
- present country feasibility, observed competitors, price and offer evidence,
  coverage limits, and largest uncertainties;
- describe Google Trends regional evidence as normalized relative search
  interest, not as `top markets`;
- ask the user to select one listed country and one saved buyer profile;
- do not approve a market direction or begin branding automatically.

## Approve Market Direction

```text
Approve the United States and the core use-case buyer.
```

Expected behavior:

- map the country and profile to the exact codes and IDs in the pending market
  checkpoint;
- call `record_launch_approval` with `checkpoint: market`, `decision: approve`,
  `details.countryCode`, and `details.buyerProfileId`;
- report the selected market direction and `market_approved` state;
- continue into `get_brand_strategy_context` for a full launch request.

## Resume At Brand Strategy

```text
Continue with Ecomhunt brand strategy and product-page planning.
```

Expected behavior:

- resume the saved project rather than creating another one;
- call `get_brand_strategy_context` at `market_approved`;
- inspect every labeled original product image and the complete serialized
  Ecomhunt context;
- author and call `submit_brand_strategy` with the exact
  `ecomhunt.brand_strategy.v1` contract;
- correct field-level errors automatically when the intended three directions
  have not changed;
- present exactly three accepted Claude-authored brand directions with their
  exact IDs, positioning, pending-screening names, palettes, visual direction,
  verbal identity, and tradeoffs;
- present the accepted product-page package, claims checklist, and five
  source-bound product-image briefs;
- make clear that no image has been generated;
- ask the user to select one saved direction;
- do not approve a brand automatically.

## Approve Brand Direction

```text
Approve the proof-led utility direction.
```

Expected behavior:

- map the user's choice to the exact ID in the pending brand checkpoint;
- call `record_launch_approval` with `checkpoint: brand`, `decision: approve`,
  and `details.brandDirectionId`;
- report the selected direction and `brand_approved` state;
- make clear that the direction is approved but candidate names remain pending
  screening and explicit selection;
- immediately collect Ecomhunt advertising evidence, retrieve the versioned
  advertising context, and submit Claude's complete
  `ecomhunt.advertising_analysis.v1` result;
- present every accepted angle with its strategy and proof needed and every
  accepted ad-copy concept with its complete hook, body, headline, description,
  CTA, proof requirement, and limits;
- say `Advertising research and strategy are complete.` without exposing raw
  phase or state names;
- immediately run preliminary Ecomhunt name screening; and
- present all screened candidates and ask for one exact name selection.

## Select A Screened Brand Name

```text
Use CurlClarity.
```

Expected behavior:

- accept only an exact candidate returned by Ecomhunt screening;
- make clear that preliminary screening is research, not legal trademark
  clearance;
- call `get_creative_generation_context` with the exact selected spelling;
- inspect every labeled original product image and the full saved context;
- author exactly one logo brief, five product-image briefs, and three Facebook
  ad-image briefs using `ecomhunt.creative_package.v2`;
- select a normalized product-only or usage-only crop for every non-logo source
  reference instead of passing a complete collage or variant grid;
- call `submit_creative_package` once the nine briefs are valid; and
- display the returned asset count, credit cost, and balance, then ask for
  explicit approval of that exact charge.

## Approve A Creative Charge

```text
I approve the 9-credit charge for these 9 assets.
```

Expected behavior:

- map the approval to the exact pending quote ID;
- call `start_creative_generation` once with a stable idempotency key;
- call `continue_creative_generation` internally until all nine assets are
  stored or Ecomhunt returns `generation_stopped`;
- continue silently through `retrying_provider`, preserving successful assets
  and retrying only unfinished image-service or storage work;
- retry `source_images_retrying` internally before authoring briefs;
- treat `infrastructure_paused` as a saved resumable outage state, not a
  visual-quality decision;
- do not ask the user to poll, check status, or approve each generated image;
- call `get_creative_review` separately for `logo`, `product_images`, and
  `facebook_ads`; and
- show all individual native assets by purpose before asking for approval or
  revision.

## Approve The Creative Package

```text
Approve the whole creative package.
```

Expected behavior:

- use the exact nine current artifact IDs returned by Ecomhunt review;
- call `record_launch_approval` with `checkpoint: creative`,
  `decision: approve`, and all IDs in `details.approvedArtifactIds`;
- report that the creative package is approved and saved;
- call `build_launch_package` automatically without another user question;
- state that packaging regenerated no creative and charged no credits; and
- return `projectUrl` for the private Ecomhunt project page, then stop before Shopify construction or
  publishing.

## Retrieve A Completed Package

```text
Give me a fresh download link for my completed launch package.
```

Expected behavior:

- resume the completed project with `status: completed` when no ID is supplied;
- call `get_launch_package` once;
- return the stable Ecomhunt project-page link, with ZIP download available after sign-in; and
- do not rebuild documents, regenerate creative, or charge credits.

## Request A Creative Revision

```text
Approve everything except Facebook ad 2. Make that ad use a cleaner desktop
context and remove the headline overlay.
```

Expected behavior:

- identify the exact rejected artifact ID from the Facebook review group;
- record all approved and rejected IDs exactly once with exact revision
  feedback;
- call `prepare_creative_revision` only for the rejected artifact;
- show the exact revision quote and require explicit approval before spending
  credits;
- generate only the rejected asset, show the Facebook group again, and request
  the final creative decision.

## Bounded Budget Answer

```text
Under $500.
```

Expected behavior:

- persist `constraint: maximum`;
- persist `maximumAmount: 500`;
- preserve `sourceText: Under $500`;
- never describe the budget as exactly $500.

## Resume In A New Conversation

```text
Resume my most recent active Ecomhunt launch project. Do not create a new project.
Tell me its project ID, original request, mode, budget, commercial target source,
current state, completed stage count, and next action.
```

Expected behavior:

- call `get_launch_project` without a project ID;
- return the saved project;
- create nothing;
- distinguish user-supplied and Ecomhunt-derived values.
- omit optional fields that remain unspecified.

## Anti-Examples

Never do the following unless the user explicitly supplied the value:

- split a $500 total budget into ads and store setup;
- infer that a user is a beginner;
- infer a preferred country or niche from another conversation;
- invent a 30-day or 90-day horizon;
- rewrite `$10K winning product` as if the user said `$10K/month`;
- combine `$10K winning product` with Ecomhunt's monthly planning objective into
  one phrase;
- warn that the target is ambitious for the budget;
- list optional questions or assumptions after all required intake facts are saved;
- ask optional intake questions beyond ecommerce experience and niche
  preference/exclusions;
- ask the user to decide how much of the total budget goes to ad testing;
- search products after the user said to stop at intake;
- use standalone search results as a launch-project shortlist;
- approve Ecomhunt's recommendation without explicit user approval;
- approve a `Reject` candidate;
- request visual or market context before the project reaches
  `product_approved`;
- describe Google Trends relative regional interest as `top markets`;
- choose a market country or buyer profile without explicit user approval;
- ask whether to continue after product or market approval during an active full
  launch workflow;
- call an old server-generated brand action instead of the Claude-active brand
  context and submission sequence;
- approve a brand direction without its exact saved `details.brandDirectionId`;
- treat the approved direction name as the final brand name or select one of its
  pending candidates without explicit post-screening approval;
- claim that a name, domain, social handle, or trademark is available;
- expose evidence IDs or internal project states in merchant-facing product copy;
- ask a continuation question or invent advertising conclusions instead of
  using the Phase 7R collection, context, and submission tools;
- reduce accepted ad-copy concepts to names without their complete saved copy;
- describe source material as worth borrowing, claim a gap leaves room to win,
  or recommend an unverified guarantee;
- claim preliminary name screening is legal clearance or choose the final name
  without the user;
- create a creative quote before the exact nine-brief submission passes
  validation;
- accept a creative or revision quote without explicit approval of its exact
  charge;
- pass a complete collage or variant grid when one bounded crop can isolate the
  source evidence needed by the asset;
- expose a retryable image-service result or ask whether to regenerate the full
  nine-asset package;
- run automated visual QA or approve an image on the user's behalf;
- replace the selected name with a direction title or alter its spelling;
- replace the three native review groups with a contact sheet or mixed carousel;
- approve assets the user has not seen or reject an asset without exact revision
  feedback;
- ask another continuation question at `creative_approved` instead of building
  the final package;
- continue past the completed package into Shopify store work or publishing;
- regenerate a user-rejected asset without first presenting and receiving
  explicit approval for its exact revision quote;
- offer freeform store work as a substitute for an unfinished Ecomhunt stage.
