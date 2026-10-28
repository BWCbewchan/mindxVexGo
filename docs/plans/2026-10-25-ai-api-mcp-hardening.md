# Assembly AI API and MCP upgrade

Goal: make AI commands predictable, diagnosable and usable for actual GO/IQ editing, with detailed guidance and regression evidence.

The existing browser API remains authoritative. The local MCP companion forwards registered commands to one explicitly paired editor. Alternatives considered: documentation-only improvements leave silent input coercion unresolved; a second server-side editing engine would diverge from CAD/kit/Undo. Use shared validation and the current editor transaction instead.

1. Reproduce malformed-input behavior before editing. Enforce the published JSON schemas, reject unknown properties/non-finite coordinates/missing changes, snapshot arguments before queuing, and attach request IDs, durations and actionable error codes. Test rejected writes leave project/history unchanged.
2. Add read-only compatible connection lookup and runtime diagnostics. Add group/part duplication through existing copySelection and transaction/kit/collision logic. Preserve internal mates and clone group IDs; detach copied external references. Test GO and IQ workflows, locked layers, kit exhaustion and Undo/Redo.
3. Harden relay input/lifecycle: identical validation before queuing, origin-bound sessions, deadlines, cancellable queued requests, bounded diagnostic history without tokens/model payloads. Keep uncertain in-progress cancellations explicit; never automatically retry writes.
4. Improve Help AI panel with setup status, API health checks, command picker/schema/examples, validation errors, command outcomes and connection troubleshooting. Read-only checks never insert demo parts in a user's model.
5. Expand isolated API/MCP/browser tests to exercise every command, real stdio tools, malformed transport, permissions, cancellation and disconnect. Save coverage evidence. Run build, typecheck and encoding checks, then leave production on port 3120.

Files: public/assembly/{api-contract,ai-api,ai-bridge,help}.js, help.css; scripts/assembly-mcp*.mjs and test-assembly-*.mjs; docs/assembly-ai*.md. Do not push, alter global MCP configuration or modify unrelated model drafts.
