# Assembly Help and AI MCP implementation plan

User requirements: add Help beside File/Edit/View, explain every existing editor action, and make AI work through API/MCP instead of mouse automation. Support GO and IQ and retain the exact editor validation, undo, kit and CAD fit checks.

1. Inventory the live API and publish a shared, versioned command contract with JSON schemas and practical examples. Add catalog reference reads so AI can plan attachments without inserting temporary parts. Keep execute serial and compatible.
2. Add an accessible Help dialog with searchable Vietnamese topics, shortcuts, a short interactive orientation tour, and an AI/API area with examples, a downloadable command reference and connection state. Respect Escape, focus return and existing unsaved models.
3. Add optional local MCP stdio companion using the official SDK. Its HTTP relay binds only 127.0.0.1, requires a random per-process bearer token and validates exact origins/Host. The user explicitly pairs one open editor. Poll commands only while paired, and disconnect cancels pending requests. Expose read and mutation tools separately with truthful annotations. No remote database, global MCP configuration, arbitrary eval or browser profile/CDP access.
4. The browser bridge dispatches only registered editor commands through the existing API; no alternative edit engine. The MCP host receives structured results and errors. Serve Next/Vercel as usual; only the companion is local and optional.
5. Test command contracts/API compatibility, menu/search/tour/keyboard/focus in GO/IQ, full stdio-to-relay-to-editor attachment and undo, bad token/origin, session takeover, timeout/disconnect and stale-result rejection. Build/typecheck/encoding, restart production for user testing.
