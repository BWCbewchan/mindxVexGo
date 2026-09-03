# mindX VEX GO Studio

Next.js web shell with the VEXcode GO editor extracted from the supplied APK.
The prepared editor assets are included in `public/editor`, so cloning this
repository does not require the APK.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3100/studio.

For a production build:

```sh
npm run build
npm start
```

## Controls

Create functions in **My Blocks → Make a Block**, then use **Controls** to
assign keys. **Dock** toggles the key bar; its collapse button hides it.
Bindings are saved in the current browser. Enable controls before running
functions. Escape and Stop request a stop.

The editor defaults to English, without a language selector. Share and Feedback
are omitted from the toolbar. Editing is available on desktop and mobile;
robot connectivity requires Web Bluetooth and a secure context (HTTPS or
localhost). Physical robot execution has not been verified.

See [the device compatibility matrix](docs/compatibility.md) for tested browser
layouts, connection limits, and local verification commands.

## Editor adaptations

`scripts/prepare-editor.mjs` reproduces the vendor bundle adaptations from
`apk-extracted/assets/webapp` when the original APK has been extracted locally.
This is optional for normal development and builds. APKs, extracted originals,
dependencies and local test artifacts are excluded from Git.

The bundled editor retains its original VEXcode third-party notices and assets.
