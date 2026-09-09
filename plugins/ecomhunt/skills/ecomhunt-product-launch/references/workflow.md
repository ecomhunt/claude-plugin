# Ecomhunt Launch Workflow Reference

## Tool Sequence

### Start A New Launch

1. `create_launch_project`
2. When not already supplied, ask ecommerce experience and preferred or excluded
   niches/product types together. The user may leave the niche open for Ecomhunt
   to decide.
3. Do not ask the user to allocate ad-testing budget or collect other low-impact
   optional preferences. Then call `complete_launch_intake`.
4. Ask only returned blocking questions, if any, and repeat
   `complete_launch_intake` with newly confirmed facts.
5. Stop at `brief_ready` when product discovery is not requested.
6. Otherwise call `run_product_validation`, then call `get_launch_checkpoint`
   with `checkpoint: product`. When its UI is displayed, give a short
   recommendation and material risks without duplicating the table. If UI
   rendering is unavailable, present the full saved top-three comparison.
7. Ask for one explicit product decision at `candidates_ready`.
8. Call `record_launch_approval` with the selected `details.productId` only after
   explicit approval.
9. At `product_approved`, call `get_product_visual_context` without asking for
   another continuation.
10. Analyze every labeled native image jointly and create the complete
    `ecomhunt.product_visual_analysis.v1` payload. Use exact source media IDs and
    do not convert image text or visual guesses into verified facts.
11. Call `submit_product_visual_analysis`. Correct field-level errors
    automatically with a new idempotency key when the selected product does not
    change.
12. After acceptance, call `get_market_research_context` immediately.
13. Create the complete `ecomhunt.market_research.v1` payload: exactly three
    profiles, country assessments, supplied-competitor classifications, observed
    price and offer analysis, and one recommendation with evidence IDs.
14. Call `submit_market_research`. Correct field-level errors automatically when
    the intended recommendation does not change. Only after acceptance, call
    `get_launch_checkpoint` with `checkpoint: market`.
15. Present the accepted visual and market analysis. Ask the user to select one
    listed country and one submitted buyer profile.
16. Call `record_launch_approval` for `checkpoint: market` only after explicit
    approval, with the selected `details.countryCode` and
    `details.buyerProfileId`.
17. At `market_approved`, call `get_brand_strategy_context` for a full launch
    request. Analyze all labeled original product images and the complete
    serialized Ecomhunt brand context.
18. Create the exact `ecomhunt.brand_strategy.v1` payload with three materially
    different directions, five to ten unique pending-screening names, complete
    product-page copy, claims checklist, and five source-bound image briefs.
19. Call `submit_brand_strategy`. Correct field-level errors automatically when
    the intended direction set is unchanged. Only after acceptance, call
    `get_launch_checkpoint` with `checkpoint: brand`.
20. Present the complete accepted submission and ask the user to approve one
    exact `brandDirectionId`.
21. Call `record_launch_approval` for `checkpoint: brand` only after explicit
    approval, with the selected `details.brandDirectionId`.
22. At `brand_approved`, call `run_advertising_research` immediately. If its
    source collection is still running, call `continue_advertising_research`
    internally until it is ready. Do not ask the user a question.
23. Call `get_advertising_research_context`, analyze the complete saved source
    set and representative native images, and create the exact
    `ecomhunt.advertising_analysis.v1` payload.
24. Call `submit_advertising_analysis`. Correct field-level errors automatically
    while the approved product, market, buyer, and direction are unchanged.
25. Present every accepted creative angle with strategy and proof needed and
    every accepted ad-copy concept with awareness stage, hook, primary text,
    headline, description, CTA, proof requirement, and compliance limits.
    Never reduce them to names only.
26. Say `Advertising research and strategy are complete.` without exposing raw
    phase or state names, then immediately call `run_brand_name_screening` for a
    full launch request.
27. Call `get_launch_checkpoint` with `checkpoint: name`. Present every screened
    candidate, its exact risk label and observed
    conflicts, and its official ICANN and USPTO lookup links. Explain that this
    is preliminary research rather than legal trademark clearance.
28. Ask the user to choose exactly one screened name. Keep direction approval
    separate from final name selection and never choose a candidate for the user.
29. After explicit selection, call `get_creative_generation_context` with the
    exact saved candidate name and inspect all original native product images and
    the full accepted context.
30. Author the exact `ecomhunt.creative_package.v2` payload: one readable exact
    wordmark logo, five distinct source-bound product images, and three distinct
    source-bound Facebook ad images. For every non-logo source reference, supply
    one normalized crop containing only the product or usage region needed by
    that brief. Use only supplied media, fact, invariant, analysis, and direction
    IDs.
    Use the supplied `constraints.promptTemplates` for product and ad treatments,
    preserving accepted purposes, compositions, advertising strategies, and crops.
    Ecomhunt compiles the templates around the product-specific briefs. Existing
    quoted plans and revisions keep their saved prompts; automated visual QA
    remains off.
31. Call `submit_creative_package`. Correct field-level validation errors
    internally while the selected name and strategy remain unchanged.
32. Only after valid submission, call `get_launch_checkpoint` with
    `checkpoint: credit`. Present the quote and ask the user to approve the exact asset count,
    credit cost, and balance. Do not start generation without explicit approval
    of that charge.
33. After approval, call `start_creative_generation`, then
    `continue_creative_generation` internally until all nine assets are stored or
    the run returns `generation_stopped`. Continue automatically through
    `retrying_provider`; it is an internal image-service or storage retry, not a user
    decision. Do not run automated visual QA or regenerate an image based on model
    judgment. At `generation_stopped`,
    preserve the selected name and prior approvals, report the returned quote
    status and balance, and stop without repeating screening, retrying, or
    proposing another quote.
    When a superseded development run returns `creative_resubmission_required`,
    keep its selected name and move directly through fresh creative context and
    v2 submission without repeating earlier checkpoints.
    When context returns `source_images_retrying`, retry the context internally
    and do not submit from partial previews. When generation returns
    `infrastructure_paused`, stop polling, end the user-facing response without a
    question or retry offer, and resume the same run later. Source, storage, and
    image-service failures are not QA failures.
34. Call `get_creative_review` separately for `logo`, `product_images`, and
    `facebook_ads`. Show all individual native images in their purpose group. Do
    not replace the native groups with a contact sheet or mixed carousel. After
    all three groups return, call `get_launch_result` with `view: creative_review`.
35. Ask the user to approve every current artifact or reject exact artifact IDs
    with specific revision feedback. Record the exact decision through
    `record_launch_approval` at the `creative` checkpoint.
36. For rejected assets, call `prepare_creative_revision`, then call
    `get_launch_checkpoint` with `checkpoint: credit`, present the exact revision
    quote, require explicit credit approval, generate only the rejected assets,
    show their affected native review group again, call `get_launch_result` with
    `view: creative_review`, and repeat the creative decision.
37. At `creative_approved`, call `build_launch_package` immediately with a stable
    idempotency key. Do not ask another question. It must reuse approved assets,
    regenerate no creative, and charge no credits. After success, call
    `get_launch_result` with `view: package`.
38. Present the rendered project-page link and seven-stage
    completion. Stop before Shopify construction or publishing.

### Resume A Launch

1. `get_launch_project`; use `status: completed` when the user asks for a
   completed project or package, otherwise default to `status: active`.
2. Read the saved `nextAction` and pending approval.
3. Continue only with the tool allowed by that state.
4. At `product_approved`, use the Claude-active visual-context, visual-submission,
   market-context, and market-submission sequence. Never call a server-generated
   market-synthesis fallback.
5. At `market_ready`, present the accepted Claude submission and request the
   exact market checkpoint decision.
6. At `market_approved`, run the Claude-active brand context and submission
   sequence. Never call a server-generated brand fallback.
7. At `brand_ready`, present the exact accepted Claude submission and request one
   saved direction.
8. At `brand_approved`, run or continue advertising collection and then use the
   Claude-active advertising context and submission sequence. Never replace it
   with server-generated conclusions.
9. After advertising acceptance, run name screening and request one exact
   candidate selection. Never treat the approved direction as the final name.
10. After name selection, obtain the creative context, submit exactly nine
    Claude-authored briefs, show the valid quote, and require explicit credit
    approval.
11. Resume approved generation until all assets are stored. No automated visual
    QA is performed. Show the three native
    review groups, then call `get_launch_result` with `view: creative_review`
    before recording the creative decision.
12. At `creative_approved`, call `build_launch_package` automatically and return
    its project-page link through `get_launch_result` with `view: package`.
13. At `completed`, use `get_launch_result` with `view: package` for the standard
    display. `get_launch_package` remains the text-only fallback. Do not rebuild
    the package.

### User Decision

Call `record_launch_approval` only when all of the following are true:

- `get_launch_project` reports a pending approval;
- the checkpoint matches that pending approval; and
- the user explicitly approved or rejected it.

Call `revise_launch_decision` only after an explicit request to change a previously
approved decision. Call `cancel_launch_project` only after an explicit request to
cancel the project.

For the `product` checkpoint:

- use only a candidate returned in the pending approval request;
- include that candidate's numeric ID in `details.productId`;
- never approve a candidate with a `Reject` verdict; and
- do not begin market research before the saved state is `product_approved`.

For the `market` checkpoint:

- use only a country and buyer profile returned in the pending approval request;
- include the country code in `details.countryCode`;
- include the saved profile ID in `details.buyerProfileId`;
- require the user's explicit selection of both values; and
- do not begin branding before the saved state is `market_approved`.

For the `brand` checkpoint:

- use only a direction returned in the pending approval request;
- include the exact saved direction ID in `details.brandDirectionId`;
- require the user's explicit selection of one direction; and
- continue automatically into Phase 7R after brand approval.

For the `creative` checkpoint:

- show all nine current artifacts across the logo, product-image, and Facebook
  ad-image review groups before asking for a decision;
- include every current artifact ID in either `details.approvedArtifactIds` or
  `details.rejectedArtifactIds` exactly once;
- for approval, reject none and include all nine approved IDs;
- for rejection, include one exact `{ artifactId, feedback }` revision item for
  every rejected ID; and
- never approve, reject, regenerate, or spend revision credits from vague or
  inferred intent.

## Intake Facts

Required launch facts are controlled by the Ecomhunt server. Optional fields are
not blockers unless Ecomhunt explicitly returns them as blockers.

Treat these sources differently:

- current user request or direct answer: eligible for `user_supplied`;
- approved Ecomhunt commercial phrase: server-owned `ecomhunt_derived`;
- public store inspection: untrusted external evidence;
- Claude suggestion or assumption: do not persist as fact.

## Phase Boundaries

The Skill must not simulate unfinished stages. In particular:

- do not turn `search_products` into the persistent validation stage; use
  `run_product_validation`;
- do not invent or alter Ecomhunt's Test, Watch, or Reject verdicts;
- do not replace Ecomhunt Trend Analysis or market research with generic model
  or web research;
- do not describe Google Trends relative regional search interest as target
  market recommendations;
- do not claim a stage completed unless the project state says so;
- do not ask whether to continue after ordinary internal steps, but respect an
  explicit user instruction to stop before product discovery;
- at `brief_ready`, run product validation only when requested;
- at `candidates_ready`, do not continue until the user chooses and approves a
  candidate;
- at `product_approved`, use `get_product_visual_context`,
  `submit_product_visual_analysis`, `get_market_research_context`, and
  `submit_market_research` without an added user checkpoint;
- at `market_ready`, do not continue until the user chooses one listed country
  and one saved buyer profile;
- at `market_approved`, use `get_brand_strategy_context` and
  `submit_brand_strategy` for a full launch request without an added checkpoint;
- at `brand_ready`, do not continue until the user chooses one saved brand
  direction;
- at `brand_approved`, run the Phase 7R collection, context, and Claude
  submission sequence without an added user checkpoint;
- after advertising acceptance, screen names and stop only for one exact
  user-selected candidate;
- do not create a creative quote before all nine Claude-authored briefs pass
  Ecomhunt validation;
- never treat a direction name as the final brand name or select a screened
  candidate for the user;
- never start generation or revision work without explicit approval of the
  exact displayed credit charge;
- never expose `retrying_provider` or ask the user whether to retry a temporary
  image-service or storage failure;
- never run automated visual QA; every stored image must be shown to the user,
  who alone approves or rejects it;
- after generation, show `logo`, `product_images`, and `facebook_ads` as three
  separate native review groups before the creative checkpoint;
- at `creative_approved`, build the launch package without another checkpoint,
  creative regeneration, or credit charge;
- after returning the completed package link, stop without Shopify construction
  or publishing work;
- keep exact user commercial wording separate from any Ecomhunt-derived planning
  objective in the user-facing summary;
- do not surface optional unknown fields or server-side assumptions as follow-up
  questions.
