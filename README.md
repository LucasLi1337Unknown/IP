# IP

A free public IP checker with a clean interface.

## Use it

Open [IP Check](https://lucasli1337unknown.github.io/IP/) and click **Find my IP**. It checks public IPv4, IPv6, and the address used by a dual-stack request. Copy, hide, and refresh your result. Inspect a pasted IP locally without sending it anywhere.

Open `index.html` locally or serve this directory with `python3 -m http.server 8000`. No build step, npm dependencies, account, payment, or API key.

## How it works

GitHub Pages hosts HTML, CSS, and JavaScript. Browser requests go directly to [ipify](https://www.ipify.org/): `api.ipify.org`, `api6.ipify.org`, and `api64.ipify.org`, using HTTPS JSON responses and eight-second timeouts. The dual-stack endpoint can return either protocol; it is not evidence that both work. Failures are reported as unavailable rather than claiming a network lacks IPv6.

The app stores no IP history and includes no analytics, cookies, or database. GitHub and ipify receive ordinary connection information when their services are used. IP checks run only after clicking the button. Pasted address inspection runs locally. Hide conceals the displayed results, but does not erase the underlying value from browser memory.

VPNs and proxies may return an exit IP. This tool does not locate a person, discover someone's private network IP, or determine an exact home address.

## Validation

Run `node test.cjs` for address parsing checks. For deployment: Settings → Pages → Deploy from a branch → main → / (root).
