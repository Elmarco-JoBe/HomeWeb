# Development Handoff

## Project

Mobile-first web app for remote home-heating mode control. Planned stack: Next.js on Vercel, Supabase Auth and PostgreSQL. Raspberry Pi remains responsible for local heating control and must continue operating without internet access.

## Requirements confirmed

- MVP is one mobile-first page for selecting a heating mode.
- Show requested mode separately from the mode confirmed active by Raspberry Pi.
- Show Pi availability, last communication time, and result of the latest mode change.
- Pi polls the backend over HTTPS; it is not publicly exposed. A 5-second polling interval is an initial target.
- New modes may be added later. Keep mode identifiers and UI labels extensible.
- The existing Python script does not implement explicit mode switching yet; its behavior currently depends on commented-out output controls and hardcoded manual values.
- Do not treat either of the previously mentioned mode sets as final. Agree the initial mode definitions before connecting them to the hardware.
- Grafana and charts are deferred.

## Current workspace state

- `docs/mvp-spec.md` contains the MVP architecture and requirements.
- A Next.js scaffold and initial mobile-first UI were created in the workspace root and under `web/` during troubleshooting.
- The workspace is on `Z:` mapped to `\\vmware-host\Shared Folders`. npm dependency installation stalls or leaves partial `node_modules` there. The app build has not been verified.
- Do not continue installing dependencies on this shared folder.

## Resume steps

1. Copy or clone the workspace to a local Windows drive, for example `C:\Users\Programmers\source\HomeWeb`, then open that local folder in VS Code.
2. Inspect the copied project and keep one Next.js app location; the root and `web/` may both contain scaffold artifacts from the interrupted setup.
3. Install dependencies only in the chosen app folder on the local drive and run its production build.
4. Continue with Supabase Auth, then a dynamic mode model and the requested-vs-active state flow.
5. Before implementing Pi synchronization, confirm the mode semantics and safe local fallback behavior with the user. Do not let the web app become necessary for local regulation.