var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function set_current_component(component4) {
  current_component = component4;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component4, name) {
  if (!component4 || !component4.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component4;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css3) => css3.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/index.js
function error(status, body) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, body);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder.encode(body).byteLength.toString());
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function fail(status, data) {
  return new ActionFailure(status, data);
}
var HttpError, Redirect, ActionFailure, encoder;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = class {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body) {
        this.status = status;
        if (typeof body === "string") {
          this.body = { message: body };
        } else if (body) {
          this.body = body;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    ActionFailure = class {
      /**
       * @param {number} status
       * @param {T} [data]
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder = new TextEncoder();
  }
});

// .svelte-kit/output/server/chunks/index2.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_ssr();
    subscriber_queue = [];
  }
});

// .svelte-kit/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_ssr();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var logo, github, css$1, Header, css, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    init_stores();
    logo = "/_app/immutable/assets/svelte-logo.87df40b8.svg";
    github = "/_app/immutable/assets/github.1ea8d62e.svg";
    css$1 = {
      code: "header.svelte-1u9z1tp.svelte-1u9z1tp{display:flex;justify-content:space-between}.corner.svelte-1u9z1tp.svelte-1u9z1tp{width:3em;height:3em}.corner.svelte-1u9z1tp a.svelte-1u9z1tp{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.corner.svelte-1u9z1tp img.svelte-1u9z1tp{width:2em;height:2em;object-fit:contain}nav.svelte-1u9z1tp.svelte-1u9z1tp{display:flex;justify-content:center;--background:rgba(255, 255, 255, 0.7)}svg.svelte-1u9z1tp.svelte-1u9z1tp{width:2em;height:3em;display:block}path.svelte-1u9z1tp.svelte-1u9z1tp{fill:var(--background)}ul.svelte-1u9z1tp.svelte-1u9z1tp{position:relative;padding:0;margin:0;height:3em;display:flex;justify-content:center;align-items:center;list-style:none;background:var(--background);background-size:contain}li.svelte-1u9z1tp.svelte-1u9z1tp{position:relative;height:100%}li[aria-current='page'].svelte-1u9z1tp.svelte-1u9z1tp::before{--size:6px;content:'';width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--color-theme-1)}nav.svelte-1u9z1tp a.svelte-1u9z1tp{display:flex;height:100%;align-items:center;padding:0 0.5rem;color:var(--color-text);font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;transition:color 0.2s linear}a.svelte-1u9z1tp.svelte-1u9z1tp:hover{color:var(--color-theme-1)}",
      map: null
    };
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$result.css.add(css$1);
      $$unsubscribe_page();
      return `<header class="svelte-1u9z1tp"><div class="corner svelte-1u9z1tp"><a href="https://kit.svelte.dev" class="svelte-1u9z1tp"><img${add_attribute("src", logo, 0)} alt="SvelteKit" class="svelte-1u9z1tp"></a></div> <nav class="svelte-1u9z1tp"><svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-1u9z1tp"><path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" class="svelte-1u9z1tp"></path></svg> <ul class="svelte-1u9z1tp"><li${add_attribute("aria-current", $page.url.pathname === "/" ? "page" : void 0, 0)} class="svelte-1u9z1tp"><a href="/" class="svelte-1u9z1tp" data-svelte-h="svelte-5a0zws">Home</a></li> <li${add_attribute("aria-current", $page.url.pathname === "/about" ? "page" : void 0, 0)} class="svelte-1u9z1tp"><a href="/about" class="svelte-1u9z1tp" data-svelte-h="svelte-iphxk9">About</a></li> <li${add_attribute(
        "aria-current",
        $page.url.pathname.startsWith("/sverdle") ? "page" : void 0,
        0
      )} class="svelte-1u9z1tp"><a href="/sverdle" class="svelte-1u9z1tp" data-svelte-h="svelte-1mtf8rh">Sverdle</a></li></ul> <svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-1u9z1tp"><path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" class="svelte-1u9z1tp"></path></svg></nav> <div class="corner svelte-1u9z1tp"><a href="https://github.com/sveltejs/kit" class="svelte-1u9z1tp"><img${add_attribute("src", github, 0)} alt="GitHub" class="svelte-1u9z1tp"></a></div> </header>`;
    });
    css = {
      code: ".app.svelte-8o1gnw.svelte-8o1gnw{display:flex;flex-direction:column;min-height:100vh}main.svelte-8o1gnw.svelte-8o1gnw{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:64rem;margin:0 auto;box-sizing:border-box}footer.svelte-8o1gnw.svelte-8o1gnw{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:12px}footer.svelte-8o1gnw a.svelte-8o1gnw{font-weight:bold}@media(min-width: 480px){footer.svelte-8o1gnw.svelte-8o1gnw{padding:12px 0}}",
      map: null
    };
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css);
      return `<div class="app svelte-8o1gnw">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="svelte-8o1gnw">${slots.default ? slots.default({}) : ``}</main> <footer class="svelte-8o1gnw" data-svelte-h="svelte-1dlfr5"><p>visit <a href="https://kit.svelte.dev" class="svelte-8o1gnw">kit.svelte.dev</a> to learn SvelteKit</p></footer> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    imports = ["_app/immutable/nodes/0.d70615dc.js", "_app/immutable/chunks/scheduler.f1cf81fe.js", "_app/immutable/chunks/index.711e9b05.js", "_app/immutable/chunks/stores.c91496a1.js", "_app/immutable/chunks/singletons.39635090.js", "_app/immutable/chunks/index.c6cf24cb.js"];
    stylesheets = ["_app/immutable/assets/0.fa9427ff.css"];
    fonts = ["_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.3df7909e.woff2", "_app/immutable/assets/fira-mono-all-400-normal.1e3b098c.woff", "_app/immutable/assets/fira-mono-cyrillic-400-normal.c7d433fd.woff2", "_app/immutable/assets/fira-mono-greek-ext-400-normal.9e2fe623.woff2", "_app/immutable/assets/fira-mono-greek-400-normal.a8be01ce.woff2", "_app/immutable/assets/fira-mono-latin-ext-400-normal.6bfabd30.woff2", "_app/immutable/assets/fira-mono-latin-400-normal.e43b3538.woff2"];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    imports2 = ["_app/immutable/nodes/1.6e408c18.js", "_app/immutable/chunks/scheduler.f1cf81fe.js", "_app/immutable/chunks/index.711e9b05.js", "_app/immutable/chunks/stores.c91496a1.js", "_app/immutable/chunks/singletons.39635090.js", "_app/immutable/chunks/index.c6cf24cb.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/sverdle/_page.server.ts.js
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  actions: () => actions,
  load: () => load
});
var words, allowed, Game, load, actions;
var init_page_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/sverdle/_page.server.ts.js"() {
    init_chunks();
    words = [
      "aback",
      "abase",
      "abate",
      "abbey",
      "abbot",
      "abhor",
      "abide",
      "abled",
      "abode",
      "abort",
      "about",
      "above",
      "abuse",
      "abyss",
      "acorn",
      "acrid",
      "actor",
      "acute",
      "adage",
      "adapt",
      "adept",
      "admin",
      "admit",
      "adobe",
      "adopt",
      "adore",
      "adorn",
      "adult",
      "affix",
      "afire",
      "afoot",
      "afoul",
      "after",
      "again",
      "agape",
      "agate",
      "agent",
      "agile",
      "aging",
      "aglow",
      "agony",
      "agora",
      "agree",
      "ahead",
      "aider",
      "aisle",
      "alarm",
      "album",
      "alert",
      "algae",
      "alibi",
      "alien",
      "align",
      "alike",
      "alive",
      "allay",
      "alley",
      "allot",
      "allow",
      "alloy",
      "aloft",
      "alone",
      "along",
      "aloof",
      "aloud",
      "alpha",
      "altar",
      "alter",
      "amass",
      "amaze",
      "amber",
      "amble",
      "amend",
      "amiss",
      "amity",
      "among",
      "ample",
      "amply",
      "amuse",
      "angel",
      "anger",
      "angle",
      "angry",
      "angst",
      "anime",
      "ankle",
      "annex",
      "annoy",
      "annul",
      "anode",
      "antic",
      "anvil",
      "aorta",
      "apart",
      "aphid",
      "aping",
      "apnea",
      "apple",
      "apply",
      "apron",
      "aptly",
      "arbor",
      "ardor",
      "arena",
      "argue",
      "arise",
      "armor",
      "aroma",
      "arose",
      "array",
      "arrow",
      "arson",
      "artsy",
      "ascot",
      "ashen",
      "aside",
      "askew",
      "assay",
      "asset",
      "atoll",
      "atone",
      "attic",
      "audio",
      "audit",
      "augur",
      "aunty",
      "avail",
      "avert",
      "avian",
      "avoid",
      "await",
      "awake",
      "award",
      "aware",
      "awash",
      "awful",
      "awoke",
      "axial",
      "axiom",
      "axion",
      "azure",
      "bacon",
      "badge",
      "badly",
      "bagel",
      "baggy",
      "baker",
      "baler",
      "balmy",
      "banal",
      "banjo",
      "barge",
      "baron",
      "basal",
      "basic",
      "basil",
      "basin",
      "basis",
      "baste",
      "batch",
      "bathe",
      "baton",
      "batty",
      "bawdy",
      "bayou",
      "beach",
      "beady",
      "beard",
      "beast",
      "beech",
      "beefy",
      "befit",
      "began",
      "begat",
      "beget",
      "begin",
      "begun",
      "being",
      "belch",
      "belie",
      "belle",
      "belly",
      "below",
      "bench",
      "beret",
      "berry",
      "berth",
      "beset",
      "betel",
      "bevel",
      "bezel",
      "bible",
      "bicep",
      "biddy",
      "bigot",
      "bilge",
      "billy",
      "binge",
      "bingo",
      "biome",
      "birch",
      "birth",
      "bison",
      "bitty",
      "black",
      "blade",
      "blame",
      "bland",
      "blank",
      "blare",
      "blast",
      "blaze",
      "bleak",
      "bleat",
      "bleed",
      "bleep",
      "blend",
      "bless",
      "blimp",
      "blind",
      "blink",
      "bliss",
      "blitz",
      "bloat",
      "block",
      "bloke",
      "blond",
      "blood",
      "bloom",
      "blown",
      "bluer",
      "bluff",
      "blunt",
      "blurb",
      "blurt",
      "blush",
      "board",
      "boast",
      "bobby",
      "boney",
      "bongo",
      "bonus",
      "booby",
      "boost",
      "booth",
      "booty",
      "booze",
      "boozy",
      "borax",
      "borne",
      "bosom",
      "bossy",
      "botch",
      "bough",
      "boule",
      "bound",
      "bowel",
      "boxer",
      "brace",
      "braid",
      "brain",
      "brake",
      "brand",
      "brash",
      "brass",
      "brave",
      "bravo",
      "brawl",
      "brawn",
      "bread",
      "break",
      "breed",
      "briar",
      "bribe",
      "brick",
      "bride",
      "brief",
      "brine",
      "bring",
      "brink",
      "briny",
      "brisk",
      "broad",
      "broil",
      "broke",
      "brood",
      "brook",
      "broom",
      "broth",
      "brown",
      "brunt",
      "brush",
      "brute",
      "buddy",
      "budge",
      "buggy",
      "bugle",
      "build",
      "built",
      "bulge",
      "bulky",
      "bully",
      "bunch",
      "bunny",
      "burly",
      "burnt",
      "burst",
      "bused",
      "bushy",
      "butch",
      "butte",
      "buxom",
      "buyer",
      "bylaw",
      "cabal",
      "cabby",
      "cabin",
      "cable",
      "cacao",
      "cache",
      "cacti",
      "caddy",
      "cadet",
      "cagey",
      "cairn",
      "camel",
      "cameo",
      "canal",
      "candy",
      "canny",
      "canoe",
      "canon",
      "caper",
      "caput",
      "carat",
      "cargo",
      "carol",
      "carry",
      "carve",
      "caste",
      "catch",
      "cater",
      "catty",
      "caulk",
      "cause",
      "cavil",
      "cease",
      "cedar",
      "cello",
      "chafe",
      "chaff",
      "chain",
      "chair",
      "chalk",
      "champ",
      "chant",
      "chaos",
      "chard",
      "charm",
      "chart",
      "chase",
      "chasm",
      "cheap",
      "cheat",
      "check",
      "cheek",
      "cheer",
      "chess",
      "chest",
      "chick",
      "chide",
      "chief",
      "child",
      "chili",
      "chill",
      "chime",
      "china",
      "chirp",
      "chock",
      "choir",
      "choke",
      "chord",
      "chore",
      "chose",
      "chuck",
      "chump",
      "chunk",
      "churn",
      "chute",
      "cider",
      "cigar",
      "cinch",
      "circa",
      "civic",
      "civil",
      "clack",
      "claim",
      "clamp",
      "clang",
      "clank",
      "clash",
      "clasp",
      "class",
      "clean",
      "clear",
      "cleat",
      "cleft",
      "clerk",
      "click",
      "cliff",
      "climb",
      "cling",
      "clink",
      "cloak",
      "clock",
      "clone",
      "close",
      "cloth",
      "cloud",
      "clout",
      "clove",
      "clown",
      "cluck",
      "clued",
      "clump",
      "clung",
      "coach",
      "coast",
      "cobra",
      "cocoa",
      "colon",
      "color",
      "comet",
      "comfy",
      "comic",
      "comma",
      "conch",
      "condo",
      "conic",
      "copse",
      "coral",
      "corer",
      "corny",
      "couch",
      "cough",
      "could",
      "count",
      "coupe",
      "court",
      "coven",
      "cover",
      "covet",
      "covey",
      "cower",
      "coyly",
      "crack",
      "craft",
      "cramp",
      "crane",
      "crank",
      "crash",
      "crass",
      "crate",
      "crave",
      "crawl",
      "craze",
      "crazy",
      "creak",
      "cream",
      "credo",
      "creed",
      "creek",
      "creep",
      "creme",
      "crepe",
      "crept",
      "cress",
      "crest",
      "crick",
      "cried",
      "crier",
      "crime",
      "crimp",
      "crisp",
      "croak",
      "crock",
      "crone",
      "crony",
      "crook",
      "cross",
      "croup",
      "crowd",
      "crown",
      "crude",
      "cruel",
      "crumb",
      "crump",
      "crush",
      "crust",
      "crypt",
      "cubic",
      "cumin",
      "curio",
      "curly",
      "curry",
      "curse",
      "curve",
      "curvy",
      "cutie",
      "cyber",
      "cycle",
      "cynic",
      "daddy",
      "daily",
      "dairy",
      "daisy",
      "dally",
      "dance",
      "dandy",
      "datum",
      "daunt",
      "dealt",
      "death",
      "debar",
      "debit",
      "debug",
      "debut",
      "decal",
      "decay",
      "decor",
      "decoy",
      "decry",
      "defer",
      "deign",
      "deity",
      "delay",
      "delta",
      "delve",
      "demon",
      "demur",
      "denim",
      "dense",
      "depot",
      "depth",
      "derby",
      "deter",
      "detox",
      "deuce",
      "devil",
      "diary",
      "dicey",
      "digit",
      "dilly",
      "dimly",
      "diner",
      "dingo",
      "dingy",
      "diode",
      "dirge",
      "dirty",
      "disco",
      "ditch",
      "ditto",
      "ditty",
      "diver",
      "dizzy",
      "dodge",
      "dodgy",
      "dogma",
      "doing",
      "dolly",
      "donor",
      "donut",
      "dopey",
      "doubt",
      "dough",
      "dowdy",
      "dowel",
      "downy",
      "dowry",
      "dozen",
      "draft",
      "drain",
      "drake",
      "drama",
      "drank",
      "drape",
      "drawl",
      "drawn",
      "dread",
      "dream",
      "dress",
      "dried",
      "drier",
      "drift",
      "drill",
      "drink",
      "drive",
      "droit",
      "droll",
      "drone",
      "drool",
      "droop",
      "dross",
      "drove",
      "drown",
      "druid",
      "drunk",
      "dryer",
      "dryly",
      "duchy",
      "dully",
      "dummy",
      "dumpy",
      "dunce",
      "dusky",
      "dusty",
      "dutch",
      "duvet",
      "dwarf",
      "dwell",
      "dwelt",
      "dying",
      "eager",
      "eagle",
      "early",
      "earth",
      "easel",
      "eaten",
      "eater",
      "ebony",
      "eclat",
      "edict",
      "edify",
      "eerie",
      "egret",
      "eight",
      "eject",
      "eking",
      "elate",
      "elbow",
      "elder",
      "elect",
      "elegy",
      "elfin",
      "elide",
      "elite",
      "elope",
      "elude",
      "email",
      "embed",
      "ember",
      "emcee",
      "empty",
      "enact",
      "endow",
      "enema",
      "enemy",
      "enjoy",
      "ennui",
      "ensue",
      "enter",
      "entry",
      "envoy",
      "epoch",
      "epoxy",
      "equal",
      "equip",
      "erase",
      "erect",
      "erode",
      "error",
      "erupt",
      "essay",
      "ester",
      "ether",
      "ethic",
      "ethos",
      "etude",
      "evade",
      "event",
      "every",
      "evict",
      "evoke",
      "exact",
      "exalt",
      "excel",
      "exert",
      "exile",
      "exist",
      "expel",
      "extol",
      "extra",
      "exult",
      "eying",
      "fable",
      "facet",
      "faint",
      "fairy",
      "faith",
      "false",
      "fancy",
      "fanny",
      "farce",
      "fatal",
      "fatty",
      "fault",
      "fauna",
      "favor",
      "feast",
      "fecal",
      "feign",
      "fella",
      "felon",
      "femme",
      "femur",
      "fence",
      "feral",
      "ferry",
      "fetal",
      "fetch",
      "fetid",
      "fetus",
      "fever",
      "fewer",
      "fiber",
      "fibre",
      "ficus",
      "field",
      "fiend",
      "fiery",
      "fifth",
      "fifty",
      "fight",
      "filer",
      "filet",
      "filly",
      "filmy",
      "filth",
      "final",
      "finch",
      "finer",
      "first",
      "fishy",
      "fixer",
      "fizzy",
      "fjord",
      "flack",
      "flail",
      "flair",
      "flake",
      "flaky",
      "flame",
      "flank",
      "flare",
      "flash",
      "flask",
      "fleck",
      "fleet",
      "flesh",
      "flick",
      "flier",
      "fling",
      "flint",
      "flirt",
      "float",
      "flock",
      "flood",
      "floor",
      "flora",
      "floss",
      "flour",
      "flout",
      "flown",
      "fluff",
      "fluid",
      "fluke",
      "flume",
      "flung",
      "flunk",
      "flush",
      "flute",
      "flyer",
      "foamy",
      "focal",
      "focus",
      "foggy",
      "foist",
      "folio",
      "folly",
      "foray",
      "force",
      "forge",
      "forgo",
      "forte",
      "forth",
      "forty",
      "forum",
      "found",
      "foyer",
      "frail",
      "frame",
      "frank",
      "fraud",
      "freak",
      "freed",
      "freer",
      "fresh",
      "friar",
      "fried",
      "frill",
      "frisk",
      "fritz",
      "frock",
      "frond",
      "front",
      "frost",
      "froth",
      "frown",
      "froze",
      "fruit",
      "fudge",
      "fugue",
      "fully",
      "fungi",
      "funky",
      "funny",
      "furor",
      "furry",
      "fussy",
      "fuzzy",
      "gaffe",
      "gaily",
      "gamer",
      "gamma",
      "gamut",
      "gassy",
      "gaudy",
      "gauge",
      "gaunt",
      "gauze",
      "gavel",
      "gawky",
      "gayer",
      "gayly",
      "gazer",
      "gecko",
      "geeky",
      "geese",
      "genie",
      "genre",
      "ghost",
      "ghoul",
      "giant",
      "giddy",
      "gipsy",
      "girly",
      "girth",
      "given",
      "giver",
      "glade",
      "gland",
      "glare",
      "glass",
      "glaze",
      "gleam",
      "glean",
      "glide",
      "glint",
      "gloat",
      "globe",
      "gloom",
      "glory",
      "gloss",
      "glove",
      "glyph",
      "gnash",
      "gnome",
      "godly",
      "going",
      "golem",
      "golly",
      "gonad",
      "goner",
      "goody",
      "gooey",
      "goofy",
      "goose",
      "gorge",
      "gouge",
      "gourd",
      "grace",
      "grade",
      "graft",
      "grail",
      "grain",
      "grand",
      "grant",
      "grape",
      "graph",
      "grasp",
      "grass",
      "grate",
      "grave",
      "gravy",
      "graze",
      "great",
      "greed",
      "green",
      "greet",
      "grief",
      "grill",
      "grime",
      "grimy",
      "grind",
      "gripe",
      "groan",
      "groin",
      "groom",
      "grope",
      "gross",
      "group",
      "grout",
      "grove",
      "growl",
      "grown",
      "gruel",
      "gruff",
      "grunt",
      "guard",
      "guava",
      "guess",
      "guest",
      "guide",
      "guild",
      "guile",
      "guilt",
      "guise",
      "gulch",
      "gully",
      "gumbo",
      "gummy",
      "guppy",
      "gusto",
      "gusty",
      "gypsy",
      "habit",
      "hairy",
      "halve",
      "handy",
      "happy",
      "hardy",
      "harem",
      "harpy",
      "harry",
      "harsh",
      "haste",
      "hasty",
      "hatch",
      "hater",
      "haunt",
      "haute",
      "haven",
      "havoc",
      "hazel",
      "heady",
      "heard",
      "heart",
      "heath",
      "heave",
      "heavy",
      "hedge",
      "hefty",
      "heist",
      "helix",
      "hello",
      "hence",
      "heron",
      "hilly",
      "hinge",
      "hippo",
      "hippy",
      "hitch",
      "hoard",
      "hobby",
      "hoist",
      "holly",
      "homer",
      "honey",
      "honor",
      "horde",
      "horny",
      "horse",
      "hotel",
      "hotly",
      "hound",
      "house",
      "hovel",
      "hover",
      "howdy",
      "human",
      "humid",
      "humor",
      "humph",
      "humus",
      "hunch",
      "hunky",
      "hurry",
      "husky",
      "hussy",
      "hutch",
      "hydro",
      "hyena",
      "hymen",
      "hyper",
      "icily",
      "icing",
      "ideal",
      "idiom",
      "idiot",
      "idler",
      "idyll",
      "igloo",
      "iliac",
      "image",
      "imbue",
      "impel",
      "imply",
      "inane",
      "inbox",
      "incur",
      "index",
      "inept",
      "inert",
      "infer",
      "ingot",
      "inlay",
      "inlet",
      "inner",
      "input",
      "inter",
      "intro",
      "ionic",
      "irate",
      "irony",
      "islet",
      "issue",
      "itchy",
      "ivory",
      "jaunt",
      "jazzy",
      "jelly",
      "jerky",
      "jetty",
      "jewel",
      "jiffy",
      "joint",
      "joist",
      "joker",
      "jolly",
      "joust",
      "judge",
      "juice",
      "juicy",
      "jumbo",
      "jumpy",
      "junta",
      "junto",
      "juror",
      "kappa",
      "karma",
      "kayak",
      "kebab",
      "khaki",
      "kinky",
      "kiosk",
      "kitty",
      "knack",
      "knave",
      "knead",
      "kneed",
      "kneel",
      "knelt",
      "knife",
      "knock",
      "knoll",
      "known",
      "koala",
      "krill",
      "label",
      "labor",
      "laden",
      "ladle",
      "lager",
      "lance",
      "lanky",
      "lapel",
      "lapse",
      "large",
      "larva",
      "lasso",
      "latch",
      "later",
      "lathe",
      "latte",
      "laugh",
      "layer",
      "leach",
      "leafy",
      "leaky",
      "leant",
      "leapt",
      "learn",
      "lease",
      "leash",
      "least",
      "leave",
      "ledge",
      "leech",
      "leery",
      "lefty",
      "legal",
      "leggy",
      "lemon",
      "lemur",
      "leper",
      "level",
      "lever",
      "libel",
      "liege",
      "light",
      "liken",
      "lilac",
      "limbo",
      "limit",
      "linen",
      "liner",
      "lingo",
      "lipid",
      "lithe",
      "liver",
      "livid",
      "llama",
      "loamy",
      "loath",
      "lobby",
      "local",
      "locus",
      "lodge",
      "lofty",
      "logic",
      "login",
      "loopy",
      "loose",
      "lorry",
      "loser",
      "louse",
      "lousy",
      "lover",
      "lower",
      "lowly",
      "loyal",
      "lucid",
      "lucky",
      "lumen",
      "lumpy",
      "lunar",
      "lunch",
      "lunge",
      "lupus",
      "lurch",
      "lurid",
      "lusty",
      "lying",
      "lymph",
      "lynch",
      "lyric",
      "macaw",
      "macho",
      "macro",
      "madam",
      "madly",
      "mafia",
      "magic",
      "magma",
      "maize",
      "major",
      "maker",
      "mambo",
      "mamma",
      "mammy",
      "manga",
      "mange",
      "mango",
      "mangy",
      "mania",
      "manic",
      "manly",
      "manor",
      "maple",
      "march",
      "marry",
      "marsh",
      "mason",
      "masse",
      "match",
      "matey",
      "mauve",
      "maxim",
      "maybe",
      "mayor",
      "mealy",
      "meant",
      "meaty",
      "mecca",
      "medal",
      "media",
      "medic",
      "melee",
      "melon",
      "mercy",
      "merge",
      "merit",
      "merry",
      "metal",
      "meter",
      "metro",
      "micro",
      "midge",
      "midst",
      "might",
      "milky",
      "mimic",
      "mince",
      "miner",
      "minim",
      "minor",
      "minty",
      "minus",
      "mirth",
      "miser",
      "missy",
      "mocha",
      "modal",
      "model",
      "modem",
      "mogul",
      "moist",
      "molar",
      "moldy",
      "money",
      "month",
      "moody",
      "moose",
      "moral",
      "moron",
      "morph",
      "mossy",
      "motel",
      "motif",
      "motor",
      "motto",
      "moult",
      "mound",
      "mount",
      "mourn",
      "mouse",
      "mouth",
      "mover",
      "movie",
      "mower",
      "mucky",
      "mucus",
      "muddy",
      "mulch",
      "mummy",
      "munch",
      "mural",
      "murky",
      "mushy",
      "music",
      "musky",
      "musty",
      "myrrh",
      "nadir",
      "naive",
      "nanny",
      "nasal",
      "nasty",
      "natal",
      "naval",
      "navel",
      "needy",
      "neigh",
      "nerdy",
      "nerve",
      "never",
      "newer",
      "newly",
      "nicer",
      "niche",
      "niece",
      "night",
      "ninja",
      "ninny",
      "ninth",
      "noble",
      "nobly",
      "noise",
      "noisy",
      "nomad",
      "noose",
      "north",
      "nosey",
      "notch",
      "novel",
      "nudge",
      "nurse",
      "nutty",
      "nylon",
      "nymph",
      "oaken",
      "obese",
      "occur",
      "ocean",
      "octal",
      "octet",
      "odder",
      "oddly",
      "offal",
      "offer",
      "often",
      "olden",
      "older",
      "olive",
      "ombre",
      "omega",
      "onion",
      "onset",
      "opera",
      "opine",
      "opium",
      "optic",
      "orbit",
      "order",
      "organ",
      "other",
      "otter",
      "ought",
      "ounce",
      "outdo",
      "outer",
      "outgo",
      "ovary",
      "ovate",
      "overt",
      "ovine",
      "ovoid",
      "owing",
      "owner",
      "oxide",
      "ozone",
      "paddy",
      "pagan",
      "paint",
      "paler",
      "palsy",
      "panel",
      "panic",
      "pansy",
      "papal",
      "paper",
      "parer",
      "parka",
      "parry",
      "parse",
      "party",
      "pasta",
      "paste",
      "pasty",
      "patch",
      "patio",
      "patsy",
      "patty",
      "pause",
      "payee",
      "payer",
      "peace",
      "peach",
      "pearl",
      "pecan",
      "pedal",
      "penal",
      "pence",
      "penne",
      "penny",
      "perch",
      "peril",
      "perky",
      "pesky",
      "pesto",
      "petal",
      "petty",
      "phase",
      "phone",
      "phony",
      "photo",
      "piano",
      "picky",
      "piece",
      "piety",
      "piggy",
      "pilot",
      "pinch",
      "piney",
      "pinky",
      "pinto",
      "piper",
      "pique",
      "pitch",
      "pithy",
      "pivot",
      "pixel",
      "pixie",
      "pizza",
      "place",
      "plaid",
      "plain",
      "plait",
      "plane",
      "plank",
      "plant",
      "plate",
      "plaza",
      "plead",
      "pleat",
      "plied",
      "plier",
      "pluck",
      "plumb",
      "plume",
      "plump",
      "plunk",
      "plush",
      "poesy",
      "point",
      "poise",
      "poker",
      "polar",
      "polka",
      "polyp",
      "pooch",
      "poppy",
      "porch",
      "poser",
      "posit",
      "posse",
      "pouch",
      "pound",
      "pouty",
      "power",
      "prank",
      "prawn",
      "preen",
      "press",
      "price",
      "prick",
      "pride",
      "pried",
      "prime",
      "primo",
      "print",
      "prior",
      "prism",
      "privy",
      "prize",
      "probe",
      "prone",
      "prong",
      "proof",
      "prose",
      "proud",
      "prove",
      "prowl",
      "proxy",
      "prude",
      "prune",
      "psalm",
      "pubic",
      "pudgy",
      "puffy",
      "pulpy",
      "pulse",
      "punch",
      "pupal",
      "pupil",
      "puppy",
      "puree",
      "purer",
      "purge",
      "purse",
      "pushy",
      "putty",
      "pygmy",
      "quack",
      "quail",
      "quake",
      "qualm",
      "quark",
      "quart",
      "quash",
      "quasi",
      "queen",
      "queer",
      "quell",
      "query",
      "quest",
      "queue",
      "quick",
      "quiet",
      "quill",
      "quilt",
      "quirk",
      "quite",
      "quota",
      "quote",
      "quoth",
      "rabbi",
      "rabid",
      "racer",
      "radar",
      "radii",
      "radio",
      "rainy",
      "raise",
      "rajah",
      "rally",
      "ralph",
      "ramen",
      "ranch",
      "randy",
      "range",
      "rapid",
      "rarer",
      "raspy",
      "ratio",
      "ratty",
      "raven",
      "rayon",
      "razor",
      "reach",
      "react",
      "ready",
      "realm",
      "rearm",
      "rebar",
      "rebel",
      "rebus",
      "rebut",
      "recap",
      "recur",
      "recut",
      "reedy",
      "refer",
      "refit",
      "regal",
      "rehab",
      "reign",
      "relax",
      "relay",
      "relic",
      "remit",
      "renal",
      "renew",
      "repay",
      "repel",
      "reply",
      "rerun",
      "reset",
      "resin",
      "retch",
      "retro",
      "retry",
      "reuse",
      "revel",
      "revue",
      "rhino",
      "rhyme",
      "rider",
      "ridge",
      "rifle",
      "right",
      "rigid",
      "rigor",
      "rinse",
      "ripen",
      "riper",
      "risen",
      "riser",
      "risky",
      "rival",
      "river",
      "rivet",
      "roach",
      "roast",
      "robin",
      "robot",
      "rocky",
      "rodeo",
      "roger",
      "rogue",
      "roomy",
      "roost",
      "rotor",
      "rouge",
      "rough",
      "round",
      "rouse",
      "route",
      "rover",
      "rowdy",
      "rower",
      "royal",
      "ruddy",
      "ruder",
      "rugby",
      "ruler",
      "rumba",
      "rumor",
      "rupee",
      "rural",
      "rusty",
      "sadly",
      "safer",
      "saint",
      "salad",
      "sally",
      "salon",
      "salsa",
      "salty",
      "salve",
      "salvo",
      "sandy",
      "saner",
      "sappy",
      "sassy",
      "satin",
      "satyr",
      "sauce",
      "saucy",
      "sauna",
      "saute",
      "savor",
      "savoy",
      "savvy",
      "scald",
      "scale",
      "scalp",
      "scaly",
      "scamp",
      "scant",
      "scare",
      "scarf",
      "scary",
      "scene",
      "scent",
      "scion",
      "scoff",
      "scold",
      "scone",
      "scoop",
      "scope",
      "score",
      "scorn",
      "scour",
      "scout",
      "scowl",
      "scram",
      "scrap",
      "scree",
      "screw",
      "scrub",
      "scrum",
      "scuba",
      "sedan",
      "seedy",
      "segue",
      "seize",
      "semen",
      "sense",
      "sepia",
      "serif",
      "serum",
      "serve",
      "setup",
      "seven",
      "sever",
      "sewer",
      "shack",
      "shade",
      "shady",
      "shaft",
      "shake",
      "shaky",
      "shale",
      "shall",
      "shalt",
      "shame",
      "shank",
      "shape",
      "shard",
      "share",
      "shark",
      "sharp",
      "shave",
      "shawl",
      "shear",
      "sheen",
      "sheep",
      "sheer",
      "sheet",
      "sheik",
      "shelf",
      "shell",
      "shied",
      "shift",
      "shine",
      "shiny",
      "shire",
      "shirk",
      "shirt",
      "shoal",
      "shock",
      "shone",
      "shook",
      "shoot",
      "shore",
      "shorn",
      "short",
      "shout",
      "shove",
      "shown",
      "showy",
      "shrew",
      "shrub",
      "shrug",
      "shuck",
      "shunt",
      "shush",
      "shyly",
      "siege",
      "sieve",
      "sight",
      "sigma",
      "silky",
      "silly",
      "since",
      "sinew",
      "singe",
      "siren",
      "sissy",
      "sixth",
      "sixty",
      "skate",
      "skier",
      "skiff",
      "skill",
      "skimp",
      "skirt",
      "skulk",
      "skull",
      "skunk",
      "slack",
      "slain",
      "slang",
      "slant",
      "slash",
      "slate",
      "slave",
      "sleek",
      "sleep",
      "sleet",
      "slept",
      "slice",
      "slick",
      "slide",
      "slime",
      "slimy",
      "sling",
      "slink",
      "sloop",
      "slope",
      "slosh",
      "sloth",
      "slump",
      "slung",
      "slunk",
      "slurp",
      "slush",
      "slyly",
      "smack",
      "small",
      "smart",
      "smash",
      "smear",
      "smell",
      "smelt",
      "smile",
      "smirk",
      "smite",
      "smith",
      "smock",
      "smoke",
      "smoky",
      "smote",
      "snack",
      "snail",
      "snake",
      "snaky",
      "snare",
      "snarl",
      "sneak",
      "sneer",
      "snide",
      "sniff",
      "snipe",
      "snoop",
      "snore",
      "snort",
      "snout",
      "snowy",
      "snuck",
      "snuff",
      "soapy",
      "sober",
      "soggy",
      "solar",
      "solid",
      "solve",
      "sonar",
      "sonic",
      "sooth",
      "sooty",
      "sorry",
      "sound",
      "south",
      "sower",
      "space",
      "spade",
      "spank",
      "spare",
      "spark",
      "spasm",
      "spawn",
      "speak",
      "spear",
      "speck",
      "speed",
      "spell",
      "spelt",
      "spend",
      "spent",
      "sperm",
      "spice",
      "spicy",
      "spied",
      "spiel",
      "spike",
      "spiky",
      "spill",
      "spilt",
      "spine",
      "spiny",
      "spire",
      "spite",
      "splat",
      "split",
      "spoil",
      "spoke",
      "spoof",
      "spook",
      "spool",
      "spoon",
      "spore",
      "sport",
      "spout",
      "spray",
      "spree",
      "sprig",
      "spunk",
      "spurn",
      "spurt",
      "squad",
      "squat",
      "squib",
      "stack",
      "staff",
      "stage",
      "staid",
      "stain",
      "stair",
      "stake",
      "stale",
      "stalk",
      "stall",
      "stamp",
      "stand",
      "stank",
      "stare",
      "stark",
      "start",
      "stash",
      "state",
      "stave",
      "stead",
      "steak",
      "steal",
      "steam",
      "steed",
      "steel",
      "steep",
      "steer",
      "stein",
      "stern",
      "stick",
      "stiff",
      "still",
      "stilt",
      "sting",
      "stink",
      "stint",
      "stock",
      "stoic",
      "stoke",
      "stole",
      "stomp",
      "stone",
      "stony",
      "stood",
      "stool",
      "stoop",
      "store",
      "stork",
      "storm",
      "story",
      "stout",
      "stove",
      "strap",
      "straw",
      "stray",
      "strip",
      "strut",
      "stuck",
      "study",
      "stuff",
      "stump",
      "stung",
      "stunk",
      "stunt",
      "style",
      "suave",
      "sugar",
      "suing",
      "suite",
      "sulky",
      "sully",
      "sumac",
      "sunny",
      "super",
      "surer",
      "surge",
      "surly",
      "sushi",
      "swami",
      "swamp",
      "swarm",
      "swash",
      "swath",
      "swear",
      "sweat",
      "sweep",
      "sweet",
      "swell",
      "swept",
      "swift",
      "swill",
      "swine",
      "swing",
      "swirl",
      "swish",
      "swoon",
      "swoop",
      "sword",
      "swore",
      "sworn",
      "swung",
      "synod",
      "syrup",
      "tabby",
      "table",
      "taboo",
      "tacit",
      "tacky",
      "taffy",
      "taint",
      "taken",
      "taker",
      "tally",
      "talon",
      "tamer",
      "tango",
      "tangy",
      "taper",
      "tapir",
      "tardy",
      "tarot",
      "taste",
      "tasty",
      "tatty",
      "taunt",
      "tawny",
      "teach",
      "teary",
      "tease",
      "teddy",
      "teeth",
      "tempo",
      "tenet",
      "tenor",
      "tense",
      "tenth",
      "tepee",
      "tepid",
      "terra",
      "terse",
      "testy",
      "thank",
      "theft",
      "their",
      "theme",
      "there",
      "these",
      "theta",
      "thick",
      "thief",
      "thigh",
      "thing",
      "think",
      "third",
      "thong",
      "thorn",
      "those",
      "three",
      "threw",
      "throb",
      "throw",
      "thrum",
      "thumb",
      "thump",
      "thyme",
      "tiara",
      "tibia",
      "tidal",
      "tiger",
      "tight",
      "tilde",
      "timer",
      "timid",
      "tipsy",
      "titan",
      "tithe",
      "title",
      "toast",
      "today",
      "toddy",
      "token",
      "tonal",
      "tonga",
      "tonic",
      "tooth",
      "topaz",
      "topic",
      "torch",
      "torso",
      "torus",
      "total",
      "totem",
      "touch",
      "tough",
      "towel",
      "tower",
      "toxic",
      "toxin",
      "trace",
      "track",
      "tract",
      "trade",
      "trail",
      "train",
      "trait",
      "tramp",
      "trash",
      "trawl",
      "tread",
      "treat",
      "trend",
      "triad",
      "trial",
      "tribe",
      "trice",
      "trick",
      "tried",
      "tripe",
      "trite",
      "troll",
      "troop",
      "trope",
      "trout",
      "trove",
      "truce",
      "truck",
      "truer",
      "truly",
      "trump",
      "trunk",
      "truss",
      "trust",
      "truth",
      "tryst",
      "tubal",
      "tuber",
      "tulip",
      "tulle",
      "tumor",
      "tunic",
      "turbo",
      "tutor",
      "twang",
      "tweak",
      "tweed",
      "tweet",
      "twice",
      "twine",
      "twirl",
      "twist",
      "twixt",
      "tying",
      "udder",
      "ulcer",
      "ultra",
      "umbra",
      "uncle",
      "uncut",
      "under",
      "undid",
      "undue",
      "unfed",
      "unfit",
      "unify",
      "union",
      "unite",
      "unity",
      "unlit",
      "unmet",
      "unset",
      "untie",
      "until",
      "unwed",
      "unzip",
      "upper",
      "upset",
      "urban",
      "urine",
      "usage",
      "usher",
      "using",
      "usual",
      "usurp",
      "utile",
      "utter",
      "vague",
      "valet",
      "valid",
      "valor",
      "value",
      "valve",
      "vapid",
      "vapor",
      "vault",
      "vaunt",
      "vegan",
      "venom",
      "venue",
      "verge",
      "verse",
      "verso",
      "verve",
      "vicar",
      "video",
      "vigil",
      "vigor",
      "villa",
      "vinyl",
      "viola",
      "viper",
      "viral",
      "virus",
      "visit",
      "visor",
      "vista",
      "vital",
      "vivid",
      "vixen",
      "vocal",
      "vodka",
      "vogue",
      "voice",
      "voila",
      "vomit",
      "voter",
      "vouch",
      "vowel",
      "vying",
      "wacky",
      "wafer",
      "wager",
      "wagon",
      "waist",
      "waive",
      "waltz",
      "warty",
      "waste",
      "watch",
      "water",
      "waver",
      "waxen",
      "weary",
      "weave",
      "wedge",
      "weedy",
      "weigh",
      "weird",
      "welch",
      "welsh",
      "wench",
      "whack",
      "whale",
      "wharf",
      "wheat",
      "wheel",
      "whelp",
      "where",
      "which",
      "whiff",
      "while",
      "whine",
      "whiny",
      "whirl",
      "whisk",
      "white",
      "whole",
      "whoop",
      "whose",
      "widen",
      "wider",
      "widow",
      "width",
      "wield",
      "wight",
      "willy",
      "wimpy",
      "wince",
      "winch",
      "windy",
      "wiser",
      "wispy",
      "witch",
      "witty",
      "woken",
      "woman",
      "women",
      "woody",
      "wooer",
      "wooly",
      "woozy",
      "wordy",
      "world",
      "worry",
      "worse",
      "worst",
      "worth",
      "would",
      "wound",
      "woven",
      "wrack",
      "wrath",
      "wreak",
      "wreck",
      "wrest",
      "wring",
      "wrist",
      "write",
      "wrong",
      "wrote",
      "wrung",
      "wryly",
      "yacht",
      "yearn",
      "yeast",
      "yield",
      "young",
      "youth",
      "zebra",
      "zesty",
      "zonal"
    ];
    allowed = /* @__PURE__ */ new Set([
      ...words,
      "aahed",
      "aalii",
      "aargh",
      "aarti",
      "abaca",
      "abaci",
      "abacs",
      "abaft",
      "abaka",
      "abamp",
      "aband",
      "abash",
      "abask",
      "abaya",
      "abbas",
      "abbed",
      "abbes",
      "abcee",
      "abeam",
      "abear",
      "abele",
      "abers",
      "abets",
      "abies",
      "abler",
      "ables",
      "ablet",
      "ablow",
      "abmho",
      "abohm",
      "aboil",
      "aboma",
      "aboon",
      "abord",
      "abore",
      "abram",
      "abray",
      "abrim",
      "abrin",
      "abris",
      "absey",
      "absit",
      "abuna",
      "abune",
      "abuts",
      "abuzz",
      "abyes",
      "abysm",
      "acais",
      "acari",
      "accas",
      "accoy",
      "acerb",
      "acers",
      "aceta",
      "achar",
      "ached",
      "aches",
      "achoo",
      "acids",
      "acidy",
      "acing",
      "acini",
      "ackee",
      "acker",
      "acmes",
      "acmic",
      "acned",
      "acnes",
      "acock",
      "acold",
      "acred",
      "acres",
      "acros",
      "acted",
      "actin",
      "acton",
      "acyls",
      "adaws",
      "adays",
      "adbot",
      "addax",
      "added",
      "adder",
      "addio",
      "addle",
      "adeem",
      "adhan",
      "adieu",
      "adios",
      "adits",
      "adman",
      "admen",
      "admix",
      "adobo",
      "adown",
      "adoze",
      "adrad",
      "adred",
      "adsum",
      "aduki",
      "adunc",
      "adust",
      "advew",
      "adyta",
      "adzed",
      "adzes",
      "aecia",
      "aedes",
      "aegis",
      "aeons",
      "aerie",
      "aeros",
      "aesir",
      "afald",
      "afara",
      "afars",
      "afear",
      "aflaj",
      "afore",
      "afrit",
      "afros",
      "agama",
      "agami",
      "agars",
      "agast",
      "agave",
      "agaze",
      "agene",
      "agers",
      "agger",
      "aggie",
      "aggri",
      "aggro",
      "aggry",
      "aghas",
      "agila",
      "agios",
      "agism",
      "agist",
      "agita",
      "aglee",
      "aglet",
      "agley",
      "agloo",
      "aglus",
      "agmas",
      "agoge",
      "agone",
      "agons",
      "agood",
      "agria",
      "agrin",
      "agros",
      "agued",
      "agues",
      "aguna",
      "aguti",
      "aheap",
      "ahent",
      "ahigh",
      "ahind",
      "ahing",
      "ahint",
      "ahold",
      "ahull",
      "ahuru",
      "aidas",
      "aided",
      "aides",
      "aidoi",
      "aidos",
      "aiery",
      "aigas",
      "aight",
      "ailed",
      "aimed",
      "aimer",
      "ainee",
      "ainga",
      "aioli",
      "aired",
      "airer",
      "airns",
      "airth",
      "airts",
      "aitch",
      "aitus",
      "aiver",
      "aiyee",
      "aizle",
      "ajies",
      "ajiva",
      "ajuga",
      "ajwan",
      "akees",
      "akela",
      "akene",
      "aking",
      "akita",
      "akkas",
      "alaap",
      "alack",
      "alamo",
      "aland",
      "alane",
      "alang",
      "alans",
      "alant",
      "alapa",
      "alaps",
      "alary",
      "alate",
      "alays",
      "albas",
      "albee",
      "alcid",
      "alcos",
      "aldea",
      "alder",
      "aldol",
      "aleck",
      "alecs",
      "alefs",
      "aleft",
      "aleph",
      "alews",
      "aleye",
      "alfas",
      "algal",
      "algas",
      "algid",
      "algin",
      "algor",
      "algum",
      "alias",
      "alifs",
      "aline",
      "alist",
      "aliya",
      "alkie",
      "alkos",
      "alkyd",
      "alkyl",
      "allee",
      "allel",
      "allis",
      "allod",
      "allyl",
      "almah",
      "almas",
      "almeh",
      "almes",
      "almud",
      "almug",
      "alods",
      "aloed",
      "aloes",
      "aloha",
      "aloin",
      "aloos",
      "alowe",
      "altho",
      "altos",
      "alula",
      "alums",
      "alure",
      "alvar",
      "alway",
      "amahs",
      "amain",
      "amate",
      "amaut",
      "amban",
      "ambit",
      "ambos",
      "ambry",
      "ameba",
      "ameer",
      "amene",
      "amens",
      "ament",
      "amias",
      "amice",
      "amici",
      "amide",
      "amido",
      "amids",
      "amies",
      "amiga",
      "amigo",
      "amine",
      "amino",
      "amins",
      "amirs",
      "amlas",
      "amman",
      "ammon",
      "ammos",
      "amnia",
      "amnic",
      "amnio",
      "amoks",
      "amole",
      "amort",
      "amour",
      "amove",
      "amowt",
      "amped",
      "ampul",
      "amrit",
      "amuck",
      "amyls",
      "anana",
      "anata",
      "ancho",
      "ancle",
      "ancon",
      "andro",
      "anear",
      "anele",
      "anent",
      "angas",
      "anglo",
      "anigh",
      "anile",
      "anils",
      "anima",
      "animi",
      "anion",
      "anise",
      "anker",
      "ankhs",
      "ankus",
      "anlas",
      "annal",
      "annas",
      "annat",
      "anoas",
      "anole",
      "anomy",
      "ansae",
      "antae",
      "antar",
      "antas",
      "anted",
      "antes",
      "antis",
      "antra",
      "antre",
      "antsy",
      "anura",
      "anyon",
      "apace",
      "apage",
      "apaid",
      "apayd",
      "apays",
      "apeak",
      "apeek",
      "apers",
      "apert",
      "apery",
      "apgar",
      "aphis",
      "apian",
      "apiol",
      "apish",
      "apism",
      "apode",
      "apods",
      "apoop",
      "aport",
      "appal",
      "appay",
      "appel",
      "appro",
      "appui",
      "appuy",
      "apres",
      "apses",
      "apsis",
      "apsos",
      "apted",
      "apter",
      "aquae",
      "aquas",
      "araba",
      "araks",
      "arame",
      "arars",
      "arbas",
      "arced",
      "archi",
      "arcos",
      "arcus",
      "ardeb",
      "ardri",
      "aread",
      "areae",
      "areal",
      "arear",
      "areas",
      "areca",
      "aredd",
      "arede",
      "arefy",
      "areic",
      "arene",
      "arepa",
      "arere",
      "arete",
      "arets",
      "arett",
      "argal",
      "argan",
      "argil",
      "argle",
      "argol",
      "argon",
      "argot",
      "argus",
      "arhat",
      "arias",
      "ariel",
      "ariki",
      "arils",
      "ariot",
      "arish",
      "arked",
      "arled",
      "arles",
      "armed",
      "armer",
      "armet",
      "armil",
      "arnas",
      "arnut",
      "aroba",
      "aroha",
      "aroid",
      "arpas",
      "arpen",
      "arrah",
      "arras",
      "arret",
      "arris",
      "arroz",
      "arsed",
      "arses",
      "arsey",
      "arsis",
      "artal",
      "artel",
      "artic",
      "artis",
      "aruhe",
      "arums",
      "arval",
      "arvee",
      "arvos",
      "aryls",
      "asana",
      "ascon",
      "ascus",
      "asdic",
      "ashed",
      "ashes",
      "ashet",
      "asked",
      "asker",
      "askoi",
      "askos",
      "aspen",
      "asper",
      "aspic",
      "aspie",
      "aspis",
      "aspro",
      "assai",
      "assam",
      "asses",
      "assez",
      "assot",
      "aster",
      "astir",
      "astun",
      "asura",
      "asway",
      "aswim",
      "asyla",
      "ataps",
      "ataxy",
      "atigi",
      "atilt",
      "atimy",
      "atlas",
      "atman",
      "atmas",
      "atmos",
      "atocs",
      "atoke",
      "atoks",
      "atoms",
      "atomy",
      "atony",
      "atopy",
      "atria",
      "atrip",
      "attap",
      "attar",
      "atuas",
      "audad",
      "auger",
      "aught",
      "aulas",
      "aulic",
      "auloi",
      "aulos",
      "aumil",
      "aunes",
      "aunts",
      "aurae",
      "aural",
      "aurar",
      "auras",
      "aurei",
      "aures",
      "auric",
      "auris",
      "aurum",
      "autos",
      "auxin",
      "avale",
      "avant",
      "avast",
      "avels",
      "avens",
      "avers",
      "avgas",
      "avine",
      "avion",
      "avise",
      "aviso",
      "avize",
      "avows",
      "avyze",
      "awarn",
      "awato",
      "awave",
      "aways",
      "awdls",
      "aweel",
      "aweto",
      "awing",
      "awmry",
      "awned",
      "awner",
      "awols",
      "awork",
      "axels",
      "axile",
      "axils",
      "axing",
      "axite",
      "axled",
      "axles",
      "axman",
      "axmen",
      "axoid",
      "axone",
      "axons",
      "ayahs",
      "ayaya",
      "ayelp",
      "aygre",
      "ayins",
      "ayont",
      "ayres",
      "ayrie",
      "azans",
      "azide",
      "azido",
      "azine",
      "azlon",
      "azoic",
      "azole",
      "azons",
      "azote",
      "azoth",
      "azuki",
      "azurn",
      "azury",
      "azygy",
      "azyme",
      "azyms",
      "baaed",
      "baals",
      "babas",
      "babel",
      "babes",
      "babka",
      "baboo",
      "babul",
      "babus",
      "bacca",
      "bacco",
      "baccy",
      "bacha",
      "bachs",
      "backs",
      "baddy",
      "baels",
      "baffs",
      "baffy",
      "bafts",
      "baghs",
      "bagie",
      "bahts",
      "bahus",
      "bahut",
      "bails",
      "bairn",
      "baisa",
      "baith",
      "baits",
      "baiza",
      "baize",
      "bajan",
      "bajra",
      "bajri",
      "bajus",
      "baked",
      "baken",
      "bakes",
      "bakra",
      "balas",
      "balds",
      "baldy",
      "baled",
      "bales",
      "balks",
      "balky",
      "balls",
      "bally",
      "balms",
      "baloo",
      "balsa",
      "balti",
      "balun",
      "balus",
      "bambi",
      "banak",
      "banco",
      "bancs",
      "banda",
      "bandh",
      "bands",
      "bandy",
      "baned",
      "banes",
      "bangs",
      "bania",
      "banks",
      "banns",
      "bants",
      "bantu",
      "banty",
      "banya",
      "bapus",
      "barbe",
      "barbs",
      "barby",
      "barca",
      "barde",
      "bardo",
      "bards",
      "bardy",
      "bared",
      "barer",
      "bares",
      "barfi",
      "barfs",
      "baric",
      "barks",
      "barky",
      "barms",
      "barmy",
      "barns",
      "barny",
      "barps",
      "barra",
      "barre",
      "barro",
      "barry",
      "barye",
      "basan",
      "based",
      "basen",
      "baser",
      "bases",
      "basho",
      "basij",
      "basks",
      "bason",
      "basse",
      "bassi",
      "basso",
      "bassy",
      "basta",
      "basti",
      "basto",
      "basts",
      "bated",
      "bates",
      "baths",
      "batik",
      "batta",
      "batts",
      "battu",
      "bauds",
      "bauks",
      "baulk",
      "baurs",
      "bavin",
      "bawds",
      "bawks",
      "bawls",
      "bawns",
      "bawrs",
      "bawty",
      "bayed",
      "bayer",
      "bayes",
      "bayle",
      "bayts",
      "bazar",
      "bazoo",
      "beads",
      "beaks",
      "beaky",
      "beals",
      "beams",
      "beamy",
      "beano",
      "beans",
      "beany",
      "beare",
      "bears",
      "beath",
      "beats",
      "beaty",
      "beaus",
      "beaut",
      "beaux",
      "bebop",
      "becap",
      "becke",
      "becks",
      "bedad",
      "bedel",
      "bedes",
      "bedew",
      "bedim",
      "bedye",
      "beedi",
      "beefs",
      "beeps",
      "beers",
      "beery",
      "beets",
      "befog",
      "begad",
      "begar",
      "begem",
      "begot",
      "begum",
      "beige",
      "beigy",
      "beins",
      "bekah",
      "belah",
      "belar",
      "belay",
      "belee",
      "belga",
      "bells",
      "belon",
      "belts",
      "bemad",
      "bemas",
      "bemix",
      "bemud",
      "bends",
      "bendy",
      "benes",
      "benet",
      "benga",
      "benis",
      "benne",
      "benni",
      "benny",
      "bento",
      "bents",
      "benty",
      "bepat",
      "beray",
      "beres",
      "bergs",
      "berko",
      "berks",
      "berme",
      "berms",
      "berob",
      "beryl",
      "besat",
      "besaw",
      "besee",
      "beses",
      "besit",
      "besom",
      "besot",
      "besti",
      "bests",
      "betas",
      "beted",
      "betes",
      "beths",
      "betid",
      "beton",
      "betta",
      "betty",
      "bever",
      "bevor",
      "bevue",
      "bevvy",
      "bewet",
      "bewig",
      "bezes",
      "bezil",
      "bezzy",
      "bhais",
      "bhaji",
      "bhang",
      "bhats",
      "bhels",
      "bhoot",
      "bhuna",
      "bhuts",
      "biach",
      "biali",
      "bialy",
      "bibbs",
      "bibes",
      "biccy",
      "bices",
      "bided",
      "bider",
      "bides",
      "bidet",
      "bidis",
      "bidon",
      "bield",
      "biers",
      "biffo",
      "biffs",
      "biffy",
      "bifid",
      "bigae",
      "biggs",
      "biggy",
      "bigha",
      "bight",
      "bigly",
      "bigos",
      "bijou",
      "biked",
      "biker",
      "bikes",
      "bikie",
      "bilbo",
      "bilby",
      "biled",
      "biles",
      "bilgy",
      "bilks",
      "bills",
      "bimah",
      "bimas",
      "bimbo",
      "binal",
      "bindi",
      "binds",
      "biner",
      "bines",
      "bings",
      "bingy",
      "binit",
      "binks",
      "bints",
      "biogs",
      "biont",
      "biota",
      "biped",
      "bipod",
      "birds",
      "birks",
      "birle",
      "birls",
      "biros",
      "birrs",
      "birse",
      "birsy",
      "bises",
      "bisks",
      "bisom",
      "bitch",
      "biter",
      "bites",
      "bitos",
      "bitou",
      "bitsy",
      "bitte",
      "bitts",
      "bivia",
      "bivvy",
      "bizes",
      "bizzo",
      "bizzy",
      "blabs",
      "blads",
      "blady",
      "blaer",
      "blaes",
      "blaff",
      "blags",
      "blahs",
      "blain",
      "blams",
      "blart",
      "blase",
      "blash",
      "blate",
      "blats",
      "blatt",
      "blaud",
      "blawn",
      "blaws",
      "blays",
      "blear",
      "blebs",
      "blech",
      "blees",
      "blent",
      "blert",
      "blest",
      "blets",
      "bleys",
      "blimy",
      "bling",
      "blini",
      "blins",
      "bliny",
      "blips",
      "blist",
      "blite",
      "blits",
      "blive",
      "blobs",
      "blocs",
      "blogs",
      "blook",
      "bloop",
      "blore",
      "blots",
      "blows",
      "blowy",
      "blubs",
      "blude",
      "bluds",
      "bludy",
      "blued",
      "blues",
      "bluet",
      "bluey",
      "bluid",
      "blume",
      "blunk",
      "blurs",
      "blype",
      "boabs",
      "boaks",
      "boars",
      "boart",
      "boats",
      "bobac",
      "bobak",
      "bobas",
      "bobol",
      "bobos",
      "bocca",
      "bocce",
      "bocci",
      "boche",
      "bocks",
      "boded",
      "bodes",
      "bodge",
      "bodhi",
      "bodle",
      "boeps",
      "boets",
      "boeuf",
      "boffo",
      "boffs",
      "bogan",
      "bogey",
      "boggy",
      "bogie",
      "bogle",
      "bogue",
      "bogus",
      "bohea",
      "bohos",
      "boils",
      "boing",
      "boink",
      "boite",
      "boked",
      "bokeh",
      "bokes",
      "bokos",
      "bolar",
      "bolas",
      "bolds",
      "boles",
      "bolix",
      "bolls",
      "bolos",
      "bolts",
      "bolus",
      "bomas",
      "bombe",
      "bombo",
      "bombs",
      "bonce",
      "bonds",
      "boned",
      "boner",
      "bones",
      "bongs",
      "bonie",
      "bonks",
      "bonne",
      "bonny",
      "bonza",
      "bonze",
      "booai",
      "booay",
      "boobs",
      "boody",
      "booed",
      "boofy",
      "boogy",
      "boohs",
      "books",
      "booky",
      "bools",
      "booms",
      "boomy",
      "boong",
      "boons",
      "boord",
      "boors",
      "boose",
      "boots",
      "boppy",
      "borak",
      "boral",
      "boras",
      "borde",
      "bords",
      "bored",
      "boree",
      "borel",
      "borer",
      "bores",
      "borgo",
      "boric",
      "borks",
      "borms",
      "borna",
      "boron",
      "borts",
      "borty",
      "bortz",
      "bosie",
      "bosks",
      "bosky",
      "boson",
      "bosun",
      "botas",
      "botel",
      "botes",
      "bothy",
      "botte",
      "botts",
      "botty",
      "bouge",
      "bouks",
      "boult",
      "bouns",
      "bourd",
      "bourg",
      "bourn",
      "bouse",
      "bousy",
      "bouts",
      "bovid",
      "bowat",
      "bowed",
      "bower",
      "bowes",
      "bowet",
      "bowie",
      "bowls",
      "bowne",
      "bowrs",
      "bowse",
      "boxed",
      "boxen",
      "boxes",
      "boxla",
      "boxty",
      "boyar",
      "boyau",
      "boyed",
      "boyfs",
      "boygs",
      "boyla",
      "boyos",
      "boysy",
      "bozos",
      "braai",
      "brach",
      "brack",
      "bract",
      "brads",
      "braes",
      "brags",
      "brail",
      "braks",
      "braky",
      "brame",
      "brane",
      "brank",
      "brans",
      "brant",
      "brast",
      "brats",
      "brava",
      "bravi",
      "braws",
      "braxy",
      "brays",
      "braza",
      "braze",
      "bream",
      "brede",
      "breds",
      "breem",
      "breer",
      "brees",
      "breid",
      "breis",
      "breme",
      "brens",
      "brent",
      "brere",
      "brers",
      "breve",
      "brews",
      "breys",
      "brier",
      "bries",
      "brigs",
      "briki",
      "briks",
      "brill",
      "brims",
      "brins",
      "brios",
      "brise",
      "briss",
      "brith",
      "brits",
      "britt",
      "brize",
      "broch",
      "brock",
      "brods",
      "brogh",
      "brogs",
      "brome",
      "bromo",
      "bronc",
      "brond",
      "brool",
      "broos",
      "brose",
      "brosy",
      "brows",
      "brugh",
      "bruin",
      "bruit",
      "brule",
      "brume",
      "brung",
      "brusk",
      "brust",
      "bruts",
      "buats",
      "buaze",
      "bubal",
      "bubas",
      "bubba",
      "bubbe",
      "bubby",
      "bubus",
      "buchu",
      "bucko",
      "bucks",
      "bucku",
      "budas",
      "budis",
      "budos",
      "buffa",
      "buffe",
      "buffi",
      "buffo",
      "buffs",
      "buffy",
      "bufos",
      "bufty",
      "buhls",
      "buhrs",
      "buiks",
      "buist",
      "bukes",
      "bulbs",
      "bulgy",
      "bulks",
      "bulla",
      "bulls",
      "bulse",
      "bumbo",
      "bumfs",
      "bumph",
      "bumps",
      "bumpy",
      "bunas",
      "bunce",
      "bunco",
      "bunde",
      "bundh",
      "bunds",
      "bundt",
      "bundu",
      "bundy",
      "bungs",
      "bungy",
      "bunia",
      "bunje",
      "bunjy",
      "bunko",
      "bunks",
      "bunns",
      "bunts",
      "bunty",
      "bunya",
      "buoys",
      "buppy",
      "buran",
      "buras",
      "burbs",
      "burds",
      "buret",
      "burfi",
      "burgh",
      "burgs",
      "burin",
      "burka",
      "burke",
      "burks",
      "burls",
      "burns",
      "buroo",
      "burps",
      "burqa",
      "burro",
      "burrs",
      "burry",
      "bursa",
      "burse",
      "busby",
      "buses",
      "busks",
      "busky",
      "bussu",
      "busti",
      "busts",
      "busty",
      "buteo",
      "butes",
      "butle",
      "butoh",
      "butts",
      "butty",
      "butut",
      "butyl",
      "buzzy",
      "bwana",
      "bwazi",
      "byded",
      "bydes",
      "byked",
      "bykes",
      "byres",
      "byrls",
      "byssi",
      "bytes",
      "byway",
      "caaed",
      "cabas",
      "caber",
      "cabob",
      "caboc",
      "cabre",
      "cacas",
      "cacks",
      "cacky",
      "cadee",
      "cades",
      "cadge",
      "cadgy",
      "cadie",
      "cadis",
      "cadre",
      "caeca",
      "caese",
      "cafes",
      "caffs",
      "caged",
      "cager",
      "cages",
      "cagot",
      "cahow",
      "caids",
      "cains",
      "caird",
      "cajon",
      "cajun",
      "caked",
      "cakes",
      "cakey",
      "calfs",
      "calid",
      "calif",
      "calix",
      "calks",
      "calla",
      "calls",
      "calms",
      "calmy",
      "calos",
      "calpa",
      "calps",
      "calve",
      "calyx",
      "caman",
      "camas",
      "cames",
      "camis",
      "camos",
      "campi",
      "campo",
      "camps",
      "campy",
      "camus",
      "caned",
      "caneh",
      "caner",
      "canes",
      "cangs",
      "canid",
      "canna",
      "canns",
      "canso",
      "canst",
      "canto",
      "cants",
      "canty",
      "capas",
      "caped",
      "capes",
      "capex",
      "caphs",
      "capiz",
      "caple",
      "capon",
      "capos",
      "capot",
      "capri",
      "capul",
      "carap",
      "carbo",
      "carbs",
      "carby",
      "cardi",
      "cards",
      "cardy",
      "cared",
      "carer",
      "cares",
      "caret",
      "carex",
      "carks",
      "carle",
      "carls",
      "carns",
      "carny",
      "carob",
      "carom",
      "caron",
      "carpi",
      "carps",
      "carrs",
      "carse",
      "carta",
      "carte",
      "carts",
      "carvy",
      "casas",
      "casco",
      "cased",
      "cases",
      "casks",
      "casky",
      "casts",
      "casus",
      "cates",
      "cauda",
      "cauks",
      "cauld",
      "cauls",
      "caums",
      "caups",
      "cauri",
      "causa",
      "cavas",
      "caved",
      "cavel",
      "caver",
      "caves",
      "cavie",
      "cawed",
      "cawks",
      "caxon",
      "ceaze",
      "cebid",
      "cecal",
      "cecum",
      "ceded",
      "ceder",
      "cedes",
      "cedis",
      "ceiba",
      "ceili",
      "ceils",
      "celeb",
      "cella",
      "celli",
      "cells",
      "celom",
      "celts",
      "cense",
      "cento",
      "cents",
      "centu",
      "ceorl",
      "cepes",
      "cerci",
      "cered",
      "ceres",
      "cerge",
      "ceria",
      "ceric",
      "cerne",
      "ceroc",
      "ceros",
      "certs",
      "certy",
      "cesse",
      "cesta",
      "cesti",
      "cetes",
      "cetyl",
      "cezve",
      "chace",
      "chack",
      "chaco",
      "chado",
      "chads",
      "chaft",
      "chais",
      "chals",
      "chams",
      "chana",
      "chang",
      "chank",
      "chape",
      "chaps",
      "chapt",
      "chara",
      "chare",
      "chark",
      "charr",
      "chars",
      "chary",
      "chats",
      "chave",
      "chavs",
      "chawk",
      "chaws",
      "chaya",
      "chays",
      "cheep",
      "chefs",
      "cheka",
      "chela",
      "chelp",
      "chemo",
      "chems",
      "chere",
      "chert",
      "cheth",
      "chevy",
      "chews",
      "chewy",
      "chiao",
      "chias",
      "chibs",
      "chica",
      "chich",
      "chico",
      "chics",
      "chiel",
      "chiks",
      "chile",
      "chimb",
      "chimo",
      "chimp",
      "chine",
      "ching",
      "chink",
      "chino",
      "chins",
      "chips",
      "chirk",
      "chirl",
      "chirm",
      "chiro",
      "chirr",
      "chirt",
      "chiru",
      "chits",
      "chive",
      "chivs",
      "chivy",
      "chizz",
      "choco",
      "chocs",
      "chode",
      "chogs",
      "choil",
      "choko",
      "choky",
      "chola",
      "choli",
      "cholo",
      "chomp",
      "chons",
      "choof",
      "chook",
      "choom",
      "choon",
      "chops",
      "chota",
      "chott",
      "chout",
      "choux",
      "chowk",
      "chows",
      "chubs",
      "chufa",
      "chuff",
      "chugs",
      "chums",
      "churl",
      "churr",
      "chuse",
      "chuts",
      "chyle",
      "chyme",
      "chynd",
      "cibol",
      "cided",
      "cides",
      "ciels",
      "ciggy",
      "cilia",
      "cills",
      "cimar",
      "cimex",
      "cinct",
      "cines",
      "cinqs",
      "cions",
      "cippi",
      "circs",
      "cires",
      "cirls",
      "cirri",
      "cisco",
      "cissy",
      "cists",
      "cital",
      "cited",
      "citer",
      "cites",
      "cives",
      "civet",
      "civie",
      "civvy",
      "clach",
      "clade",
      "clads",
      "claes",
      "clags",
      "clame",
      "clams",
      "clans",
      "claps",
      "clapt",
      "claro",
      "clart",
      "clary",
      "clast",
      "clats",
      "claut",
      "clave",
      "clavi",
      "claws",
      "clays",
      "cleck",
      "cleek",
      "cleep",
      "clefs",
      "clegs",
      "cleik",
      "clems",
      "clepe",
      "clept",
      "cleve",
      "clews",
      "clied",
      "clies",
      "clift",
      "clime",
      "cline",
      "clint",
      "clipe",
      "clips",
      "clipt",
      "clits",
      "cloam",
      "clods",
      "cloff",
      "clogs",
      "cloke",
      "clomb",
      "clomp",
      "clonk",
      "clons",
      "cloop",
      "cloot",
      "clops",
      "clote",
      "clots",
      "clour",
      "clous",
      "clows",
      "cloye",
      "cloys",
      "cloze",
      "clubs",
      "clues",
      "cluey",
      "clunk",
      "clype",
      "cnida",
      "coact",
      "coady",
      "coala",
      "coals",
      "coaly",
      "coapt",
      "coarb",
      "coate",
      "coati",
      "coats",
      "cobbs",
      "cobby",
      "cobia",
      "coble",
      "cobza",
      "cocas",
      "cocci",
      "cocco",
      "cocks",
      "cocky",
      "cocos",
      "codas",
      "codec",
      "coded",
      "coden",
      "coder",
      "codes",
      "codex",
      "codon",
      "coeds",
      "coffs",
      "cogie",
      "cogon",
      "cogue",
      "cohab",
      "cohen",
      "cohoe",
      "cohog",
      "cohos",
      "coifs",
      "coign",
      "coils",
      "coins",
      "coirs",
      "coits",
      "coked",
      "cokes",
      "colas",
      "colby",
      "colds",
      "coled",
      "coles",
      "coley",
      "colic",
      "colin",
      "colls",
      "colly",
      "colog",
      "colts",
      "colza",
      "comae",
      "comal",
      "comas",
      "combe",
      "combi",
      "combo",
      "combs",
      "comby",
      "comer",
      "comes",
      "comix",
      "commo",
      "comms",
      "commy",
      "compo",
      "comps",
      "compt",
      "comte",
      "comus",
      "coned",
      "cones",
      "coney",
      "confs",
      "conga",
      "conge",
      "congo",
      "conia",
      "conin",
      "conks",
      "conky",
      "conne",
      "conns",
      "conte",
      "conto",
      "conus",
      "convo",
      "cooch",
      "cooed",
      "cooee",
      "cooer",
      "cooey",
      "coofs",
      "cooks",
      "cooky",
      "cools",
      "cooly",
      "coomb",
      "cooms",
      "coomy",
      "coons",
      "coops",
      "coopt",
      "coost",
      "coots",
      "cooze",
      "copal",
      "copay",
      "coped",
      "copen",
      "coper",
      "copes",
      "coppy",
      "copra",
      "copsy",
      "coqui",
      "coram",
      "corbe",
      "corby",
      "cords",
      "cored",
      "cores",
      "corey",
      "corgi",
      "coria",
      "corks",
      "corky",
      "corms",
      "corni",
      "corno",
      "corns",
      "cornu",
      "corps",
      "corse",
      "corso",
      "cosec",
      "cosed",
      "coses",
      "coset",
      "cosey",
      "cosie",
      "costa",
      "coste",
      "costs",
      "cotan",
      "coted",
      "cotes",
      "coths",
      "cotta",
      "cotts",
      "coude",
      "coups",
      "courb",
      "courd",
      "coure",
      "cours",
      "couta",
      "couth",
      "coved",
      "coves",
      "covin",
      "cowal",
      "cowan",
      "cowed",
      "cowks",
      "cowls",
      "cowps",
      "cowry",
      "coxae",
      "coxal",
      "coxed",
      "coxes",
      "coxib",
      "coyau",
      "coyed",
      "coyer",
      "coypu",
      "cozed",
      "cozen",
      "cozes",
      "cozey",
      "cozie",
      "craal",
      "crabs",
      "crags",
      "craic",
      "craig",
      "crake",
      "crame",
      "crams",
      "crans",
      "crape",
      "craps",
      "crapy",
      "crare",
      "craws",
      "crays",
      "creds",
      "creel",
      "crees",
      "crems",
      "crena",
      "creps",
      "crepy",
      "crewe",
      "crews",
      "crias",
      "cribs",
      "cries",
      "crims",
      "crine",
      "crios",
      "cripe",
      "crips",
      "crise",
      "crith",
      "crits",
      "croci",
      "crocs",
      "croft",
      "crogs",
      "cromb",
      "crome",
      "cronk",
      "crons",
      "crool",
      "croon",
      "crops",
      "crore",
      "crost",
      "crout",
      "crows",
      "croze",
      "cruck",
      "crudo",
      "cruds",
      "crudy",
      "crues",
      "cruet",
      "cruft",
      "crunk",
      "cruor",
      "crura",
      "cruse",
      "crusy",
      "cruve",
      "crwth",
      "cryer",
      "ctene",
      "cubby",
      "cubeb",
      "cubed",
      "cuber",
      "cubes",
      "cubit",
      "cuddy",
      "cuffo",
      "cuffs",
      "cuifs",
      "cuing",
      "cuish",
      "cuits",
      "cukes",
      "culch",
      "culet",
      "culex",
      "culls",
      "cully",
      "culms",
      "culpa",
      "culti",
      "cults",
      "culty",
      "cumec",
      "cundy",
      "cunei",
      "cunit",
      "cunts",
      "cupel",
      "cupid",
      "cuppa",
      "cuppy",
      "curat",
      "curbs",
      "curch",
      "curds",
      "curdy",
      "cured",
      "curer",
      "cures",
      "curet",
      "curfs",
      "curia",
      "curie",
      "curli",
      "curls",
      "curns",
      "curny",
      "currs",
      "cursi",
      "curst",
      "cusec",
      "cushy",
      "cusks",
      "cusps",
      "cuspy",
      "cusso",
      "cusum",
      "cutch",
      "cuter",
      "cutes",
      "cutey",
      "cutin",
      "cutis",
      "cutto",
      "cutty",
      "cutup",
      "cuvee",
      "cuzes",
      "cwtch",
      "cyano",
      "cyans",
      "cycad",
      "cycas",
      "cyclo",
      "cyder",
      "cylix",
      "cymae",
      "cymar",
      "cymas",
      "cymes",
      "cymol",
      "cysts",
      "cytes",
      "cyton",
      "czars",
      "daals",
      "dabba",
      "daces",
      "dacha",
      "dacks",
      "dadah",
      "dadas",
      "dados",
      "daffs",
      "daffy",
      "dagga",
      "daggy",
      "dagos",
      "dahls",
      "daiko",
      "daine",
      "daint",
      "daker",
      "daled",
      "dales",
      "dalis",
      "dalle",
      "dalts",
      "daman",
      "damar",
      "dames",
      "damme",
      "damns",
      "damps",
      "dampy",
      "dancy",
      "dangs",
      "danio",
      "danks",
      "danny",
      "dants",
      "daraf",
      "darbs",
      "darcy",
      "dared",
      "darer",
      "dares",
      "darga",
      "dargs",
      "daric",
      "daris",
      "darks",
      "darky",
      "darns",
      "darre",
      "darts",
      "darzi",
      "dashi",
      "dashy",
      "datal",
      "dated",
      "dater",
      "dates",
      "datos",
      "datto",
      "daube",
      "daubs",
      "dauby",
      "dauds",
      "dault",
      "daurs",
      "dauts",
      "daven",
      "davit",
      "dawah",
      "dawds",
      "dawed",
      "dawen",
      "dawks",
      "dawns",
      "dawts",
      "dayan",
      "daych",
      "daynt",
      "dazed",
      "dazer",
      "dazes",
      "deads",
      "deair",
      "deals",
      "deans",
      "deare",
      "dearn",
      "dears",
      "deary",
      "deash",
      "deave",
      "deaws",
      "deawy",
      "debag",
      "debby",
      "debel",
      "debes",
      "debts",
      "debud",
      "debur",
      "debus",
      "debye",
      "decad",
      "decaf",
      "decan",
      "decko",
      "decks",
      "decos",
      "dedal",
      "deeds",
      "deedy",
      "deely",
      "deems",
      "deens",
      "deeps",
      "deere",
      "deers",
      "deets",
      "deeve",
      "deevs",
      "defat",
      "deffo",
      "defis",
      "defog",
      "degas",
      "degum",
      "degus",
      "deice",
      "deids",
      "deify",
      "deils",
      "deism",
      "deist",
      "deked",
      "dekes",
      "dekko",
      "deled",
      "deles",
      "delfs",
      "delft",
      "delis",
      "dells",
      "delly",
      "delos",
      "delph",
      "delts",
      "deman",
      "demes",
      "demic",
      "demit",
      "demob",
      "demoi",
      "demos",
      "dempt",
      "denar",
      "denay",
      "dench",
      "denes",
      "denet",
      "denis",
      "dents",
      "deoxy",
      "derat",
      "deray",
      "dered",
      "deres",
      "derig",
      "derma",
      "derms",
      "derns",
      "derny",
      "deros",
      "derro",
      "derry",
      "derth",
      "dervs",
      "desex",
      "deshi",
      "desis",
      "desks",
      "desse",
      "devas",
      "devel",
      "devis",
      "devon",
      "devos",
      "devot",
      "dewan",
      "dewar",
      "dewax",
      "dewed",
      "dexes",
      "dexie",
      "dhaba",
      "dhaks",
      "dhals",
      "dhikr",
      "dhobi",
      "dhole",
      "dholl",
      "dhols",
      "dhoti",
      "dhows",
      "dhuti",
      "diact",
      "dials",
      "diane",
      "diazo",
      "dibbs",
      "diced",
      "dicer",
      "dices",
      "dicht",
      "dicks",
      "dicky",
      "dicot",
      "dicta",
      "dicts",
      "dicty",
      "diddy",
      "didie",
      "didos",
      "didst",
      "diebs",
      "diels",
      "diene",
      "diets",
      "diffs",
      "dight",
      "dikas",
      "diked",
      "diker",
      "dikes",
      "dikey",
      "dildo",
      "dilli",
      "dills",
      "dimbo",
      "dimer",
      "dimes",
      "dimps",
      "dinar",
      "dined",
      "dines",
      "dinge",
      "dings",
      "dinic",
      "dinks",
      "dinky",
      "dinna",
      "dinos",
      "dints",
      "diols",
      "diota",
      "dippy",
      "dipso",
      "diram",
      "direr",
      "dirke",
      "dirks",
      "dirls",
      "dirts",
      "disas",
      "disci",
      "discs",
      "dishy",
      "disks",
      "disme",
      "dital",
      "ditas",
      "dited",
      "dites",
      "ditsy",
      "ditts",
      "ditzy",
      "divan",
      "divas",
      "dived",
      "dives",
      "divis",
      "divna",
      "divos",
      "divot",
      "divvy",
      "diwan",
      "dixie",
      "dixit",
      "diyas",
      "dizen",
      "djinn",
      "djins",
      "doabs",
      "doats",
      "dobby",
      "dobes",
      "dobie",
      "dobla",
      "dobra",
      "dobro",
      "docht",
      "docks",
      "docos",
      "docus",
      "doddy",
      "dodos",
      "doeks",
      "doers",
      "doest",
      "doeth",
      "doffs",
      "dogan",
      "doges",
      "dogey",
      "doggo",
      "doggy",
      "dogie",
      "dohyo",
      "doilt",
      "doily",
      "doits",
      "dojos",
      "dolce",
      "dolci",
      "doled",
      "doles",
      "dolia",
      "dolls",
      "dolma",
      "dolor",
      "dolos",
      "dolts",
      "domal",
      "domed",
      "domes",
      "domic",
      "donah",
      "donas",
      "donee",
      "doner",
      "donga",
      "dongs",
      "donko",
      "donna",
      "donne",
      "donny",
      "donsy",
      "doobs",
      "dooce",
      "doody",
      "dooks",
      "doole",
      "dools",
      "dooly",
      "dooms",
      "doomy",
      "doona",
      "doorn",
      "doors",
      "doozy",
      "dopas",
      "doped",
      "doper",
      "dopes",
      "dorad",
      "dorba",
      "dorbs",
      "doree",
      "dores",
      "doric",
      "doris",
      "dorks",
      "dorky",
      "dorms",
      "dormy",
      "dorps",
      "dorrs",
      "dorsa",
      "dorse",
      "dorts",
      "dorty",
      "dosai",
      "dosas",
      "dosed",
      "doseh",
      "doser",
      "doses",
      "dosha",
      "dotal",
      "doted",
      "doter",
      "dotes",
      "dotty",
      "douar",
      "douce",
      "doucs",
      "douks",
      "doula",
      "douma",
      "doums",
      "doups",
      "doura",
      "douse",
      "douts",
      "doved",
      "doven",
      "dover",
      "doves",
      "dovie",
      "dowar",
      "dowds",
      "dowed",
      "dower",
      "dowie",
      "dowle",
      "dowls",
      "dowly",
      "downa",
      "downs",
      "dowps",
      "dowse",
      "dowts",
      "doxed",
      "doxes",
      "doxie",
      "doyen",
      "doyly",
      "dozed",
      "dozer",
      "dozes",
      "drabs",
      "drack",
      "draco",
      "draff",
      "drags",
      "drail",
      "drams",
      "drant",
      "draps",
      "drats",
      "drave",
      "draws",
      "drays",
      "drear",
      "dreck",
      "dreed",
      "dreer",
      "drees",
      "dregs",
      "dreks",
      "drent",
      "drere",
      "drest",
      "dreys",
      "dribs",
      "drice",
      "dries",
      "drily",
      "drips",
      "dript",
      "droid",
      "droil",
      "droke",
      "drole",
      "drome",
      "drony",
      "droob",
      "droog",
      "drook",
      "drops",
      "dropt",
      "drouk",
      "drows",
      "drubs",
      "drugs",
      "drums",
      "drupe",
      "druse",
      "drusy",
      "druxy",
      "dryad",
      "dryas",
      "dsobo",
      "dsomo",
      "duads",
      "duals",
      "duans",
      "duars",
      "dubbo",
      "ducal",
      "ducat",
      "duces",
      "ducks",
      "ducky",
      "ducts",
      "duddy",
      "duded",
      "dudes",
      "duels",
      "duets",
      "duett",
      "duffs",
      "dufus",
      "duing",
      "duits",
      "dukas",
      "duked",
      "dukes",
      "dukka",
      "dulce",
      "dules",
      "dulia",
      "dulls",
      "dulse",
      "dumas",
      "dumbo",
      "dumbs",
      "dumka",
      "dumky",
      "dumps",
      "dunam",
      "dunch",
      "dunes",
      "dungs",
      "dungy",
      "dunks",
      "dunno",
      "dunny",
      "dunsh",
      "dunts",
      "duomi",
      "duomo",
      "duped",
      "duper",
      "dupes",
      "duple",
      "duply",
      "duppy",
      "dural",
      "duras",
      "dured",
      "dures",
      "durgy",
      "durns",
      "duroc",
      "duros",
      "duroy",
      "durra",
      "durrs",
      "durry",
      "durst",
      "durum",
      "durzi",
      "dusks",
      "dusts",
      "duxes",
      "dwaal",
      "dwale",
      "dwalm",
      "dwams",
      "dwang",
      "dwaum",
      "dweeb",
      "dwile",
      "dwine",
      "dyads",
      "dyers",
      "dyked",
      "dykes",
      "dykey",
      "dykon",
      "dynel",
      "dynes",
      "dzhos",
      "eagre",
      "ealed",
      "eales",
      "eaned",
      "eards",
      "eared",
      "earls",
      "earns",
      "earnt",
      "earst",
      "eased",
      "easer",
      "eases",
      "easle",
      "easts",
      "eathe",
      "eaved",
      "eaves",
      "ebbed",
      "ebbet",
      "ebons",
      "ebook",
      "ecads",
      "eched",
      "eches",
      "echos",
      "ecrus",
      "edema",
      "edged",
      "edger",
      "edges",
      "edile",
      "edits",
      "educe",
      "educt",
      "eejit",
      "eensy",
      "eeven",
      "eevns",
      "effed",
      "egads",
      "egers",
      "egest",
      "eggar",
      "egged",
      "egger",
      "egmas",
      "ehing",
      "eider",
      "eidos",
      "eigne",
      "eiked",
      "eikon",
      "eilds",
      "eisel",
      "ejido",
      "ekkas",
      "elain",
      "eland",
      "elans",
      "elchi",
      "eldin",
      "elemi",
      "elfed",
      "eliad",
      "elint",
      "elmen",
      "eloge",
      "elogy",
      "eloin",
      "elops",
      "elpee",
      "elsin",
      "elute",
      "elvan",
      "elven",
      "elver",
      "elves",
      "emacs",
      "embar",
      "embay",
      "embog",
      "embow",
      "embox",
      "embus",
      "emeer",
      "emend",
      "emerg",
      "emery",
      "emeus",
      "emics",
      "emirs",
      "emits",
      "emmas",
      "emmer",
      "emmet",
      "emmew",
      "emmys",
      "emoji",
      "emong",
      "emote",
      "emove",
      "empts",
      "emule",
      "emure",
      "emyde",
      "emyds",
      "enarm",
      "enate",
      "ended",
      "ender",
      "endew",
      "endue",
      "enews",
      "enfix",
      "eniac",
      "enlit",
      "enmew",
      "ennog",
      "enoki",
      "enols",
      "enorm",
      "enows",
      "enrol",
      "ensew",
      "ensky",
      "entia",
      "enure",
      "enurn",
      "envoi",
      "enzym",
      "eorls",
      "eosin",
      "epact",
      "epees",
      "ephah",
      "ephas",
      "ephod",
      "ephor",
      "epics",
      "epode",
      "epopt",
      "epris",
      "eques",
      "equid",
      "erbia",
      "erevs",
      "ergon",
      "ergos",
      "ergot",
      "erhus",
      "erica",
      "erick",
      "erics",
      "ering",
      "erned",
      "ernes",
      "erose",
      "erred",
      "erses",
      "eruct",
      "erugo",
      "eruvs",
      "erven",
      "ervil",
      "escar",
      "escot",
      "esile",
      "eskar",
      "esker",
      "esnes",
      "esses",
      "estoc",
      "estop",
      "estro",
      "etage",
      "etape",
      "etats",
      "etens",
      "ethal",
      "ethne",
      "ethyl",
      "etics",
      "etnas",
      "ettin",
      "ettle",
      "etuis",
      "etwee",
      "etyma",
      "eughs",
      "euked",
      "eupad",
      "euros",
      "eusol",
      "evens",
      "evert",
      "evets",
      "evhoe",
      "evils",
      "evite",
      "evohe",
      "ewers",
      "ewest",
      "ewhow",
      "ewked",
      "exams",
      "exeat",
      "execs",
      "exeem",
      "exeme",
      "exfil",
      "exies",
      "exine",
      "exing",
      "exits",
      "exode",
      "exome",
      "exons",
      "expat",
      "expos",
      "exude",
      "exuls",
      "exurb",
      "eyass",
      "eyers",
      "eyots",
      "eyras",
      "eyres",
      "eyrie",
      "eyrir",
      "ezine",
      "fabby",
      "faced",
      "facer",
      "faces",
      "facia",
      "facta",
      "facts",
      "faddy",
      "faded",
      "fader",
      "fades",
      "fadge",
      "fados",
      "faena",
      "faery",
      "faffs",
      "faffy",
      "faggy",
      "fagin",
      "fagot",
      "faiks",
      "fails",
      "faine",
      "fains",
      "fairs",
      "faked",
      "faker",
      "fakes",
      "fakey",
      "fakie",
      "fakir",
      "falaj",
      "falls",
      "famed",
      "fames",
      "fanal",
      "fands",
      "fanes",
      "fanga",
      "fango",
      "fangs",
      "fanks",
      "fanon",
      "fanos",
      "fanum",
      "faqir",
      "farad",
      "farci",
      "farcy",
      "fards",
      "fared",
      "farer",
      "fares",
      "farle",
      "farls",
      "farms",
      "faros",
      "farro",
      "farse",
      "farts",
      "fasci",
      "fasti",
      "fasts",
      "fated",
      "fates",
      "fatly",
      "fatso",
      "fatwa",
      "faugh",
      "fauld",
      "fauns",
      "faurd",
      "fauts",
      "fauve",
      "favas",
      "favel",
      "faver",
      "faves",
      "favus",
      "fawns",
      "fawny",
      "faxed",
      "faxes",
      "fayed",
      "fayer",
      "fayne",
      "fayre",
      "fazed",
      "fazes",
      "feals",
      "feare",
      "fears",
      "feart",
      "fease",
      "feats",
      "feaze",
      "feces",
      "fecht",
      "fecit",
      "fecks",
      "fedex",
      "feebs",
      "feeds",
      "feels",
      "feens",
      "feers",
      "feese",
      "feeze",
      "fehme",
      "feint",
      "feist",
      "felch",
      "felid",
      "fells",
      "felly",
      "felts",
      "felty",
      "femal",
      "femes",
      "femmy",
      "fends",
      "fendy",
      "fenis",
      "fenks",
      "fenny",
      "fents",
      "feods",
      "feoff",
      "ferer",
      "feres",
      "feria",
      "ferly",
      "fermi",
      "ferms",
      "ferns",
      "ferny",
      "fesse",
      "festa",
      "fests",
      "festy",
      "fetas",
      "feted",
      "fetes",
      "fetor",
      "fetta",
      "fetts",
      "fetwa",
      "feuar",
      "feuds",
      "feued",
      "feyed",
      "feyer",
      "feyly",
      "fezes",
      "fezzy",
      "fiars",
      "fiats",
      "fibro",
      "fices",
      "fiche",
      "fichu",
      "ficin",
      "ficos",
      "fides",
      "fidge",
      "fidos",
      "fiefs",
      "fient",
      "fiere",
      "fiers",
      "fiest",
      "fifed",
      "fifer",
      "fifes",
      "fifis",
      "figgy",
      "figos",
      "fiked",
      "fikes",
      "filar",
      "filch",
      "filed",
      "files",
      "filii",
      "filks",
      "fille",
      "fillo",
      "fills",
      "filmi",
      "films",
      "filos",
      "filum",
      "finca",
      "finds",
      "fined",
      "fines",
      "finis",
      "finks",
      "finny",
      "finos",
      "fiord",
      "fiqhs",
      "fique",
      "fired",
      "firer",
      "fires",
      "firie",
      "firks",
      "firms",
      "firns",
      "firry",
      "firth",
      "fiscs",
      "fisks",
      "fists",
      "fisty",
      "fitch",
      "fitly",
      "fitna",
      "fitte",
      "fitts",
      "fiver",
      "fives",
      "fixed",
      "fixes",
      "fixit",
      "fjeld",
      "flabs",
      "flaff",
      "flags",
      "flaks",
      "flamm",
      "flams",
      "flamy",
      "flane",
      "flans",
      "flaps",
      "flary",
      "flats",
      "flava",
      "flawn",
      "flaws",
      "flawy",
      "flaxy",
      "flays",
      "fleam",
      "fleas",
      "fleek",
      "fleer",
      "flees",
      "flegs",
      "fleme",
      "fleur",
      "flews",
      "flexi",
      "flexo",
      "fleys",
      "flics",
      "flied",
      "flies",
      "flimp",
      "flims",
      "flips",
      "flirs",
      "flisk",
      "flite",
      "flits",
      "flitt",
      "flobs",
      "flocs",
      "floes",
      "flogs",
      "flong",
      "flops",
      "flors",
      "flory",
      "flosh",
      "flota",
      "flote",
      "flows",
      "flubs",
      "flued",
      "flues",
      "fluey",
      "fluky",
      "flump",
      "fluor",
      "flurr",
      "fluty",
      "fluyt",
      "flyby",
      "flype",
      "flyte",
      "foals",
      "foams",
      "foehn",
      "fogey",
      "fogie",
      "fogle",
      "fogou",
      "fohns",
      "foids",
      "foils",
      "foins",
      "folds",
      "foley",
      "folia",
      "folic",
      "folie",
      "folks",
      "folky",
      "fomes",
      "fonda",
      "fonds",
      "fondu",
      "fones",
      "fonly",
      "fonts",
      "foods",
      "foody",
      "fools",
      "foots",
      "footy",
      "foram",
      "forbs",
      "forby",
      "fordo",
      "fords",
      "forel",
      "fores",
      "forex",
      "forks",
      "forky",
      "forme",
      "forms",
      "forts",
      "forza",
      "forze",
      "fossa",
      "fosse",
      "fouat",
      "fouds",
      "fouer",
      "fouet",
      "foule",
      "fouls",
      "fount",
      "fours",
      "fouth",
      "fovea",
      "fowls",
      "fowth",
      "foxed",
      "foxes",
      "foxie",
      "foyle",
      "foyne",
      "frabs",
      "frack",
      "fract",
      "frags",
      "fraim",
      "franc",
      "frape",
      "fraps",
      "frass",
      "frate",
      "frati",
      "frats",
      "fraus",
      "frays",
      "frees",
      "freet",
      "freit",
      "fremd",
      "frena",
      "freon",
      "frere",
      "frets",
      "fribs",
      "frier",
      "fries",
      "frigs",
      "frise",
      "frist",
      "frith",
      "frits",
      "fritt",
      "frize",
      "frizz",
      "froes",
      "frogs",
      "frons",
      "frore",
      "frorn",
      "frory",
      "frosh",
      "frows",
      "frowy",
      "frugs",
      "frump",
      "frush",
      "frust",
      "fryer",
      "fubar",
      "fubby",
      "fubsy",
      "fucks",
      "fucus",
      "fuddy",
      "fudgy",
      "fuels",
      "fuero",
      "fuffs",
      "fuffy",
      "fugal",
      "fuggy",
      "fugie",
      "fugio",
      "fugle",
      "fugly",
      "fugus",
      "fujis",
      "fulls",
      "fumed",
      "fumer",
      "fumes",
      "fumet",
      "fundi",
      "funds",
      "fundy",
      "fungo",
      "fungs",
      "funks",
      "fural",
      "furan",
      "furca",
      "furls",
      "furol",
      "furrs",
      "furth",
      "furze",
      "furzy",
      "fused",
      "fusee",
      "fusel",
      "fuses",
      "fusil",
      "fusks",
      "fusts",
      "fusty",
      "futon",
      "fuzed",
      "fuzee",
      "fuzes",
      "fuzil",
      "fyces",
      "fyked",
      "fykes",
      "fyles",
      "fyrds",
      "fytte",
      "gabba",
      "gabby",
      "gable",
      "gaddi",
      "gades",
      "gadge",
      "gadid",
      "gadis",
      "gadje",
      "gadjo",
      "gadso",
      "gaffs",
      "gaged",
      "gager",
      "gages",
      "gaids",
      "gains",
      "gairs",
      "gaita",
      "gaits",
      "gaitt",
      "gajos",
      "galah",
      "galas",
      "galax",
      "galea",
      "galed",
      "gales",
      "galls",
      "gally",
      "galop",
      "galut",
      "galvo",
      "gamas",
      "gamay",
      "gamba",
      "gambe",
      "gambo",
      "gambs",
      "gamed",
      "games",
      "gamey",
      "gamic",
      "gamin",
      "gamme",
      "gammy",
      "gamps",
      "ganch",
      "gandy",
      "ganef",
      "ganev",
      "gangs",
      "ganja",
      "ganof",
      "gants",
      "gaols",
      "gaped",
      "gaper",
      "gapes",
      "gapos",
      "gappy",
      "garbe",
      "garbo",
      "garbs",
      "garda",
      "gares",
      "garis",
      "garms",
      "garni",
      "garre",
      "garth",
      "garum",
      "gases",
      "gasps",
      "gaspy",
      "gasts",
      "gatch",
      "gated",
      "gater",
      "gates",
      "gaths",
      "gator",
      "gauch",
      "gaucy",
      "gauds",
      "gauje",
      "gault",
      "gaums",
      "gaumy",
      "gaups",
      "gaurs",
      "gauss",
      "gauzy",
      "gavot",
      "gawcy",
      "gawds",
      "gawks",
      "gawps",
      "gawsy",
      "gayal",
      "gazal",
      "gazar",
      "gazed",
      "gazes",
      "gazon",
      "gazoo",
      "geals",
      "geans",
      "geare",
      "gears",
      "geats",
      "gebur",
      "gecks",
      "geeks",
      "geeps",
      "geest",
      "geist",
      "geits",
      "gelds",
      "gelee",
      "gelid",
      "gelly",
      "gelts",
      "gemel",
      "gemma",
      "gemmy",
      "gemot",
      "genal",
      "genas",
      "genes",
      "genet",
      "genic",
      "genii",
      "genip",
      "genny",
      "genoa",
      "genom",
      "genro",
      "gents",
      "genty",
      "genua",
      "genus",
      "geode",
      "geoid",
      "gerah",
      "gerbe",
      "geres",
      "gerle",
      "germs",
      "germy",
      "gerne",
      "gesse",
      "gesso",
      "geste",
      "gests",
      "getas",
      "getup",
      "geums",
      "geyan",
      "geyer",
      "ghast",
      "ghats",
      "ghaut",
      "ghazi",
      "ghees",
      "ghest",
      "ghyll",
      "gibed",
      "gibel",
      "giber",
      "gibes",
      "gibli",
      "gibus",
      "gifts",
      "gigas",
      "gighe",
      "gigot",
      "gigue",
      "gilas",
      "gilds",
      "gilet",
      "gills",
      "gilly",
      "gilpy",
      "gilts",
      "gimel",
      "gimme",
      "gimps",
      "gimpy",
      "ginch",
      "ginge",
      "gings",
      "ginks",
      "ginny",
      "ginzo",
      "gipon",
      "gippo",
      "gippy",
      "girds",
      "girls",
      "girns",
      "giron",
      "giros",
      "girrs",
      "girsh",
      "girts",
      "gismo",
      "gisms",
      "gists",
      "gitch",
      "gites",
      "giust",
      "gived",
      "gives",
      "gizmo",
      "glace",
      "glads",
      "glady",
      "glaik",
      "glair",
      "glams",
      "glans",
      "glary",
      "glaum",
      "glaur",
      "glazy",
      "gleba",
      "glebe",
      "gleby",
      "glede",
      "gleds",
      "gleed",
      "gleek",
      "glees",
      "gleet",
      "gleis",
      "glens",
      "glent",
      "gleys",
      "glial",
      "glias",
      "glibs",
      "gliff",
      "glift",
      "glike",
      "glime",
      "glims",
      "glisk",
      "glits",
      "glitz",
      "gloam",
      "globi",
      "globs",
      "globy",
      "glode",
      "glogg",
      "gloms",
      "gloop",
      "glops",
      "glost",
      "glout",
      "glows",
      "gloze",
      "glued",
      "gluer",
      "glues",
      "gluey",
      "glugs",
      "glume",
      "glums",
      "gluon",
      "glute",
      "gluts",
      "gnarl",
      "gnarr",
      "gnars",
      "gnats",
      "gnawn",
      "gnaws",
      "gnows",
      "goads",
      "goafs",
      "goals",
      "goary",
      "goats",
      "goaty",
      "goban",
      "gobar",
      "gobbi",
      "gobbo",
      "gobby",
      "gobis",
      "gobos",
      "godet",
      "godso",
      "goels",
      "goers",
      "goest",
      "goeth",
      "goety",
      "gofer",
      "goffs",
      "gogga",
      "gogos",
      "goier",
      "gojis",
      "golds",
      "goldy",
      "goles",
      "golfs",
      "golpe",
      "golps",
      "gombo",
      "gomer",
      "gompa",
      "gonch",
      "gonef",
      "gongs",
      "gonia",
      "gonif",
      "gonks",
      "gonna",
      "gonof",
      "gonys",
      "gonzo",
      "gooby",
      "goods",
      "goofs",
      "googs",
      "gooks",
      "gooky",
      "goold",
      "gools",
      "gooly",
      "goons",
      "goony",
      "goops",
      "goopy",
      "goors",
      "goory",
      "goosy",
      "gopak",
      "gopik",
      "goral",
      "goras",
      "gored",
      "gores",
      "goris",
      "gorms",
      "gormy",
      "gorps",
      "gorse",
      "gorsy",
      "gosht",
      "gosse",
      "gotch",
      "goths",
      "gothy",
      "gotta",
      "gouch",
      "gouks",
      "goura",
      "gouts",
      "gouty",
      "gowan",
      "gowds",
      "gowfs",
      "gowks",
      "gowls",
      "gowns",
      "goxes",
      "goyim",
      "goyle",
      "graal",
      "grabs",
      "grads",
      "graff",
      "graip",
      "grama",
      "grame",
      "gramp",
      "grams",
      "grana",
      "grans",
      "grapy",
      "gravs",
      "grays",
      "grebe",
      "grebo",
      "grece",
      "greek",
      "grees",
      "grege",
      "grego",
      "grein",
      "grens",
      "grese",
      "greve",
      "grews",
      "greys",
      "grice",
      "gride",
      "grids",
      "griff",
      "grift",
      "grigs",
      "grike",
      "grins",
      "griot",
      "grips",
      "gript",
      "gripy",
      "grise",
      "grist",
      "grisy",
      "grith",
      "grits",
      "grize",
      "groat",
      "grody",
      "grogs",
      "groks",
      "groma",
      "grone",
      "groof",
      "grosz",
      "grots",
      "grouf",
      "grovy",
      "grows",
      "grrls",
      "grrrl",
      "grubs",
      "grued",
      "grues",
      "grufe",
      "grume",
      "grump",
      "grund",
      "gryce",
      "gryde",
      "gryke",
      "grype",
      "grypt",
      "guaco",
      "guana",
      "guano",
      "guans",
      "guars",
      "gucks",
      "gucky",
      "gudes",
      "guffs",
      "gugas",
      "guids",
      "guimp",
      "guiro",
      "gulag",
      "gular",
      "gulas",
      "gules",
      "gulet",
      "gulfs",
      "gulfy",
      "gulls",
      "gulph",
      "gulps",
      "gulpy",
      "gumma",
      "gummi",
      "gumps",
      "gundy",
      "gunge",
      "gungy",
      "gunks",
      "gunky",
      "gunny",
      "guqin",
      "gurdy",
      "gurge",
      "gurls",
      "gurly",
      "gurns",
      "gurry",
      "gursh",
      "gurus",
      "gushy",
      "gusla",
      "gusle",
      "gusli",
      "gussy",
      "gusts",
      "gutsy",
      "gutta",
      "gutty",
      "guyed",
      "guyle",
      "guyot",
      "guyse",
      "gwine",
      "gyals",
      "gyans",
      "gybed",
      "gybes",
      "gyeld",
      "gymps",
      "gynae",
      "gynie",
      "gynny",
      "gynos",
      "gyoza",
      "gypos",
      "gyppo",
      "gyppy",
      "gyral",
      "gyred",
      "gyres",
      "gyron",
      "gyros",
      "gyrus",
      "gytes",
      "gyved",
      "gyves",
      "haafs",
      "haars",
      "hable",
      "habus",
      "hacek",
      "hacks",
      "hadal",
      "haded",
      "hades",
      "hadji",
      "hadst",
      "haems",
      "haets",
      "haffs",
      "hafiz",
      "hafts",
      "haggs",
      "hahas",
      "haick",
      "haika",
      "haiks",
      "haiku",
      "hails",
      "haily",
      "hains",
      "haint",
      "hairs",
      "haith",
      "hajes",
      "hajis",
      "hajji",
      "hakam",
      "hakas",
      "hakea",
      "hakes",
      "hakim",
      "hakus",
      "halal",
      "haled",
      "haler",
      "hales",
      "halfa",
      "halfs",
      "halid",
      "hallo",
      "halls",
      "halma",
      "halms",
      "halon",
      "halos",
      "halse",
      "halts",
      "halva",
      "halwa",
      "hamal",
      "hamba",
      "hamed",
      "hames",
      "hammy",
      "hamza",
      "hanap",
      "hance",
      "hanch",
      "hands",
      "hangi",
      "hangs",
      "hanks",
      "hanky",
      "hansa",
      "hanse",
      "hants",
      "haole",
      "haoma",
      "hapax",
      "haply",
      "happi",
      "hapus",
      "haram",
      "hards",
      "hared",
      "hares",
      "harim",
      "harks",
      "harls",
      "harms",
      "harns",
      "haros",
      "harps",
      "harts",
      "hashy",
      "hasks",
      "hasps",
      "hasta",
      "hated",
      "hates",
      "hatha",
      "hauds",
      "haufs",
      "haugh",
      "hauld",
      "haulm",
      "hauls",
      "hault",
      "hauns",
      "hause",
      "haver",
      "haves",
      "hawed",
      "hawks",
      "hawms",
      "hawse",
      "hayed",
      "hayer",
      "hayey",
      "hayle",
      "hazan",
      "hazed",
      "hazer",
      "hazes",
      "heads",
      "heald",
      "heals",
      "heame",
      "heaps",
      "heapy",
      "heare",
      "hears",
      "heast",
      "heats",
      "heben",
      "hebes",
      "hecht",
      "hecks",
      "heder",
      "hedgy",
      "heeds",
      "heedy",
      "heels",
      "heeze",
      "hefte",
      "hefts",
      "heids",
      "heigh",
      "heils",
      "heirs",
      "hejab",
      "hejra",
      "heled",
      "heles",
      "helio",
      "hells",
      "helms",
      "helos",
      "helot",
      "helps",
      "helve",
      "hemal",
      "hemes",
      "hemic",
      "hemin",
      "hemps",
      "hempy",
      "hench",
      "hends",
      "henge",
      "henna",
      "henny",
      "henry",
      "hents",
      "hepar",
      "herbs",
      "herby",
      "herds",
      "heres",
      "herls",
      "herma",
      "herms",
      "herns",
      "heros",
      "herry",
      "herse",
      "hertz",
      "herye",
      "hesps",
      "hests",
      "hetes",
      "heths",
      "heuch",
      "heugh",
      "hevea",
      "hewed",
      "hewer",
      "hewgh",
      "hexad",
      "hexed",
      "hexer",
      "hexes",
      "hexyl",
      "heyed",
      "hiant",
      "hicks",
      "hided",
      "hider",
      "hides",
      "hiems",
      "highs",
      "hight",
      "hijab",
      "hijra",
      "hiked",
      "hiker",
      "hikes",
      "hikoi",
      "hilar",
      "hilch",
      "hillo",
      "hills",
      "hilts",
      "hilum",
      "hilus",
      "himbo",
      "hinau",
      "hinds",
      "hings",
      "hinky",
      "hinny",
      "hints",
      "hiois",
      "hiply",
      "hired",
      "hiree",
      "hirer",
      "hires",
      "hissy",
      "hists",
      "hithe",
      "hived",
      "hiver",
      "hives",
      "hizen",
      "hoaed",
      "hoagy",
      "hoars",
      "hoary",
      "hoast",
      "hobos",
      "hocks",
      "hocus",
      "hodad",
      "hodja",
      "hoers",
      "hogan",
      "hogen",
      "hoggs",
      "hoghs",
      "hohed",
      "hoick",
      "hoied",
      "hoiks",
      "hoing",
      "hoise",
      "hokas",
      "hoked",
      "hokes",
      "hokey",
      "hokis",
      "hokku",
      "hokum",
      "holds",
      "holed",
      "holes",
      "holey",
      "holks",
      "holla",
      "hollo",
      "holme",
      "holms",
      "holon",
      "holos",
      "holts",
      "homas",
      "homed",
      "homes",
      "homey",
      "homie",
      "homme",
      "homos",
      "honan",
      "honda",
      "honds",
      "honed",
      "honer",
      "hones",
      "hongi",
      "hongs",
      "honks",
      "honky",
      "hooch",
      "hoods",
      "hoody",
      "hooey",
      "hoofs",
      "hooka",
      "hooks",
      "hooky",
      "hooly",
      "hoons",
      "hoops",
      "hoord",
      "hoors",
      "hoosh",
      "hoots",
      "hooty",
      "hoove",
      "hopak",
      "hoped",
      "hoper",
      "hopes",
      "hoppy",
      "horah",
      "horal",
      "horas",
      "horis",
      "horks",
      "horme",
      "horns",
      "horst",
      "horsy",
      "hosed",
      "hosel",
      "hosen",
      "hoser",
      "hoses",
      "hosey",
      "hosta",
      "hosts",
      "hotch",
      "hoten",
      "hotty",
      "houff",
      "houfs",
      "hough",
      "houri",
      "hours",
      "houts",
      "hovea",
      "hoved",
      "hoven",
      "hoves",
      "howbe",
      "howes",
      "howff",
      "howfs",
      "howks",
      "howls",
      "howre",
      "howso",
      "hoxed",
      "hoxes",
      "hoyas",
      "hoyed",
      "hoyle",
      "hubby",
      "hucks",
      "hudna",
      "hudud",
      "huers",
      "huffs",
      "huffy",
      "huger",
      "huggy",
      "huhus",
      "huias",
      "hulas",
      "hules",
      "hulks",
      "hulky",
      "hullo",
      "hulls",
      "hully",
      "humas",
      "humfs",
      "humic",
      "humps",
      "humpy",
      "hunks",
      "hunts",
      "hurds",
      "hurls",
      "hurly",
      "hurra",
      "hurst",
      "hurts",
      "hushy",
      "husks",
      "husos",
      "hutia",
      "huzza",
      "huzzy",
      "hwyls",
      "hydra",
      "hyens",
      "hygge",
      "hying",
      "hykes",
      "hylas",
      "hyleg",
      "hyles",
      "hylic",
      "hymns",
      "hynde",
      "hyoid",
      "hyped",
      "hypes",
      "hypha",
      "hyphy",
      "hypos",
      "hyrax",
      "hyson",
      "hythe",
      "iambi",
      "iambs",
      "ibrik",
      "icers",
      "iched",
      "iches",
      "ichor",
      "icier",
      "icker",
      "ickle",
      "icons",
      "ictal",
      "ictic",
      "ictus",
      "idant",
      "ideas",
      "idees",
      "ident",
      "idled",
      "idles",
      "idola",
      "idols",
      "idyls",
      "iftar",
      "igapo",
      "igged",
      "iglus",
      "ihram",
      "ikans",
      "ikats",
      "ikons",
      "ileac",
      "ileal",
      "ileum",
      "ileus",
      "iliad",
      "ilial",
      "ilium",
      "iller",
      "illth",
      "imago",
      "imams",
      "imari",
      "imaum",
      "imbar",
      "imbed",
      "imide",
      "imido",
      "imids",
      "imine",
      "imino",
      "immew",
      "immit",
      "immix",
      "imped",
      "impis",
      "impot",
      "impro",
      "imshi",
      "imshy",
      "inapt",
      "inarm",
      "inbye",
      "incel",
      "incle",
      "incog",
      "incus",
      "incut",
      "indew",
      "india",
      "indie",
      "indol",
      "indow",
      "indri",
      "indue",
      "inerm",
      "infix",
      "infos",
      "infra",
      "ingan",
      "ingle",
      "inion",
      "inked",
      "inker",
      "inkle",
      "inned",
      "innit",
      "inorb",
      "inrun",
      "inset",
      "inspo",
      "intel",
      "intil",
      "intis",
      "intra",
      "inula",
      "inure",
      "inurn",
      "inust",
      "invar",
      "inwit",
      "iodic",
      "iodid",
      "iodin",
      "iotas",
      "ippon",
      "irade",
      "irids",
      "iring",
      "irked",
      "iroko",
      "irone",
      "irons",
      "isbas",
      "ishes",
      "isled",
      "isles",
      "isnae",
      "issei",
      "istle",
      "items",
      "ither",
      "ivied",
      "ivies",
      "ixias",
      "ixnay",
      "ixora",
      "ixtle",
      "izard",
      "izars",
      "izzat",
      "jaaps",
      "jabot",
      "jacal",
      "jacks",
      "jacky",
      "jaded",
      "jades",
      "jafas",
      "jaffa",
      "jagas",
      "jager",
      "jaggs",
      "jaggy",
      "jagir",
      "jagra",
      "jails",
      "jaker",
      "jakes",
      "jakey",
      "jalap",
      "jalop",
      "jambe",
      "jambo",
      "jambs",
      "jambu",
      "james",
      "jammy",
      "jamon",
      "janes",
      "janns",
      "janny",
      "janty",
      "japan",
      "japed",
      "japer",
      "japes",
      "jarks",
      "jarls",
      "jarps",
      "jarta",
      "jarul",
      "jasey",
      "jaspe",
      "jasps",
      "jatos",
      "jauks",
      "jaups",
      "javas",
      "javel",
      "jawan",
      "jawed",
      "jaxie",
      "jeans",
      "jeats",
      "jebel",
      "jedis",
      "jeels",
      "jeely",
      "jeeps",
      "jeers",
      "jeeze",
      "jefes",
      "jeffs",
      "jehad",
      "jehus",
      "jelab",
      "jello",
      "jells",
      "jembe",
      "jemmy",
      "jenny",
      "jeons",
      "jerid",
      "jerks",
      "jerry",
      "jesse",
      "jests",
      "jesus",
      "jetes",
      "jeton",
      "jeune",
      "jewed",
      "jewie",
      "jhala",
      "jiaos",
      "jibba",
      "jibbs",
      "jibed",
      "jiber",
      "jibes",
      "jiffs",
      "jiggy",
      "jigot",
      "jihad",
      "jills",
      "jilts",
      "jimmy",
      "jimpy",
      "jingo",
      "jinks",
      "jinne",
      "jinni",
      "jinns",
      "jirds",
      "jirga",
      "jirre",
      "jisms",
      "jived",
      "jiver",
      "jives",
      "jivey",
      "jnana",
      "jobed",
      "jobes",
      "jocko",
      "jocks",
      "jocky",
      "jocos",
      "jodel",
      "joeys",
      "johns",
      "joins",
      "joked",
      "jokes",
      "jokey",
      "jokol",
      "joled",
      "joles",
      "jolls",
      "jolts",
      "jolty",
      "jomon",
      "jomos",
      "jones",
      "jongs",
      "jonty",
      "jooks",
      "joram",
      "jorum",
      "jotas",
      "jotty",
      "jotun",
      "joual",
      "jougs",
      "jouks",
      "joule",
      "jours",
      "jowar",
      "jowed",
      "jowls",
      "jowly",
      "joyed",
      "jubas",
      "jubes",
      "jucos",
      "judas",
      "judgy",
      "judos",
      "jugal",
      "jugum",
      "jujus",
      "juked",
      "jukes",
      "jukus",
      "julep",
      "jumar",
      "jumby",
      "jumps",
      "junco",
      "junks",
      "junky",
      "jupes",
      "jupon",
      "jural",
      "jurat",
      "jurel",
      "jures",
      "justs",
      "jutes",
      "jutty",
      "juves",
      "juvie",
      "kaama",
      "kabab",
      "kabar",
      "kabob",
      "kacha",
      "kacks",
      "kadai",
      "kades",
      "kadis",
      "kafir",
      "kagos",
      "kagus",
      "kahal",
      "kaiak",
      "kaids",
      "kaies",
      "kaifs",
      "kaika",
      "kaiks",
      "kails",
      "kaims",
      "kaing",
      "kains",
      "kakas",
      "kakis",
      "kalam",
      "kales",
      "kalif",
      "kalis",
      "kalpa",
      "kamas",
      "kames",
      "kamik",
      "kamis",
      "kamme",
      "kanae",
      "kanas",
      "kandy",
      "kaneh",
      "kanes",
      "kanga",
      "kangs",
      "kanji",
      "kants",
      "kanzu",
      "kaons",
      "kapas",
      "kaphs",
      "kapok",
      "kapow",
      "kapus",
      "kaput",
      "karas",
      "karat",
      "karks",
      "karns",
      "karoo",
      "karos",
      "karri",
      "karst",
      "karsy",
      "karts",
      "karzy",
      "kasha",
      "kasme",
      "katal",
      "katas",
      "katis",
      "katti",
      "kaugh",
      "kauri",
      "kauru",
      "kaury",
      "kaval",
      "kavas",
      "kawas",
      "kawau",
      "kawed",
      "kayle",
      "kayos",
      "kazis",
      "kazoo",
      "kbars",
      "kebar",
      "kebob",
      "kecks",
      "kedge",
      "kedgy",
      "keech",
      "keefs",
      "keeks",
      "keels",
      "keema",
      "keeno",
      "keens",
      "keeps",
      "keets",
      "keeve",
      "kefir",
      "kehua",
      "keirs",
      "kelep",
      "kelim",
      "kells",
      "kelly",
      "kelps",
      "kelpy",
      "kelts",
      "kelty",
      "kembo",
      "kembs",
      "kemps",
      "kempt",
      "kempy",
      "kenaf",
      "kench",
      "kendo",
      "kenos",
      "kente",
      "kents",
      "kepis",
      "kerbs",
      "kerel",
      "kerfs",
      "kerky",
      "kerma",
      "kerne",
      "kerns",
      "keros",
      "kerry",
      "kerve",
      "kesar",
      "kests",
      "ketas",
      "ketch",
      "ketes",
      "ketol",
      "kevel",
      "kevil",
      "kexes",
      "keyed",
      "keyer",
      "khadi",
      "khafs",
      "khans",
      "khaph",
      "khats",
      "khaya",
      "khazi",
      "kheda",
      "kheth",
      "khets",
      "khoja",
      "khors",
      "khoum",
      "khuds",
      "kiaat",
      "kiack",
      "kiang",
      "kibbe",
      "kibbi",
      "kibei",
      "kibes",
      "kibla",
      "kicks",
      "kicky",
      "kiddo",
      "kiddy",
      "kidel",
      "kidge",
      "kiefs",
      "kiers",
      "kieve",
      "kievs",
      "kight",
      "kikes",
      "kikoi",
      "kiley",
      "kilim",
      "kills",
      "kilns",
      "kilos",
      "kilps",
      "kilts",
      "kilty",
      "kimbo",
      "kinas",
      "kinda",
      "kinds",
      "kindy",
      "kines",
      "kings",
      "kinin",
      "kinks",
      "kinos",
      "kiore",
      "kipes",
      "kippa",
      "kipps",
      "kirby",
      "kirks",
      "kirns",
      "kirri",
      "kisan",
      "kissy",
      "kists",
      "kited",
      "kiter",
      "kites",
      "kithe",
      "kiths",
      "kitul",
      "kivas",
      "kiwis",
      "klang",
      "klaps",
      "klett",
      "klick",
      "klieg",
      "kliks",
      "klong",
      "kloof",
      "kluge",
      "klutz",
      "knags",
      "knaps",
      "knarl",
      "knars",
      "knaur",
      "knawe",
      "knees",
      "knell",
      "knish",
      "knits",
      "knive",
      "knobs",
      "knops",
      "knosp",
      "knots",
      "knout",
      "knowe",
      "knows",
      "knubs",
      "knurl",
      "knurr",
      "knurs",
      "knuts",
      "koans",
      "koaps",
      "koban",
      "kobos",
      "koels",
      "koffs",
      "kofta",
      "kogal",
      "kohas",
      "kohen",
      "kohls",
      "koine",
      "kojis",
      "kokam",
      "kokas",
      "koker",
      "kokra",
      "kokum",
      "kolas",
      "kolos",
      "kombu",
      "konbu",
      "kondo",
      "konks",
      "kooks",
      "kooky",
      "koori",
      "kopek",
      "kophs",
      "kopje",
      "koppa",
      "korai",
      "koras",
      "korat",
      "kores",
      "korma",
      "koros",
      "korun",
      "korus",
      "koses",
      "kotch",
      "kotos",
      "kotow",
      "koura",
      "kraal",
      "krabs",
      "kraft",
      "krais",
      "krait",
      "krang",
      "krans",
      "kranz",
      "kraut",
      "krays",
      "kreep",
      "kreng",
      "krewe",
      "krona",
      "krone",
      "kroon",
      "krubi",
      "krunk",
      "ksars",
      "kubie",
      "kudos",
      "kudus",
      "kudzu",
      "kufis",
      "kugel",
      "kuias",
      "kukri",
      "kukus",
      "kulak",
      "kulan",
      "kulas",
      "kulfi",
      "kumis",
      "kumys",
      "kuris",
      "kurre",
      "kurta",
      "kurus",
      "kusso",
      "kutas",
      "kutch",
      "kutis",
      "kutus",
      "kuzus",
      "kvass",
      "kvell",
      "kwela",
      "kyack",
      "kyaks",
      "kyang",
      "kyars",
      "kyats",
      "kybos",
      "kydst",
      "kyles",
      "kylie",
      "kylin",
      "kylix",
      "kyloe",
      "kynde",
      "kynds",
      "kypes",
      "kyrie",
      "kytes",
      "kythe",
      "laari",
      "labda",
      "labia",
      "labis",
      "labra",
      "laced",
      "lacer",
      "laces",
      "lacet",
      "lacey",
      "lacks",
      "laddy",
      "laded",
      "lader",
      "lades",
      "laers",
      "laevo",
      "lagan",
      "lahal",
      "lahar",
      "laich",
      "laics",
      "laids",
      "laigh",
      "laika",
      "laiks",
      "laird",
      "lairs",
      "lairy",
      "laith",
      "laity",
      "laked",
      "laker",
      "lakes",
      "lakhs",
      "lakin",
      "laksa",
      "laldy",
      "lalls",
      "lamas",
      "lambs",
      "lamby",
      "lamed",
      "lamer",
      "lames",
      "lamia",
      "lammy",
      "lamps",
      "lanai",
      "lanas",
      "lanch",
      "lande",
      "lands",
      "lanes",
      "lanks",
      "lants",
      "lapin",
      "lapis",
      "lapje",
      "larch",
      "lards",
      "lardy",
      "laree",
      "lares",
      "largo",
      "laris",
      "larks",
      "larky",
      "larns",
      "larnt",
      "larum",
      "lased",
      "laser",
      "lases",
      "lassi",
      "lassu",
      "lassy",
      "lasts",
      "latah",
      "lated",
      "laten",
      "latex",
      "lathi",
      "laths",
      "lathy",
      "latke",
      "latus",
      "lauan",
      "lauch",
      "lauds",
      "laufs",
      "laund",
      "laura",
      "laval",
      "lavas",
      "laved",
      "laver",
      "laves",
      "lavra",
      "lavvy",
      "lawed",
      "lawer",
      "lawin",
      "lawks",
      "lawns",
      "lawny",
      "laxed",
      "laxer",
      "laxes",
      "laxly",
      "layed",
      "layin",
      "layup",
      "lazar",
      "lazed",
      "lazes",
      "lazos",
      "lazzi",
      "lazzo",
      "leads",
      "leady",
      "leafs",
      "leaks",
      "leams",
      "leans",
      "leany",
      "leaps",
      "leare",
      "lears",
      "leary",
      "leats",
      "leavy",
      "leaze",
      "leben",
      "leccy",
      "ledes",
      "ledgy",
      "ledum",
      "leear",
      "leeks",
      "leeps",
      "leers",
      "leese",
      "leets",
      "leeze",
      "lefte",
      "lefts",
      "leger",
      "leges",
      "legge",
      "leggo",
      "legit",
      "lehrs",
      "lehua",
      "leirs",
      "leish",
      "leman",
      "lemed",
      "lemel",
      "lemes",
      "lemma",
      "lemme",
      "lends",
      "lenes",
      "lengs",
      "lenis",
      "lenos",
      "lense",
      "lenti",
      "lento",
      "leone",
      "lepid",
      "lepra",
      "lepta",
      "lered",
      "leres",
      "lerps",
      "lesbo",
      "leses",
      "lests",
      "letch",
      "lethe",
      "letup",
      "leuch",
      "leuco",
      "leuds",
      "leugh",
      "levas",
      "levee",
      "leves",
      "levin",
      "levis",
      "lewis",
      "lexes",
      "lexis",
      "lezes",
      "lezza",
      "lezzy",
      "liana",
      "liane",
      "liang",
      "liard",
      "liars",
      "liart",
      "liber",
      "libra",
      "libri",
      "lichi",
      "licht",
      "licit",
      "licks",
      "lidar",
      "lidos",
      "liefs",
      "liens",
      "liers",
      "lieus",
      "lieve",
      "lifer",
      "lifes",
      "lifts",
      "ligan",
      "liger",
      "ligge",
      "ligne",
      "liked",
      "liker",
      "likes",
      "likin",
      "lills",
      "lilos",
      "lilts",
      "liman",
      "limas",
      "limax",
      "limba",
      "limbi",
      "limbs",
      "limby",
      "limed",
      "limen",
      "limes",
      "limey",
      "limma",
      "limns",
      "limos",
      "limpa",
      "limps",
      "linac",
      "linch",
      "linds",
      "lindy",
      "lined",
      "lines",
      "liney",
      "linga",
      "lings",
      "lingy",
      "linin",
      "links",
      "linky",
      "linns",
      "linny",
      "linos",
      "lints",
      "linty",
      "linum",
      "linux",
      "lions",
      "lipas",
      "lipes",
      "lipin",
      "lipos",
      "lippy",
      "liras",
      "lirks",
      "lirot",
      "lisks",
      "lisle",
      "lisps",
      "lists",
      "litai",
      "litas",
      "lited",
      "liter",
      "lites",
      "litho",
      "liths",
      "litre",
      "lived",
      "liven",
      "lives",
      "livor",
      "livre",
      "llano",
      "loach",
      "loads",
      "loafs",
      "loams",
      "loans",
      "loast",
      "loave",
      "lobar",
      "lobed",
      "lobes",
      "lobos",
      "lobus",
      "loche",
      "lochs",
      "locie",
      "locis",
      "locks",
      "locos",
      "locum",
      "loden",
      "lodes",
      "loess",
      "lofts",
      "logan",
      "loges",
      "loggy",
      "logia",
      "logie",
      "logoi",
      "logon",
      "logos",
      "lohan",
      "loids",
      "loins",
      "loipe",
      "loirs",
      "lokes",
      "lolls",
      "lolly",
      "lolog",
      "lomas",
      "lomed",
      "lomes",
      "loner",
      "longa",
      "longe",
      "longs",
      "looby",
      "looed",
      "looey",
      "loofa",
      "loofs",
      "looie",
      "looks",
      "looky",
      "looms",
      "loons",
      "loony",
      "loops",
      "loord",
      "loots",
      "loped",
      "loper",
      "lopes",
      "loppy",
      "loral",
      "loran",
      "lords",
      "lordy",
      "lorel",
      "lores",
      "loric",
      "loris",
      "losed",
      "losel",
      "losen",
      "loses",
      "lossy",
      "lotah",
      "lotas",
      "lotes",
      "lotic",
      "lotos",
      "lotsa",
      "lotta",
      "lotte",
      "lotto",
      "lotus",
      "loued",
      "lough",
      "louie",
      "louis",
      "louma",
      "lound",
      "louns",
      "loupe",
      "loups",
      "loure",
      "lours",
      "loury",
      "louts",
      "lovat",
      "loved",
      "loves",
      "lovey",
      "lovie",
      "lowan",
      "lowed",
      "lowes",
      "lownd",
      "lowne",
      "lowns",
      "lowps",
      "lowry",
      "lowse",
      "lowts",
      "loxed",
      "loxes",
      "lozen",
      "luach",
      "luaus",
      "lubed",
      "lubes",
      "lubra",
      "luces",
      "lucks",
      "lucre",
      "ludes",
      "ludic",
      "ludos",
      "luffa",
      "luffs",
      "luged",
      "luger",
      "luges",
      "lulls",
      "lulus",
      "lumas",
      "lumbi",
      "lumme",
      "lummy",
      "lumps",
      "lunas",
      "lunes",
      "lunet",
      "lungi",
      "lungs",
      "lunks",
      "lunts",
      "lupin",
      "lured",
      "lurer",
      "lures",
      "lurex",
      "lurgi",
      "lurgy",
      "lurks",
      "lurry",
      "lurve",
      "luser",
      "lushy",
      "lusks",
      "lusts",
      "lusus",
      "lutea",
      "luted",
      "luter",
      "lutes",
      "luvvy",
      "luxed",
      "luxer",
      "luxes",
      "lweis",
      "lyams",
      "lyard",
      "lyart",
      "lyase",
      "lycea",
      "lycee",
      "lycra",
      "lymes",
      "lynes",
      "lyres",
      "lysed",
      "lyses",
      "lysin",
      "lysis",
      "lysol",
      "lyssa",
      "lyted",
      "lytes",
      "lythe",
      "lytic",
      "lytta",
      "maaed",
      "maare",
      "maars",
      "mabes",
      "macas",
      "maced",
      "macer",
      "maces",
      "mache",
      "machi",
      "machs",
      "macks",
      "macle",
      "macon",
      "madge",
      "madid",
      "madre",
      "maerl",
      "mafic",
      "mages",
      "maggs",
      "magot",
      "magus",
      "mahoe",
      "mahua",
      "mahwa",
      "maids",
      "maiko",
      "maiks",
      "maile",
      "maill",
      "mails",
      "maims",
      "mains",
      "maire",
      "mairs",
      "maise",
      "maist",
      "makar",
      "makes",
      "makis",
      "makos",
      "malam",
      "malar",
      "malas",
      "malax",
      "males",
      "malic",
      "malik",
      "malis",
      "malls",
      "malms",
      "malmy",
      "malts",
      "malty",
      "malus",
      "malva",
      "malwa",
      "mamas",
      "mamba",
      "mamee",
      "mamey",
      "mamie",
      "manas",
      "manat",
      "mandi",
      "maneb",
      "maned",
      "maneh",
      "manes",
      "manet",
      "mangs",
      "manis",
      "manky",
      "manna",
      "manos",
      "manse",
      "manta",
      "manto",
      "manty",
      "manul",
      "manus",
      "mapau",
      "maqui",
      "marae",
      "marah",
      "maras",
      "marcs",
      "mardy",
      "mares",
      "marge",
      "margs",
      "maria",
      "marid",
      "marka",
      "marks",
      "marle",
      "marls",
      "marly",
      "marms",
      "maron",
      "maror",
      "marra",
      "marri",
      "marse",
      "marts",
      "marvy",
      "masas",
      "mased",
      "maser",
      "mases",
      "mashy",
      "masks",
      "massa",
      "massy",
      "masts",
      "masty",
      "masus",
      "matai",
      "mated",
      "mater",
      "mates",
      "maths",
      "matin",
      "matlo",
      "matte",
      "matts",
      "matza",
      "matzo",
      "mauby",
      "mauds",
      "mauls",
      "maund",
      "mauri",
      "mausy",
      "mauts",
      "mauzy",
      "maven",
      "mavie",
      "mavin",
      "mavis",
      "mawed",
      "mawks",
      "mawky",
      "mawns",
      "mawrs",
      "maxed",
      "maxes",
      "maxis",
      "mayan",
      "mayas",
      "mayed",
      "mayos",
      "mayst",
      "mazed",
      "mazer",
      "mazes",
      "mazey",
      "mazut",
      "mbira",
      "meads",
      "meals",
      "meane",
      "means",
      "meany",
      "meare",
      "mease",
      "meath",
      "meats",
      "mebos",
      "mechs",
      "mecks",
      "medii",
      "medle",
      "meeds",
      "meers",
      "meets",
      "meffs",
      "meins",
      "meint",
      "meiny",
      "meith",
      "mekka",
      "melas",
      "melba",
      "melds",
      "melic",
      "melik",
      "mells",
      "melts",
      "melty",
      "memes",
      "memos",
      "menad",
      "mends",
      "mened",
      "menes",
      "menge",
      "mengs",
      "mensa",
      "mense",
      "mensh",
      "menta",
      "mento",
      "menus",
      "meous",
      "meows",
      "merch",
      "mercs",
      "merde",
      "mered",
      "merel",
      "merer",
      "meres",
      "meril",
      "meris",
      "merks",
      "merle",
      "merls",
      "merse",
      "mesal",
      "mesas",
      "mesel",
      "meses",
      "meshy",
      "mesic",
      "mesne",
      "meson",
      "messy",
      "mesto",
      "meted",
      "metes",
      "metho",
      "meths",
      "metic",
      "metif",
      "metis",
      "metol",
      "metre",
      "meuse",
      "meved",
      "meves",
      "mewed",
      "mewls",
      "meynt",
      "mezes",
      "mezze",
      "mezzo",
      "mhorr",
      "miaou",
      "miaow",
      "miasm",
      "miaul",
      "micas",
      "miche",
      "micht",
      "micks",
      "micky",
      "micos",
      "micra",
      "middy",
      "midgy",
      "midis",
      "miens",
      "mieve",
      "miffs",
      "miffy",
      "mifty",
      "miggs",
      "mihas",
      "mihis",
      "miked",
      "mikes",
      "mikra",
      "mikva",
      "milch",
      "milds",
      "miler",
      "miles",
      "milfs",
      "milia",
      "milko",
      "milks",
      "mille",
      "mills",
      "milor",
      "milos",
      "milpa",
      "milts",
      "milty",
      "miltz",
      "mimed",
      "mimeo",
      "mimer",
      "mimes",
      "mimsy",
      "minae",
      "minar",
      "minas",
      "mincy",
      "minds",
      "mined",
      "mines",
      "minge",
      "mings",
      "mingy",
      "minis",
      "minke",
      "minks",
      "minny",
      "minos",
      "mints",
      "mired",
      "mires",
      "mirex",
      "mirid",
      "mirin",
      "mirks",
      "mirky",
      "mirly",
      "miros",
      "mirvs",
      "mirza",
      "misch",
      "misdo",
      "mises",
      "misgo",
      "misos",
      "missa",
      "mists",
      "misty",
      "mitch",
      "miter",
      "mites",
      "mitis",
      "mitre",
      "mitts",
      "mixed",
      "mixen",
      "mixer",
      "mixes",
      "mixte",
      "mixup",
      "mizen",
      "mizzy",
      "mneme",
      "moans",
      "moats",
      "mobby",
      "mobes",
      "mobey",
      "mobie",
      "moble",
      "mochi",
      "mochs",
      "mochy",
      "mocks",
      "moder",
      "modes",
      "modge",
      "modii",
      "modus",
      "moers",
      "mofos",
      "moggy",
      "mohel",
      "mohos",
      "mohrs",
      "mohua",
      "mohur",
      "moile",
      "moils",
      "moira",
      "moire",
      "moits",
      "mojos",
      "mokes",
      "mokis",
      "mokos",
      "molal",
      "molas",
      "molds",
      "moled",
      "moles",
      "molla",
      "molls",
      "molly",
      "molto",
      "molts",
      "molys",
      "momes",
      "momma",
      "mommy",
      "momus",
      "monad",
      "monal",
      "monas",
      "monde",
      "mondo",
      "moner",
      "mongo",
      "mongs",
      "monic",
      "monie",
      "monks",
      "monos",
      "monte",
      "monty",
      "moobs",
      "mooch",
      "moods",
      "mooed",
      "mooks",
      "moola",
      "mooli",
      "mools",
      "mooly",
      "moong",
      "moons",
      "moony",
      "moops",
      "moors",
      "moory",
      "moots",
      "moove",
      "moped",
      "moper",
      "mopes",
      "mopey",
      "moppy",
      "mopsy",
      "mopus",
      "morae",
      "moras",
      "morat",
      "moray",
      "morel",
      "mores",
      "moria",
      "morne",
      "morns",
      "morra",
      "morro",
      "morse",
      "morts",
      "mosed",
      "moses",
      "mosey",
      "mosks",
      "mosso",
      "moste",
      "mosts",
      "moted",
      "moten",
      "motes",
      "motet",
      "motey",
      "moths",
      "mothy",
      "motis",
      "motte",
      "motts",
      "motty",
      "motus",
      "motza",
      "mouch",
      "moues",
      "mould",
      "mouls",
      "moups",
      "moust",
      "mousy",
      "moved",
      "moves",
      "mowas",
      "mowed",
      "mowra",
      "moxas",
      "moxie",
      "moyas",
      "moyle",
      "moyls",
      "mozed",
      "mozes",
      "mozos",
      "mpret",
      "mucho",
      "mucic",
      "mucid",
      "mucin",
      "mucks",
      "mucor",
      "mucro",
      "mudge",
      "mudir",
      "mudra",
      "muffs",
      "mufti",
      "mugga",
      "muggs",
      "muggy",
      "muhly",
      "muids",
      "muils",
      "muirs",
      "muist",
      "mujik",
      "mulct",
      "muled",
      "mules",
      "muley",
      "mulga",
      "mulie",
      "mulla",
      "mulls",
      "mulse",
      "mulsh",
      "mumms",
      "mumps",
      "mumsy",
      "mumus",
      "munga",
      "munge",
      "mungo",
      "mungs",
      "munis",
      "munts",
      "muntu",
      "muons",
      "muras",
      "mured",
      "mures",
      "murex",
      "murid",
      "murks",
      "murls",
      "murly",
      "murra",
      "murre",
      "murri",
      "murrs",
      "murry",
      "murti",
      "murva",
      "musar",
      "musca",
      "mused",
      "muser",
      "muses",
      "muset",
      "musha",
      "musit",
      "musks",
      "musos",
      "musse",
      "mussy",
      "musth",
      "musts",
      "mutch",
      "muted",
      "muter",
      "mutes",
      "mutha",
      "mutis",
      "muton",
      "mutts",
      "muxed",
      "muxes",
      "muzak",
      "muzzy",
      "mvule",
      "myall",
      "mylar",
      "mynah",
      "mynas",
      "myoid",
      "myoma",
      "myope",
      "myops",
      "myopy",
      "mysid",
      "mythi",
      "myths",
      "mythy",
      "myxos",
      "mzees",
      "naams",
      "naans",
      "nabes",
      "nabis",
      "nabks",
      "nabla",
      "nabob",
      "nache",
      "nacho",
      "nacre",
      "nadas",
      "naeve",
      "naevi",
      "naffs",
      "nagas",
      "naggy",
      "nagor",
      "nahal",
      "naiad",
      "naifs",
      "naiks",
      "nails",
      "naira",
      "nairu",
      "naked",
      "naker",
      "nakfa",
      "nalas",
      "naled",
      "nalla",
      "named",
      "namer",
      "names",
      "namma",
      "namus",
      "nanas",
      "nance",
      "nancy",
      "nandu",
      "nanna",
      "nanos",
      "nanua",
      "napas",
      "naped",
      "napes",
      "napoo",
      "nappa",
      "nappe",
      "nappy",
      "naras",
      "narco",
      "narcs",
      "nards",
      "nares",
      "naric",
      "naris",
      "narks",
      "narky",
      "narre",
      "nashi",
      "natch",
      "nates",
      "natis",
      "natty",
      "nauch",
      "naunt",
      "navar",
      "naves",
      "navew",
      "navvy",
      "nawab",
      "nazes",
      "nazir",
      "nazis",
      "nduja",
      "neafe",
      "neals",
      "neaps",
      "nears",
      "neath",
      "neats",
      "nebek",
      "nebel",
      "necks",
      "neddy",
      "needs",
      "neeld",
      "neele",
      "neemb",
      "neems",
      "neeps",
      "neese",
      "neeze",
      "negro",
      "negus",
      "neifs",
      "neist",
      "neive",
      "nelis",
      "nelly",
      "nemas",
      "nemns",
      "nempt",
      "nenes",
      "neons",
      "neper",
      "nepit",
      "neral",
      "nerds",
      "nerka",
      "nerks",
      "nerol",
      "nerts",
      "nertz",
      "nervy",
      "nests",
      "netes",
      "netop",
      "netts",
      "netty",
      "neuks",
      "neume",
      "neums",
      "nevel",
      "neves",
      "nevus",
      "newbs",
      "newed",
      "newel",
      "newie",
      "newsy",
      "newts",
      "nexts",
      "nexus",
      "ngaio",
      "ngana",
      "ngati",
      "ngoma",
      "ngwee",
      "nicad",
      "nicht",
      "nicks",
      "nicol",
      "nidal",
      "nided",
      "nides",
      "nidor",
      "nidus",
      "niefs",
      "nieve",
      "nifes",
      "niffs",
      "niffy",
      "nifty",
      "niger",
      "nighs",
      "nihil",
      "nikab",
      "nikah",
      "nikau",
      "nills",
      "nimbi",
      "nimbs",
      "nimps",
      "niner",
      "nines",
      "ninon",
      "nipas",
      "nippy",
      "niqab",
      "nirls",
      "nirly",
      "nisei",
      "nisse",
      "nisus",
      "niter",
      "nites",
      "nitid",
      "niton",
      "nitre",
      "nitro",
      "nitry",
      "nitty",
      "nival",
      "nixed",
      "nixer",
      "nixes",
      "nixie",
      "nizam",
      "nkosi",
      "noahs",
      "nobby",
      "nocks",
      "nodal",
      "noddy",
      "nodes",
      "nodus",
      "noels",
      "noggs",
      "nohow",
      "noils",
      "noily",
      "noint",
      "noirs",
      "noles",
      "nolls",
      "nolos",
      "nomas",
      "nomen",
      "nomes",
      "nomic",
      "nomoi",
      "nomos",
      "nonas",
      "nonce",
      "nones",
      "nonet",
      "nongs",
      "nonis",
      "nonny",
      "nonyl",
      "noobs",
      "nooit",
      "nooks",
      "nooky",
      "noons",
      "noops",
      "nopal",
      "noria",
      "noris",
      "norks",
      "norma",
      "norms",
      "nosed",
      "noser",
      "noses",
      "notal",
      "noted",
      "noter",
      "notes",
      "notum",
      "nould",
      "noule",
      "nouls",
      "nouns",
      "nouny",
      "noups",
      "novae",
      "novas",
      "novum",
      "noway",
      "nowed",
      "nowls",
      "nowts",
      "nowty",
      "noxal",
      "noxes",
      "noyau",
      "noyed",
      "noyes",
      "nubby",
      "nubia",
      "nucha",
      "nuddy",
      "nuder",
      "nudes",
      "nudie",
      "nudzh",
      "nuffs",
      "nugae",
      "nuked",
      "nukes",
      "nulla",
      "nulls",
      "numbs",
      "numen",
      "nummy",
      "nunny",
      "nurds",
      "nurdy",
      "nurls",
      "nurrs",
      "nutso",
      "nutsy",
      "nyaff",
      "nyala",
      "nying",
      "nyssa",
      "oaked",
      "oaker",
      "oakum",
      "oared",
      "oases",
      "oasis",
      "oasts",
      "oaten",
      "oater",
      "oaths",
      "oaves",
      "obang",
      "obeah",
      "obeli",
      "obeys",
      "obias",
      "obied",
      "obiit",
      "obits",
      "objet",
      "oboes",
      "obole",
      "oboli",
      "obols",
      "occam",
      "ocher",
      "oches",
      "ochre",
      "ochry",
      "ocker",
      "ocrea",
      "octad",
      "octan",
      "octas",
      "octyl",
      "oculi",
      "odahs",
      "odals",
      "odeon",
      "odeum",
      "odism",
      "odist",
      "odium",
      "odors",
      "odour",
      "odyle",
      "odyls",
      "ofays",
      "offed",
      "offie",
      "oflag",
      "ofter",
      "ogams",
      "ogeed",
      "ogees",
      "oggin",
      "ogham",
      "ogive",
      "ogled",
      "ogler",
      "ogles",
      "ogmic",
      "ogres",
      "ohias",
      "ohing",
      "ohmic",
      "ohone",
      "oidia",
      "oiled",
      "oiler",
      "oinks",
      "oints",
      "ojime",
      "okapi",
      "okays",
      "okehs",
      "okras",
      "oktas",
      "oldie",
      "oleic",
      "olein",
      "olent",
      "oleos",
      "oleum",
      "olios",
      "ollas",
      "ollav",
      "oller",
      "ollie",
      "ology",
      "olpae",
      "olpes",
      "omasa",
      "omber",
      "ombus",
      "omens",
      "omers",
      "omits",
      "omlah",
      "omovs",
      "omrah",
      "oncer",
      "onces",
      "oncet",
      "oncus",
      "onely",
      "oners",
      "onery",
      "onium",
      "onkus",
      "onlay",
      "onned",
      "ontic",
      "oobit",
      "oohed",
      "oomph",
      "oonts",
      "ooped",
      "oorie",
      "ooses",
      "ootid",
      "oozed",
      "oozes",
      "opahs",
      "opals",
      "opens",
      "opepe",
      "oping",
      "oppos",
      "opsin",
      "opted",
      "opter",
      "orach",
      "oracy",
      "orals",
      "orang",
      "orant",
      "orate",
      "orbed",
      "orcas",
      "orcin",
      "ordos",
      "oread",
      "orfes",
      "orgia",
      "orgic",
      "orgue",
      "oribi",
      "oriel",
      "orixa",
      "orles",
      "orlon",
      "orlop",
      "ormer",
      "ornis",
      "orpin",
      "orris",
      "ortho",
      "orval",
      "orzos",
      "oscar",
      "oshac",
      "osier",
      "osmic",
      "osmol",
      "ossia",
      "ostia",
      "otaku",
      "otary",
      "ottar",
      "ottos",
      "oubit",
      "oucht",
      "ouens",
      "ouija",
      "oulks",
      "oumas",
      "oundy",
      "oupas",
      "ouped",
      "ouphe",
      "ouphs",
      "ourie",
      "ousel",
      "ousts",
      "outby",
      "outed",
      "outre",
      "outro",
      "outta",
      "ouzel",
      "ouzos",
      "ovals",
      "ovels",
      "ovens",
      "overs",
      "ovist",
      "ovoli",
      "ovolo",
      "ovule",
      "owche",
      "owies",
      "owled",
      "owler",
      "owlet",
      "owned",
      "owres",
      "owrie",
      "owsen",
      "oxbow",
      "oxers",
      "oxeye",
      "oxids",
      "oxies",
      "oxime",
      "oxims",
      "oxlip",
      "oxter",
      "oyers",
      "ozeki",
      "ozzie",
      "paals",
      "paans",
      "pacas",
      "paced",
      "pacer",
      "paces",
      "pacey",
      "pacha",
      "packs",
      "pacos",
      "pacta",
      "pacts",
      "padis",
      "padle",
      "padma",
      "padre",
      "padri",
      "paean",
      "paedo",
      "paeon",
      "paged",
      "pager",
      "pages",
      "pagle",
      "pagod",
      "pagri",
      "paiks",
      "pails",
      "pains",
      "paire",
      "pairs",
      "paisa",
      "paise",
      "pakka",
      "palas",
      "palay",
      "palea",
      "paled",
      "pales",
      "palet",
      "palis",
      "palki",
      "palla",
      "palls",
      "pally",
      "palms",
      "palmy",
      "palpi",
      "palps",
      "palsa",
      "pampa",
      "panax",
      "pance",
      "panda",
      "pands",
      "pandy",
      "paned",
      "panes",
      "panga",
      "pangs",
      "panim",
      "panko",
      "panne",
      "panni",
      "panto",
      "pants",
      "panty",
      "paoli",
      "paolo",
      "papas",
      "papaw",
      "papes",
      "pappi",
      "pappy",
      "parae",
      "paras",
      "parch",
      "pardi",
      "pards",
      "pardy",
      "pared",
      "paren",
      "pareo",
      "pares",
      "pareu",
      "parev",
      "parge",
      "pargo",
      "paris",
      "parki",
      "parks",
      "parky",
      "parle",
      "parly",
      "parma",
      "parol",
      "parps",
      "parra",
      "parrs",
      "parti",
      "parts",
      "parve",
      "parvo",
      "paseo",
      "pases",
      "pasha",
      "pashm",
      "paska",
      "paspy",
      "passe",
      "pasts",
      "pated",
      "paten",
      "pater",
      "pates",
      "paths",
      "patin",
      "patka",
      "patly",
      "patte",
      "patus",
      "pauas",
      "pauls",
      "pavan",
      "paved",
      "paven",
      "paver",
      "paves",
      "pavid",
      "pavin",
      "pavis",
      "pawas",
      "pawaw",
      "pawed",
      "pawer",
      "pawks",
      "pawky",
      "pawls",
      "pawns",
      "paxes",
      "payed",
      "payor",
      "paysd",
      "peage",
      "peags",
      "peaks",
      "peaky",
      "peals",
      "peans",
      "peare",
      "pears",
      "peart",
      "pease",
      "peats",
      "peaty",
      "peavy",
      "peaze",
      "pebas",
      "pechs",
      "pecke",
      "pecks",
      "pecky",
      "pedes",
      "pedis",
      "pedro",
      "peece",
      "peeks",
      "peels",
      "peens",
      "peeoy",
      "peepe",
      "peeps",
      "peers",
      "peery",
      "peeve",
      "peggy",
      "peghs",
      "peins",
      "peise",
      "peize",
      "pekan",
      "pekes",
      "pekin",
      "pekoe",
      "pelas",
      "pelau",
      "peles",
      "pelfs",
      "pells",
      "pelma",
      "pelon",
      "pelta",
      "pelts",
      "pends",
      "pendu",
      "pened",
      "penes",
      "pengo",
      "penie",
      "penis",
      "penks",
      "penna",
      "penni",
      "pents",
      "peons",
      "peony",
      "pepla",
      "pepos",
      "peppy",
      "pepsi",
      "perai",
      "perce",
      "percs",
      "perdu",
      "perdy",
      "perea",
      "peres",
      "peris",
      "perks",
      "perms",
      "perns",
      "perog",
      "perps",
      "perry",
      "perse",
      "perst",
      "perts",
      "perve",
      "pervo",
      "pervs",
      "pervy",
      "pesos",
      "pests",
      "pesty",
      "petar",
      "peter",
      "petit",
      "petre",
      "petri",
      "petti",
      "petto",
      "pewee",
      "pewit",
      "peyse",
      "phage",
      "phang",
      "phare",
      "pharm",
      "pheer",
      "phene",
      "pheon",
      "phese",
      "phial",
      "phish",
      "phizz",
      "phlox",
      "phoca",
      "phono",
      "phons",
      "phots",
      "phpht",
      "phuts",
      "phyla",
      "phyle",
      "piani",
      "pians",
      "pibal",
      "pical",
      "picas",
      "piccy",
      "picks",
      "picot",
      "picra",
      "picul",
      "piend",
      "piers",
      "piert",
      "pieta",
      "piets",
      "piezo",
      "pight",
      "pigmy",
      "piing",
      "pikas",
      "pikau",
      "piked",
      "piker",
      "pikes",
      "pikey",
      "pikis",
      "pikul",
      "pilae",
      "pilaf",
      "pilao",
      "pilar",
      "pilau",
      "pilaw",
      "pilch",
      "pilea",
      "piled",
      "pilei",
      "piler",
      "piles",
      "pilis",
      "pills",
      "pilow",
      "pilum",
      "pilus",
      "pimas",
      "pimps",
      "pinas",
      "pined",
      "pines",
      "pingo",
      "pings",
      "pinko",
      "pinks",
      "pinna",
      "pinny",
      "pinon",
      "pinot",
      "pinta",
      "pints",
      "pinup",
      "pions",
      "piony",
      "pious",
      "pioye",
      "pioys",
      "pipal",
      "pipas",
      "piped",
      "pipes",
      "pipet",
      "pipis",
      "pipit",
      "pippy",
      "pipul",
      "pirai",
      "pirls",
      "pirns",
      "pirog",
      "pisco",
      "pises",
      "pisky",
      "pisos",
      "pissy",
      "piste",
      "pitas",
      "piths",
      "piton",
      "pitot",
      "pitta",
      "piums",
      "pixes",
      "pized",
      "pizes",
      "plaas",
      "plack",
      "plage",
      "plans",
      "plaps",
      "plash",
      "plasm",
      "plast",
      "plats",
      "platt",
      "platy",
      "playa",
      "plays",
      "pleas",
      "plebe",
      "plebs",
      "plena",
      "pleon",
      "plesh",
      "plews",
      "plica",
      "plies",
      "plims",
      "pling",
      "plink",
      "ploat",
      "plods",
      "plong",
      "plonk",
      "plook",
      "plops",
      "plots",
      "plotz",
      "plouk",
      "plows",
      "ploye",
      "ploys",
      "plues",
      "pluff",
      "plugs",
      "plums",
      "plumy",
      "pluot",
      "pluto",
      "plyer",
      "poach",
      "poaka",
      "poake",
      "poboy",
      "pocks",
      "pocky",
      "podal",
      "poddy",
      "podex",
      "podge",
      "podgy",
      "podia",
      "poems",
      "poeps",
      "poets",
      "pogey",
      "pogge",
      "pogos",
      "pohed",
      "poilu",
      "poind",
      "pokal",
      "poked",
      "pokes",
      "pokey",
      "pokie",
      "poled",
      "poler",
      "poles",
      "poley",
      "polio",
      "polis",
      "polje",
      "polks",
      "polls",
      "polly",
      "polos",
      "polts",
      "polys",
      "pombe",
      "pomes",
      "pommy",
      "pomos",
      "pomps",
      "ponce",
      "poncy",
      "ponds",
      "pones",
      "poney",
      "ponga",
      "pongo",
      "pongs",
      "pongy",
      "ponks",
      "ponts",
      "ponty",
      "ponzu",
      "poods",
      "pooed",
      "poofs",
      "poofy",
      "poohs",
      "pooja",
      "pooka",
      "pooks",
      "pools",
      "poons",
      "poops",
      "poopy",
      "poori",
      "poort",
      "poots",
      "poove",
      "poovy",
      "popes",
      "poppa",
      "popsy",
      "porae",
      "poral",
      "pored",
      "porer",
      "pores",
      "porge",
      "porgy",
      "porin",
      "porks",
      "porky",
      "porno",
      "porns",
      "porny",
      "porta",
      "ports",
      "porty",
      "posed",
      "poses",
      "posey",
      "posho",
      "posts",
      "potae",
      "potch",
      "poted",
      "potes",
      "potin",
      "potoo",
      "potsy",
      "potto",
      "potts",
      "potty",
      "pouff",
      "poufs",
      "pouke",
      "pouks",
      "poule",
      "poulp",
      "poult",
      "poupe",
      "poupt",
      "pours",
      "pouts",
      "powan",
      "powin",
      "pownd",
      "powns",
      "powny",
      "powre",
      "poxed",
      "poxes",
      "poynt",
      "poyou",
      "poyse",
      "pozzy",
      "praam",
      "prads",
      "prahu",
      "prams",
      "prana",
      "prang",
      "praos",
      "prase",
      "prate",
      "prats",
      "pratt",
      "praty",
      "praus",
      "prays",
      "predy",
      "preed",
      "prees",
      "preif",
      "prems",
      "premy",
      "prent",
      "preon",
      "preop",
      "preps",
      "presa",
      "prese",
      "prest",
      "preve",
      "prexy",
      "preys",
      "prial",
      "pricy",
      "prief",
      "prier",
      "pries",
      "prigs",
      "prill",
      "prima",
      "primi",
      "primp",
      "prims",
      "primy",
      "prink",
      "prion",
      "prise",
      "priss",
      "proas",
      "probs",
      "prods",
      "proem",
      "profs",
      "progs",
      "proin",
      "proke",
      "prole",
      "proll",
      "promo",
      "proms",
      "pronk",
      "props",
      "prore",
      "proso",
      "pross",
      "prost",
      "prosy",
      "proto",
      "proul",
      "prows",
      "proyn",
      "prunt",
      "pruta",
      "pryer",
      "pryse",
      "pseud",
      "pshaw",
      "psion",
      "psoae",
      "psoai",
      "psoas",
      "psora",
      "psych",
      "psyop",
      "pubco",
      "pubes",
      "pubis",
      "pucan",
      "pucer",
      "puces",
      "pucka",
      "pucks",
      "puddy",
      "pudge",
      "pudic",
      "pudor",
      "pudsy",
      "pudus",
      "puers",
      "puffa",
      "puffs",
      "puggy",
      "pugil",
      "puhas",
      "pujah",
      "pujas",
      "pukas",
      "puked",
      "puker",
      "pukes",
      "pukey",
      "pukka",
      "pukus",
      "pulao",
      "pulas",
      "puled",
      "puler",
      "pules",
      "pulik",
      "pulis",
      "pulka",
      "pulks",
      "pulli",
      "pulls",
      "pully",
      "pulmo",
      "pulps",
      "pulus",
      "pumas",
      "pumie",
      "pumps",
      "punas",
      "punce",
      "punga",
      "pungs",
      "punji",
      "punka",
      "punks",
      "punky",
      "punny",
      "punto",
      "punts",
      "punty",
      "pupae",
      "pupas",
      "pupus",
      "purda",
      "pured",
      "pures",
      "purin",
      "puris",
      "purls",
      "purpy",
      "purrs",
      "pursy",
      "purty",
      "puses",
      "pusle",
      "pussy",
      "putid",
      "puton",
      "putti",
      "putto",
      "putts",
      "puzel",
      "pwned",
      "pyats",
      "pyets",
      "pygal",
      "pyins",
      "pylon",
      "pyned",
      "pynes",
      "pyoid",
      "pyots",
      "pyral",
      "pyran",
      "pyres",
      "pyrex",
      "pyric",
      "pyros",
      "pyxed",
      "pyxes",
      "pyxie",
      "pyxis",
      "pzazz",
      "qadis",
      "qaids",
      "qajaq",
      "qanat",
      "qapik",
      "qibla",
      "qophs",
      "qorma",
      "quads",
      "quaff",
      "quags",
      "quair",
      "quais",
      "quaky",
      "quale",
      "quant",
      "quare",
      "quass",
      "quate",
      "quats",
      "quayd",
      "quays",
      "qubit",
      "quean",
      "queme",
      "quena",
      "quern",
      "queyn",
      "queys",
      "quich",
      "quids",
      "quiff",
      "quims",
      "quina",
      "quine",
      "quino",
      "quins",
      "quint",
      "quipo",
      "quips",
      "quipu",
      "quire",
      "quirt",
      "quist",
      "quits",
      "quoad",
      "quods",
      "quoif",
      "quoin",
      "quoit",
      "quoll",
      "quonk",
      "quops",
      "qursh",
      "quyte",
      "rabat",
      "rabic",
      "rabis",
      "raced",
      "races",
      "rache",
      "racks",
      "racon",
      "radge",
      "radix",
      "radon",
      "raffs",
      "rafts",
      "ragas",
      "ragde",
      "raged",
      "ragee",
      "rager",
      "rages",
      "ragga",
      "raggs",
      "raggy",
      "ragis",
      "ragus",
      "rahed",
      "rahui",
      "raias",
      "raids",
      "raiks",
      "raile",
      "rails",
      "raine",
      "rains",
      "raird",
      "raita",
      "raits",
      "rajas",
      "rajes",
      "raked",
      "rakee",
      "raker",
      "rakes",
      "rakia",
      "rakis",
      "rakus",
      "rales",
      "ramal",
      "ramee",
      "ramet",
      "ramie",
      "ramin",
      "ramis",
      "rammy",
      "ramps",
      "ramus",
      "ranas",
      "rance",
      "rands",
      "ranee",
      "ranga",
      "rangi",
      "rangs",
      "rangy",
      "ranid",
      "ranis",
      "ranke",
      "ranks",
      "rants",
      "raped",
      "raper",
      "rapes",
      "raphe",
      "rappe",
      "rared",
      "raree",
      "rares",
      "rarks",
      "rased",
      "raser",
      "rases",
      "rasps",
      "rasse",
      "rasta",
      "ratal",
      "ratan",
      "ratas",
      "ratch",
      "rated",
      "ratel",
      "rater",
      "rates",
      "ratha",
      "rathe",
      "raths",
      "ratoo",
      "ratos",
      "ratus",
      "rauns",
      "raupo",
      "raved",
      "ravel",
      "raver",
      "raves",
      "ravey",
      "ravin",
      "rawer",
      "rawin",
      "rawly",
      "rawns",
      "raxed",
      "raxes",
      "rayah",
      "rayas",
      "rayed",
      "rayle",
      "rayne",
      "razed",
      "razee",
      "razer",
      "razes",
      "razoo",
      "readd",
      "reads",
      "reais",
      "reaks",
      "realo",
      "reals",
      "reame",
      "reams",
      "reamy",
      "reans",
      "reaps",
      "rears",
      "reast",
      "reata",
      "reate",
      "reave",
      "rebbe",
      "rebec",
      "rebid",
      "rebit",
      "rebop",
      "rebuy",
      "recal",
      "recce",
      "recco",
      "reccy",
      "recit",
      "recks",
      "recon",
      "recta",
      "recti",
      "recto",
      "redan",
      "redds",
      "reddy",
      "reded",
      "redes",
      "redia",
      "redid",
      "redip",
      "redly",
      "redon",
      "redos",
      "redox",
      "redry",
      "redub",
      "redux",
      "redye",
      "reech",
      "reede",
      "reeds",
      "reefs",
      "reefy",
      "reeks",
      "reeky",
      "reels",
      "reens",
      "reest",
      "reeve",
      "refed",
      "refel",
      "reffo",
      "refis",
      "refix",
      "refly",
      "refry",
      "regar",
      "reges",
      "reggo",
      "regie",
      "regma",
      "regna",
      "regos",
      "regur",
      "rehem",
      "reifs",
      "reify",
      "reiki",
      "reiks",
      "reink",
      "reins",
      "reird",
      "reist",
      "reive",
      "rejig",
      "rejon",
      "reked",
      "rekes",
      "rekey",
      "relet",
      "relie",
      "relit",
      "rello",
      "reman",
      "remap",
      "remen",
      "remet",
      "remex",
      "remix",
      "renay",
      "rends",
      "reney",
      "renga",
      "renig",
      "renin",
      "renne",
      "renos",
      "rente",
      "rents",
      "reoil",
      "reorg",
      "repeg",
      "repin",
      "repla",
      "repos",
      "repot",
      "repps",
      "repro",
      "reran",
      "rerig",
      "resat",
      "resaw",
      "resay",
      "resee",
      "reses",
      "resew",
      "resid",
      "resit",
      "resod",
      "resow",
      "resto",
      "rests",
      "resty",
      "resus",
      "retag",
      "retax",
      "retem",
      "retia",
      "retie",
      "retox",
      "revet",
      "revie",
      "rewan",
      "rewax",
      "rewed",
      "rewet",
      "rewin",
      "rewon",
      "rewth",
      "rexes",
      "rezes",
      "rheas",
      "rheme",
      "rheum",
      "rhies",
      "rhime",
      "rhine",
      "rhody",
      "rhomb",
      "rhone",
      "rhumb",
      "rhyne",
      "rhyta",
      "riads",
      "rials",
      "riant",
      "riata",
      "ribas",
      "ribby",
      "ribes",
      "riced",
      "ricer",
      "rices",
      "ricey",
      "richt",
      "ricin",
      "ricks",
      "rides",
      "ridgy",
      "ridic",
      "riels",
      "riems",
      "rieve",
      "rifer",
      "riffs",
      "rifte",
      "rifts",
      "rifty",
      "riggs",
      "rigol",
      "riled",
      "riles",
      "riley",
      "rille",
      "rills",
      "rimae",
      "rimed",
      "rimer",
      "rimes",
      "rimus",
      "rinds",
      "rindy",
      "rines",
      "rings",
      "rinks",
      "rioja",
      "riots",
      "riped",
      "ripes",
      "ripps",
      "rises",
      "rishi",
      "risks",
      "risps",
      "risus",
      "rites",
      "ritts",
      "ritzy",
      "rivas",
      "rived",
      "rivel",
      "riven",
      "rives",
      "riyal",
      "rizas",
      "roads",
      "roams",
      "roans",
      "roars",
      "roary",
      "roate",
      "robed",
      "robes",
      "roble",
      "rocks",
      "roded",
      "rodes",
      "roguy",
      "rohes",
      "roids",
      "roils",
      "roily",
      "roins",
      "roist",
      "rojak",
      "rojis",
      "roked",
      "roker",
      "rokes",
      "rolag",
      "roles",
      "rolfs",
      "rolls",
      "romal",
      "roman",
      "romeo",
      "romps",
      "ronde",
      "rondo",
      "roneo",
      "rones",
      "ronin",
      "ronne",
      "ronte",
      "ronts",
      "roods",
      "roofs",
      "roofy",
      "rooks",
      "rooky",
      "rooms",
      "roons",
      "roops",
      "roopy",
      "roosa",
      "roose",
      "roots",
      "rooty",
      "roped",
      "roper",
      "ropes",
      "ropey",
      "roque",
      "roral",
      "rores",
      "roric",
      "rorid",
      "rorie",
      "rorts",
      "rorty",
      "rosed",
      "roses",
      "roset",
      "roshi",
      "rosin",
      "rosit",
      "rosti",
      "rosts",
      "rotal",
      "rotan",
      "rotas",
      "rotch",
      "roted",
      "rotes",
      "rotis",
      "rotls",
      "roton",
      "rotos",
      "rotte",
      "rouen",
      "roues",
      "roule",
      "rouls",
      "roums",
      "roups",
      "roupy",
      "roust",
      "routh",
      "routs",
      "roved",
      "roven",
      "roves",
      "rowan",
      "rowed",
      "rowel",
      "rowen",
      "rowie",
      "rowme",
      "rownd",
      "rowth",
      "rowts",
      "royne",
      "royst",
      "rozet",
      "rozit",
      "ruana",
      "rubai",
      "rubby",
      "rubel",
      "rubes",
      "rubin",
      "ruble",
      "rubli",
      "rubus",
      "ruche",
      "rucks",
      "rudas",
      "rudds",
      "rudes",
      "rudie",
      "rudis",
      "rueda",
      "ruers",
      "ruffe",
      "ruffs",
      "rugae",
      "rugal",
      "ruggy",
      "ruing",
      "ruins",
      "rukhs",
      "ruled",
      "rules",
      "rumal",
      "rumbo",
      "rumen",
      "rumes",
      "rumly",
      "rummy",
      "rumpo",
      "rumps",
      "rumpy",
      "runch",
      "runds",
      "runed",
      "runes",
      "rungs",
      "runic",
      "runny",
      "runts",
      "runty",
      "rupia",
      "rurps",
      "rurus",
      "rusas",
      "ruses",
      "rushy",
      "rusks",
      "rusma",
      "russe",
      "rusts",
      "ruths",
      "rutin",
      "rutty",
      "ryals",
      "rybat",
      "ryked",
      "rykes",
      "rymme",
      "rynds",
      "ryots",
      "ryper",
      "saags",
      "sabal",
      "sabed",
      "saber",
      "sabes",
      "sabha",
      "sabin",
      "sabir",
      "sable",
      "sabot",
      "sabra",
      "sabre",
      "sacks",
      "sacra",
      "saddo",
      "sades",
      "sadhe",
      "sadhu",
      "sadis",
      "sados",
      "sadza",
      "safed",
      "safes",
      "sagas",
      "sager",
      "sages",
      "saggy",
      "sagos",
      "sagum",
      "saheb",
      "sahib",
      "saice",
      "saick",
      "saics",
      "saids",
      "saiga",
      "sails",
      "saims",
      "saine",
      "sains",
      "sairs",
      "saist",
      "saith",
      "sajou",
      "sakai",
      "saker",
      "sakes",
      "sakia",
      "sakis",
      "sakti",
      "salal",
      "salat",
      "salep",
      "sales",
      "salet",
      "salic",
      "salix",
      "salle",
      "salmi",
      "salol",
      "salop",
      "salpa",
      "salps",
      "salse",
      "salto",
      "salts",
      "salue",
      "salut",
      "saman",
      "samas",
      "samba",
      "sambo",
      "samek",
      "samel",
      "samen",
      "sames",
      "samey",
      "samfu",
      "sammy",
      "sampi",
      "samps",
      "sands",
      "saned",
      "sanes",
      "sanga",
      "sangh",
      "sango",
      "sangs",
      "sanko",
      "sansa",
      "santo",
      "sants",
      "saola",
      "sapan",
      "sapid",
      "sapor",
      "saran",
      "sards",
      "sared",
      "saree",
      "sarge",
      "sargo",
      "sarin",
      "saris",
      "sarks",
      "sarky",
      "sarod",
      "saros",
      "sarus",
      "saser",
      "sasin",
      "sasse",
      "satai",
      "satay",
      "sated",
      "satem",
      "sates",
      "satis",
      "sauba",
      "sauch",
      "saugh",
      "sauls",
      "sault",
      "saunt",
      "saury",
      "sauts",
      "saved",
      "saver",
      "saves",
      "savey",
      "savin",
      "sawah",
      "sawed",
      "sawer",
      "saxes",
      "sayed",
      "sayer",
      "sayid",
      "sayne",
      "sayon",
      "sayst",
      "sazes",
      "scabs",
      "scads",
      "scaff",
      "scags",
      "scail",
      "scala",
      "scall",
      "scams",
      "scand",
      "scans",
      "scapa",
      "scape",
      "scapi",
      "scarp",
      "scars",
      "scart",
      "scath",
      "scats",
      "scatt",
      "scaud",
      "scaup",
      "scaur",
      "scaws",
      "sceat",
      "scena",
      "scend",
      "schav",
      "schmo",
      "schul",
      "schwa",
      "sclim",
      "scody",
      "scogs",
      "scoog",
      "scoot",
      "scopa",
      "scops",
      "scots",
      "scoug",
      "scoup",
      "scowp",
      "scows",
      "scrab",
      "scrae",
      "scrag",
      "scran",
      "scrat",
      "scraw",
      "scray",
      "scrim",
      "scrip",
      "scrob",
      "scrod",
      "scrog",
      "scrow",
      "scudi",
      "scudo",
      "scuds",
      "scuff",
      "scuft",
      "scugs",
      "sculk",
      "scull",
      "sculp",
      "sculs",
      "scums",
      "scups",
      "scurf",
      "scurs",
      "scuse",
      "scuta",
      "scute",
      "scuts",
      "scuzz",
      "scyes",
      "sdayn",
      "sdein",
      "seals",
      "seame",
      "seams",
      "seamy",
      "seans",
      "seare",
      "sears",
      "sease",
      "seats",
      "seaze",
      "sebum",
      "secco",
      "sechs",
      "sects",
      "seder",
      "sedes",
      "sedge",
      "sedgy",
      "sedum",
      "seeds",
      "seeks",
      "seeld",
      "seels",
      "seely",
      "seems",
      "seeps",
      "seepy",
      "seers",
      "sefer",
      "segar",
      "segni",
      "segno",
      "segol",
      "segos",
      "sehri",
      "seifs",
      "seils",
      "seine",
      "seirs",
      "seise",
      "seism",
      "seity",
      "seiza",
      "sekos",
      "sekts",
      "selah",
      "seles",
      "selfs",
      "sella",
      "selle",
      "sells",
      "selva",
      "semee",
      "semes",
      "semie",
      "semis",
      "senas",
      "sends",
      "senes",
      "sengi",
      "senna",
      "senor",
      "sensa",
      "sensi",
      "sente",
      "senti",
      "sents",
      "senvy",
      "senza",
      "sepad",
      "sepal",
      "sepic",
      "sepoy",
      "septa",
      "septs",
      "serac",
      "serai",
      "seral",
      "sered",
      "serer",
      "seres",
      "serfs",
      "serge",
      "seric",
      "serin",
      "serks",
      "seron",
      "serow",
      "serra",
      "serre",
      "serrs",
      "serry",
      "servo",
      "sesey",
      "sessa",
      "setae",
      "setal",
      "seton",
      "setts",
      "sewan",
      "sewar",
      "sewed",
      "sewel",
      "sewen",
      "sewin",
      "sexed",
      "sexer",
      "sexes",
      "sexto",
      "sexts",
      "seyen",
      "shads",
      "shags",
      "shahs",
      "shako",
      "shakt",
      "shalm",
      "shaly",
      "shama",
      "shams",
      "shand",
      "shans",
      "shaps",
      "sharn",
      "shash",
      "shaul",
      "shawm",
      "shawn",
      "shaws",
      "shaya",
      "shays",
      "shchi",
      "sheaf",
      "sheal",
      "sheas",
      "sheds",
      "sheel",
      "shend",
      "shent",
      "sheol",
      "sherd",
      "shere",
      "shero",
      "shets",
      "sheva",
      "shewn",
      "shews",
      "shiai",
      "shiel",
      "shier",
      "shies",
      "shill",
      "shily",
      "shims",
      "shins",
      "ships",
      "shirr",
      "shirs",
      "shish",
      "shiso",
      "shist",
      "shite",
      "shits",
      "shiur",
      "shiva",
      "shive",
      "shivs",
      "shlep",
      "shlub",
      "shmek",
      "shmoe",
      "shoat",
      "shoed",
      "shoer",
      "shoes",
      "shogi",
      "shogs",
      "shoji",
      "shojo",
      "shola",
      "shool",
      "shoon",
      "shoos",
      "shope",
      "shops",
      "shorl",
      "shote",
      "shots",
      "shott",
      "showd",
      "shows",
      "shoyu",
      "shred",
      "shris",
      "shrow",
      "shtik",
      "shtum",
      "shtup",
      "shule",
      "shuln",
      "shuls",
      "shuns",
      "shura",
      "shute",
      "shuts",
      "shwas",
      "shyer",
      "sials",
      "sibbs",
      "sibyl",
      "sices",
      "sicht",
      "sicko",
      "sicks",
      "sicky",
      "sidas",
      "sided",
      "sider",
      "sides",
      "sidha",
      "sidhe",
      "sidle",
      "sield",
      "siens",
      "sient",
      "sieth",
      "sieur",
      "sifts",
      "sighs",
      "sigil",
      "sigla",
      "signa",
      "signs",
      "sijos",
      "sikas",
      "siker",
      "sikes",
      "silds",
      "siled",
      "silen",
      "siler",
      "siles",
      "silex",
      "silks",
      "sills",
      "silos",
      "silts",
      "silty",
      "silva",
      "simar",
      "simas",
      "simba",
      "simis",
      "simps",
      "simul",
      "sinds",
      "sined",
      "sines",
      "sings",
      "sinhs",
      "sinks",
      "sinky",
      "sinus",
      "siped",
      "sipes",
      "sippy",
      "sired",
      "siree",
      "sires",
      "sirih",
      "siris",
      "siroc",
      "sirra",
      "sirup",
      "sisal",
      "sises",
      "sista",
      "sists",
      "sitar",
      "sited",
      "sites",
      "sithe",
      "sitka",
      "situp",
      "situs",
      "siver",
      "sixer",
      "sixes",
      "sixmo",
      "sixte",
      "sizar",
      "sized",
      "sizel",
      "sizer",
      "sizes",
      "skags",
      "skail",
      "skald",
      "skank",
      "skart",
      "skats",
      "skatt",
      "skaws",
      "skean",
      "skear",
      "skeds",
      "skeed",
      "skeef",
      "skeen",
      "skeer",
      "skees",
      "skeet",
      "skegg",
      "skegs",
      "skein",
      "skelf",
      "skell",
      "skelm",
      "skelp",
      "skene",
      "skens",
      "skeos",
      "skeps",
      "skers",
      "skets",
      "skews",
      "skids",
      "skied",
      "skies",
      "skiey",
      "skimo",
      "skims",
      "skink",
      "skins",
      "skint",
      "skios",
      "skips",
      "skirl",
      "skirr",
      "skite",
      "skits",
      "skive",
      "skivy",
      "sklim",
      "skoal",
      "skody",
      "skoff",
      "skogs",
      "skols",
      "skool",
      "skort",
      "skosh",
      "skran",
      "skrik",
      "skuas",
      "skugs",
      "skyed",
      "skyer",
      "skyey",
      "skyfs",
      "skyre",
      "skyrs",
      "skyte",
      "slabs",
      "slade",
      "slaes",
      "slags",
      "slaid",
      "slake",
      "slams",
      "slane",
      "slank",
      "slaps",
      "slart",
      "slats",
      "slaty",
      "slaws",
      "slays",
      "slebs",
      "sleds",
      "sleer",
      "slews",
      "sleys",
      "slier",
      "slily",
      "slims",
      "slipe",
      "slips",
      "slipt",
      "slish",
      "slits",
      "slive",
      "sloan",
      "slobs",
      "sloes",
      "slogs",
      "sloid",
      "slojd",
      "slomo",
      "sloom",
      "sloot",
      "slops",
      "slopy",
      "slorm",
      "slots",
      "slove",
      "slows",
      "sloyd",
      "slubb",
      "slubs",
      "slued",
      "slues",
      "sluff",
      "slugs",
      "sluit",
      "slums",
      "slurb",
      "slurs",
      "sluse",
      "sluts",
      "slyer",
      "slype",
      "smaak",
      "smaik",
      "smalm",
      "smalt",
      "smarm",
      "smaze",
      "smeek",
      "smees",
      "smeik",
      "smeke",
      "smerk",
      "smews",
      "smirr",
      "smirs",
      "smits",
      "smogs",
      "smoko",
      "smolt",
      "smoor",
      "smoot",
      "smore",
      "smorg",
      "smout",
      "smowt",
      "smugs",
      "smurs",
      "smush",
      "smuts",
      "snabs",
      "snafu",
      "snags",
      "snaps",
      "snarf",
      "snark",
      "snars",
      "snary",
      "snash",
      "snath",
      "snaws",
      "snead",
      "sneap",
      "snebs",
      "sneck",
      "sneds",
      "sneed",
      "snees",
      "snell",
      "snibs",
      "snick",
      "snies",
      "snift",
      "snigs",
      "snips",
      "snipy",
      "snirt",
      "snits",
      "snobs",
      "snods",
      "snoek",
      "snoep",
      "snogs",
      "snoke",
      "snood",
      "snook",
      "snool",
      "snoot",
      "snots",
      "snowk",
      "snows",
      "snubs",
      "snugs",
      "snush",
      "snyes",
      "soaks",
      "soaps",
      "soare",
      "soars",
      "soave",
      "sobas",
      "socas",
      "soces",
      "socko",
      "socks",
      "socle",
      "sodas",
      "soddy",
      "sodic",
      "sodom",
      "sofar",
      "sofas",
      "softa",
      "softs",
      "softy",
      "soger",
      "sohur",
      "soils",
      "soily",
      "sojas",
      "sojus",
      "sokah",
      "soken",
      "sokes",
      "sokol",
      "solah",
      "solan",
      "solas",
      "solde",
      "soldi",
      "soldo",
      "solds",
      "soled",
      "solei",
      "soler",
      "soles",
      "solon",
      "solos",
      "solum",
      "solus",
      "soman",
      "somas",
      "sonce",
      "sonde",
      "sones",
      "songs",
      "sonly",
      "sonne",
      "sonny",
      "sonse",
      "sonsy",
      "sooey",
      "sooks",
      "sooky",
      "soole",
      "sools",
      "sooms",
      "soops",
      "soote",
      "soots",
      "sophs",
      "sophy",
      "sopor",
      "soppy",
      "sopra",
      "soral",
      "soras",
      "sorbo",
      "sorbs",
      "sorda",
      "sordo",
      "sords",
      "sored",
      "soree",
      "sorel",
      "sorer",
      "sores",
      "sorex",
      "sorgo",
      "sorns",
      "sorra",
      "sorta",
      "sorts",
      "sorus",
      "soths",
      "sotol",
      "souce",
      "souct",
      "sough",
      "souks",
      "souls",
      "soums",
      "soups",
      "soupy",
      "sours",
      "souse",
      "souts",
      "sowar",
      "sowce",
      "sowed",
      "sowff",
      "sowfs",
      "sowle",
      "sowls",
      "sowms",
      "sownd",
      "sowne",
      "sowps",
      "sowse",
      "sowth",
      "soyas",
      "soyle",
      "soyuz",
      "sozin",
      "spacy",
      "spado",
      "spaed",
      "spaer",
      "spaes",
      "spags",
      "spahi",
      "spail",
      "spain",
      "spait",
      "spake",
      "spald",
      "spale",
      "spall",
      "spalt",
      "spams",
      "spane",
      "spang",
      "spans",
      "spard",
      "spars",
      "spart",
      "spate",
      "spats",
      "spaul",
      "spawl",
      "spaws",
      "spayd",
      "spays",
      "spaza",
      "spazz",
      "speal",
      "spean",
      "speat",
      "specs",
      "spect",
      "speel",
      "speer",
      "speil",
      "speir",
      "speks",
      "speld",
      "spelk",
      "speos",
      "spets",
      "speug",
      "spews",
      "spewy",
      "spial",
      "spica",
      "spick",
      "spics",
      "spide",
      "spier",
      "spies",
      "spiff",
      "spifs",
      "spiks",
      "spile",
      "spims",
      "spina",
      "spink",
      "spins",
      "spirt",
      "spiry",
      "spits",
      "spitz",
      "spivs",
      "splay",
      "splog",
      "spode",
      "spods",
      "spoom",
      "spoor",
      "spoot",
      "spork",
      "sposh",
      "spots",
      "sprad",
      "sprag",
      "sprat",
      "spred",
      "sprew",
      "sprit",
      "sprod",
      "sprog",
      "sprue",
      "sprug",
      "spuds",
      "spued",
      "spuer",
      "spues",
      "spugs",
      "spule",
      "spume",
      "spumy",
      "spurs",
      "sputa",
      "spyal",
      "spyre",
      "squab",
      "squaw",
      "squeg",
      "squid",
      "squit",
      "squiz",
      "stabs",
      "stade",
      "stags",
      "stagy",
      "staig",
      "stane",
      "stang",
      "staph",
      "staps",
      "starn",
      "starr",
      "stars",
      "stats",
      "staun",
      "staws",
      "stays",
      "stean",
      "stear",
      "stedd",
      "stede",
      "steds",
      "steek",
      "steem",
      "steen",
      "steil",
      "stela",
      "stele",
      "stell",
      "steme",
      "stems",
      "stend",
      "steno",
      "stens",
      "stent",
      "steps",
      "stept",
      "stere",
      "stets",
      "stews",
      "stewy",
      "steys",
      "stich",
      "stied",
      "sties",
      "stilb",
      "stile",
      "stime",
      "stims",
      "stimy",
      "stipa",
      "stipe",
      "stire",
      "stirk",
      "stirp",
      "stirs",
      "stive",
      "stivy",
      "stoae",
      "stoai",
      "stoas",
      "stoat",
      "stobs",
      "stoep",
      "stogy",
      "stoit",
      "stoln",
      "stoma",
      "stond",
      "stong",
      "stonk",
      "stonn",
      "stook",
      "stoor",
      "stope",
      "stops",
      "stopt",
      "stoss",
      "stots",
      "stott",
      "stoun",
      "stoup",
      "stour",
      "stown",
      "stowp",
      "stows",
      "strad",
      "strae",
      "strag",
      "strak",
      "strep",
      "strew",
      "stria",
      "strig",
      "strim",
      "strop",
      "strow",
      "stroy",
      "strum",
      "stubs",
      "stude",
      "studs",
      "stull",
      "stulm",
      "stumm",
      "stums",
      "stuns",
      "stupa",
      "stupe",
      "sture",
      "sturt",
      "styed",
      "styes",
      "styli",
      "stylo",
      "styme",
      "stymy",
      "styre",
      "styte",
      "subah",
      "subas",
      "subby",
      "suber",
      "subha",
      "succi",
      "sucks",
      "sucky",
      "sucre",
      "sudds",
      "sudor",
      "sudsy",
      "suede",
      "suent",
      "suers",
      "suete",
      "suets",
      "suety",
      "sugan",
      "sughs",
      "sugos",
      "suhur",
      "suids",
      "suint",
      "suits",
      "sujee",
      "sukhs",
      "sukuk",
      "sulci",
      "sulfa",
      "sulfo",
      "sulks",
      "sulph",
      "sulus",
      "sumis",
      "summa",
      "sumos",
      "sumph",
      "sumps",
      "sunis",
      "sunks",
      "sunna",
      "sunns",
      "sunup",
      "supes",
      "supra",
      "surah",
      "sural",
      "suras",
      "surat",
      "surds",
      "sured",
      "sures",
      "surfs",
      "surfy",
      "surgy",
      "surra",
      "sused",
      "suses",
      "susus",
      "sutor",
      "sutra",
      "sutta",
      "swabs",
      "swack",
      "swads",
      "swage",
      "swags",
      "swail",
      "swain",
      "swale",
      "swaly",
      "swamy",
      "swang",
      "swank",
      "swans",
      "swaps",
      "swapt",
      "sward",
      "sware",
      "swarf",
      "swart",
      "swats",
      "swayl",
      "sways",
      "sweal",
      "swede",
      "sweed",
      "sweel",
      "sweer",
      "swees",
      "sweir",
      "swelt",
      "swerf",
      "sweys",
      "swies",
      "swigs",
      "swile",
      "swims",
      "swink",
      "swipe",
      "swire",
      "swiss",
      "swith",
      "swits",
      "swive",
      "swizz",
      "swobs",
      "swole",
      "swoln",
      "swops",
      "swopt",
      "swots",
      "swoun",
      "sybbe",
      "sybil",
      "syboe",
      "sybow",
      "sycee",
      "syces",
      "sycon",
      "syens",
      "syker",
      "sykes",
      "sylis",
      "sylph",
      "sylva",
      "symar",
      "synch",
      "syncs",
      "synds",
      "syned",
      "synes",
      "synth",
      "syped",
      "sypes",
      "syphs",
      "syrah",
      "syren",
      "sysop",
      "sythe",
      "syver",
      "taals",
      "taata",
      "taber",
      "tabes",
      "tabid",
      "tabis",
      "tabla",
      "tabor",
      "tabun",
      "tabus",
      "tacan",
      "taces",
      "tacet",
      "tache",
      "tacho",
      "tachs",
      "tacks",
      "tacos",
      "tacts",
      "taels",
      "tafia",
      "taggy",
      "tagma",
      "tahas",
      "tahrs",
      "taiga",
      "taigs",
      "taiko",
      "tails",
      "tains",
      "taira",
      "taish",
      "taits",
      "tajes",
      "takas",
      "takes",
      "takhi",
      "takin",
      "takis",
      "takky",
      "talak",
      "talaq",
      "talar",
      "talas",
      "talcs",
      "talcy",
      "talea",
      "taler",
      "tales",
      "talks",
      "talky",
      "talls",
      "talma",
      "talpa",
      "taluk",
      "talus",
      "tamal",
      "tamed",
      "tames",
      "tamin",
      "tamis",
      "tammy",
      "tamps",
      "tanas",
      "tanga",
      "tangi",
      "tangs",
      "tanhs",
      "tanka",
      "tanks",
      "tanky",
      "tanna",
      "tansy",
      "tanti",
      "tanto",
      "tanty",
      "tapas",
      "taped",
      "tapen",
      "tapes",
      "tapet",
      "tapis",
      "tappa",
      "tapus",
      "taras",
      "tardo",
      "tared",
      "tares",
      "targa",
      "targe",
      "tarns",
      "taroc",
      "tarok",
      "taros",
      "tarps",
      "tarre",
      "tarry",
      "tarsi",
      "tarts",
      "tarty",
      "tasar",
      "tased",
      "taser",
      "tases",
      "tasks",
      "tassa",
      "tasse",
      "tasso",
      "tatar",
      "tater",
      "tates",
      "taths",
      "tatie",
      "tatou",
      "tatts",
      "tatus",
      "taube",
      "tauld",
      "tauon",
      "taupe",
      "tauts",
      "tavah",
      "tavas",
      "taver",
      "tawai",
      "tawas",
      "tawed",
      "tawer",
      "tawie",
      "tawse",
      "tawts",
      "taxed",
      "taxer",
      "taxes",
      "taxis",
      "taxol",
      "taxon",
      "taxor",
      "taxus",
      "tayra",
      "tazza",
      "tazze",
      "teade",
      "teads",
      "teaed",
      "teaks",
      "teals",
      "teams",
      "tears",
      "teats",
      "teaze",
      "techs",
      "techy",
      "tecta",
      "teels",
      "teems",
      "teend",
      "teene",
      "teens",
      "teeny",
      "teers",
      "teffs",
      "teggs",
      "tegua",
      "tegus",
      "tehrs",
      "teiid",
      "teils",
      "teind",
      "teins",
      "telae",
      "telco",
      "teles",
      "telex",
      "telia",
      "telic",
      "tells",
      "telly",
      "teloi",
      "telos",
      "temed",
      "temes",
      "tempi",
      "temps",
      "tempt",
      "temse",
      "tench",
      "tends",
      "tendu",
      "tenes",
      "tenge",
      "tenia",
      "tenne",
      "tenno",
      "tenny",
      "tenon",
      "tents",
      "tenty",
      "tenue",
      "tepal",
      "tepas",
      "tepoy",
      "terai",
      "teras",
      "terce",
      "terek",
      "teres",
      "terfe",
      "terfs",
      "terga",
      "terms",
      "terne",
      "terns",
      "terry",
      "terts",
      "tesla",
      "testa",
      "teste",
      "tests",
      "tetes",
      "teths",
      "tetra",
      "tetri",
      "teuch",
      "teugh",
      "tewed",
      "tewel",
      "tewit",
      "texas",
      "texes",
      "texts",
      "thack",
      "thagi",
      "thaim",
      "thale",
      "thali",
      "thana",
      "thane",
      "thang",
      "thans",
      "thanx",
      "tharm",
      "thars",
      "thaws",
      "thawy",
      "thebe",
      "theca",
      "theed",
      "theek",
      "thees",
      "thegn",
      "theic",
      "thein",
      "thelf",
      "thema",
      "thens",
      "theow",
      "therm",
      "thesp",
      "thete",
      "thews",
      "thewy",
      "thigs",
      "thilk",
      "thill",
      "thine",
      "thins",
      "thiol",
      "thirl",
      "thoft",
      "thole",
      "tholi",
      "thoro",
      "thorp",
      "thous",
      "thowl",
      "thrae",
      "thraw",
      "thrid",
      "thrip",
      "throe",
      "thuds",
      "thugs",
      "thuja",
      "thunk",
      "thurl",
      "thuya",
      "thymi",
      "thymy",
      "tians",
      "tiars",
      "tical",
      "ticca",
      "ticed",
      "tices",
      "tichy",
      "ticks",
      "ticky",
      "tiddy",
      "tided",
      "tides",
      "tiers",
      "tiffs",
      "tifos",
      "tifts",
      "tiges",
      "tigon",
      "tikas",
      "tikes",
      "tikis",
      "tikka",
      "tilak",
      "tiled",
      "tiler",
      "tiles",
      "tills",
      "tilly",
      "tilth",
      "tilts",
      "timbo",
      "timed",
      "times",
      "timon",
      "timps",
      "tinas",
      "tinct",
      "tinds",
      "tinea",
      "tined",
      "tines",
      "tinge",
      "tings",
      "tinks",
      "tinny",
      "tints",
      "tinty",
      "tipis",
      "tippy",
      "tired",
      "tires",
      "tirls",
      "tiros",
      "tirrs",
      "titch",
      "titer",
      "titis",
      "titre",
      "titty",
      "titup",
      "tiyin",
      "tiyns",
      "tizes",
      "tizzy",
      "toads",
      "toady",
      "toaze",
      "tocks",
      "tocky",
      "tocos",
      "todde",
      "toeas",
      "toffs",
      "toffy",
      "tofts",
      "tofus",
      "togae",
      "togas",
      "toged",
      "toges",
      "togue",
      "tohos",
      "toile",
      "toils",
      "toing",
      "toise",
      "toits",
      "tokay",
      "toked",
      "toker",
      "tokes",
      "tokos",
      "tolan",
      "tolar",
      "tolas",
      "toled",
      "toles",
      "tolls",
      "tolly",
      "tolts",
      "tolus",
      "tolyl",
      "toman",
      "tombs",
      "tomes",
      "tomia",
      "tommy",
      "tomos",
      "tondi",
      "tondo",
      "toned",
      "toner",
      "tones",
      "toney",
      "tongs",
      "tonka",
      "tonks",
      "tonne",
      "tonus",
      "tools",
      "tooms",
      "toons",
      "toots",
      "toped",
      "topee",
      "topek",
      "toper",
      "topes",
      "tophe",
      "tophi",
      "tophs",
      "topis",
      "topoi",
      "topos",
      "toppy",
      "toque",
      "torah",
      "toran",
      "toras",
      "torcs",
      "tores",
      "toric",
      "torii",
      "toros",
      "torot",
      "torrs",
      "torse",
      "torsi",
      "torsk",
      "torta",
      "torte",
      "torts",
      "tosas",
      "tosed",
      "toses",
      "toshy",
      "tossy",
      "toted",
      "toter",
      "totes",
      "totty",
      "touks",
      "touns",
      "tours",
      "touse",
      "tousy",
      "touts",
      "touze",
      "touzy",
      "towed",
      "towie",
      "towns",
      "towny",
      "towse",
      "towsy",
      "towts",
      "towze",
      "towzy",
      "toyed",
      "toyer",
      "toyon",
      "toyos",
      "tozed",
      "tozes",
      "tozie",
      "trabs",
      "trads",
      "tragi",
      "traik",
      "trams",
      "trank",
      "tranq",
      "trans",
      "trant",
      "trape",
      "traps",
      "trapt",
      "trass",
      "trats",
      "tratt",
      "trave",
      "trayf",
      "trays",
      "treck",
      "treed",
      "treen",
      "trees",
      "trefa",
      "treif",
      "treks",
      "trema",
      "trems",
      "tress",
      "trest",
      "trets",
      "trews",
      "treyf",
      "treys",
      "triac",
      "tride",
      "trier",
      "tries",
      "triff",
      "trigo",
      "trigs",
      "trike",
      "trild",
      "trill",
      "trims",
      "trine",
      "trins",
      "triol",
      "trior",
      "trios",
      "trips",
      "tripy",
      "trist",
      "troad",
      "troak",
      "troat",
      "trock",
      "trode",
      "trods",
      "trogs",
      "trois",
      "troke",
      "tromp",
      "trona",
      "tronc",
      "trone",
      "tronk",
      "trons",
      "trooz",
      "troth",
      "trots",
      "trows",
      "troys",
      "trued",
      "trues",
      "trugo",
      "trugs",
      "trull",
      "tryer",
      "tryke",
      "tryma",
      "tryps",
      "tsade",
      "tsadi",
      "tsars",
      "tsked",
      "tsuba",
      "tsubo",
      "tuans",
      "tuart",
      "tuath",
      "tubae",
      "tubar",
      "tubas",
      "tubby",
      "tubed",
      "tubes",
      "tucks",
      "tufas",
      "tuffe",
      "tuffs",
      "tufts",
      "tufty",
      "tugra",
      "tuile",
      "tuina",
      "tuism",
      "tuktu",
      "tules",
      "tulpa",
      "tulsi",
      "tumid",
      "tummy",
      "tumps",
      "tumpy",
      "tunas",
      "tunds",
      "tuned",
      "tuner",
      "tunes",
      "tungs",
      "tunny",
      "tupek",
      "tupik",
      "tuple",
      "tuque",
      "turds",
      "turfs",
      "turfy",
      "turks",
      "turme",
      "turms",
      "turns",
      "turnt",
      "turps",
      "turrs",
      "tushy",
      "tusks",
      "tusky",
      "tutee",
      "tutti",
      "tutty",
      "tutus",
      "tuxes",
      "tuyer",
      "twaes",
      "twain",
      "twals",
      "twank",
      "twats",
      "tways",
      "tweel",
      "tween",
      "tweep",
      "tweer",
      "twerk",
      "twerp",
      "twier",
      "twigs",
      "twill",
      "twilt",
      "twink",
      "twins",
      "twiny",
      "twire",
      "twirp",
      "twite",
      "twits",
      "twoer",
      "twyer",
      "tyees",
      "tyers",
      "tyiyn",
      "tykes",
      "tyler",
      "tymps",
      "tynde",
      "tyned",
      "tynes",
      "typal",
      "typed",
      "types",
      "typey",
      "typic",
      "typos",
      "typps",
      "typto",
      "tyran",
      "tyred",
      "tyres",
      "tyros",
      "tythe",
      "tzars",
      "udals",
      "udons",
      "ugali",
      "ugged",
      "uhlan",
      "uhuru",
      "ukase",
      "ulama",
      "ulans",
      "ulema",
      "ulmin",
      "ulnad",
      "ulnae",
      "ulnar",
      "ulnas",
      "ulpan",
      "ulvas",
      "ulyie",
      "ulzie",
      "umami",
      "umbel",
      "umber",
      "umble",
      "umbos",
      "umbre",
      "umiac",
      "umiak",
      "umiaq",
      "ummah",
      "ummas",
      "ummed",
      "umped",
      "umphs",
      "umpie",
      "umpty",
      "umrah",
      "umras",
      "unais",
      "unapt",
      "unarm",
      "unary",
      "unaus",
      "unbag",
      "unban",
      "unbar",
      "unbed",
      "unbid",
      "unbox",
      "uncap",
      "unces",
      "uncia",
      "uncos",
      "uncoy",
      "uncus",
      "undam",
      "undee",
      "undos",
      "undug",
      "uneth",
      "unfix",
      "ungag",
      "unget",
      "ungod",
      "ungot",
      "ungum",
      "unhat",
      "unhip",
      "unica",
      "units",
      "unjam",
      "unked",
      "unket",
      "unkid",
      "unlaw",
      "unlay",
      "unled",
      "unlet",
      "unlid",
      "unman",
      "unmew",
      "unmix",
      "unpay",
      "unpeg",
      "unpen",
      "unpin",
      "unred",
      "unrid",
      "unrig",
      "unrip",
      "unsaw",
      "unsay",
      "unsee",
      "unsew",
      "unsex",
      "unsod",
      "untax",
      "untin",
      "unwet",
      "unwit",
      "unwon",
      "upbow",
      "upbye",
      "updos",
      "updry",
      "upend",
      "upjet",
      "uplay",
      "upled",
      "uplit",
      "upped",
      "upran",
      "uprun",
      "upsee",
      "upsey",
      "uptak",
      "upter",
      "uptie",
      "uraei",
      "urali",
      "uraos",
      "urare",
      "urari",
      "urase",
      "urate",
      "urbex",
      "urbia",
      "urdee",
      "ureal",
      "ureas",
      "uredo",
      "ureic",
      "urena",
      "urent",
      "urged",
      "urger",
      "urges",
      "urial",
      "urite",
      "urman",
      "urnal",
      "urned",
      "urped",
      "ursae",
      "ursid",
      "urson",
      "urubu",
      "urvas",
      "users",
      "usnea",
      "usque",
      "usure",
      "usury",
      "uteri",
      "uveal",
      "uveas",
      "uvula",
      "vacua",
      "vaded",
      "vades",
      "vagal",
      "vagus",
      "vails",
      "vaire",
      "vairs",
      "vairy",
      "vakas",
      "vakil",
      "vales",
      "valis",
      "valse",
      "vamps",
      "vampy",
      "vanda",
      "vaned",
      "vanes",
      "vangs",
      "vants",
      "vaped",
      "vaper",
      "vapes",
      "varan",
      "varas",
      "vardy",
      "varec",
      "vares",
      "varia",
      "varix",
      "varna",
      "varus",
      "varve",
      "vasal",
      "vases",
      "vasts",
      "vasty",
      "vatic",
      "vatus",
      "vauch",
      "vaute",
      "vauts",
      "vawte",
      "vaxes",
      "veale",
      "veals",
      "vealy",
      "veena",
      "veeps",
      "veers",
      "veery",
      "vegas",
      "veges",
      "vegie",
      "vegos",
      "vehme",
      "veils",
      "veily",
      "veins",
      "veiny",
      "velar",
      "velds",
      "veldt",
      "veles",
      "vells",
      "velum",
      "venae",
      "venal",
      "vends",
      "vendu",
      "veney",
      "venge",
      "venin",
      "vents",
      "venus",
      "verbs",
      "verra",
      "verry",
      "verst",
      "verts",
      "vertu",
      "vespa",
      "vesta",
      "vests",
      "vetch",
      "vexed",
      "vexer",
      "vexes",
      "vexil",
      "vezir",
      "vials",
      "viand",
      "vibes",
      "vibex",
      "vibey",
      "viced",
      "vices",
      "vichy",
      "viers",
      "views",
      "viewy",
      "vifda",
      "viffs",
      "vigas",
      "vigia",
      "vilde",
      "viler",
      "villi",
      "vills",
      "vimen",
      "vinal",
      "vinas",
      "vinca",
      "vined",
      "viner",
      "vines",
      "vinew",
      "vinic",
      "vinos",
      "vints",
      "viold",
      "viols",
      "vired",
      "vireo",
      "vires",
      "virga",
      "virge",
      "virid",
      "virls",
      "virtu",
      "visas",
      "vised",
      "vises",
      "visie",
      "visne",
      "vison",
      "visto",
      "vitae",
      "vitas",
      "vitex",
      "vitro",
      "vitta",
      "vivas",
      "vivat",
      "vivda",
      "viver",
      "vives",
      "vizir",
      "vizor",
      "vleis",
      "vlies",
      "vlogs",
      "voars",
      "vocab",
      "voces",
      "voddy",
      "vodou",
      "vodun",
      "voema",
      "vogie",
      "voids",
      "voile",
      "voips",
      "volae",
      "volar",
      "voled",
      "voles",
      "volet",
      "volks",
      "volta",
      "volte",
      "volti",
      "volts",
      "volva",
      "volve",
      "vomer",
      "voted",
      "votes",
      "vouge",
      "voulu",
      "vowed",
      "vower",
      "voxel",
      "vozhd",
      "vraic",
      "vrils",
      "vroom",
      "vrous",
      "vrouw",
      "vrows",
      "vuggs",
      "vuggy",
      "vughs",
      "vughy",
      "vulgo",
      "vulns",
      "vulva",
      "vutty",
      "waacs",
      "wacke",
      "wacko",
      "wacks",
      "wadds",
      "waddy",
      "waded",
      "wader",
      "wades",
      "wadge",
      "wadis",
      "wadts",
      "waffs",
      "wafts",
      "waged",
      "wages",
      "wagga",
      "wagyu",
      "wahoo",
      "waide",
      "waifs",
      "waift",
      "wails",
      "wains",
      "wairs",
      "waite",
      "waits",
      "wakas",
      "waked",
      "waken",
      "waker",
      "wakes",
      "wakfs",
      "waldo",
      "walds",
      "waled",
      "waler",
      "wales",
      "walie",
      "walis",
      "walks",
      "walla",
      "walls",
      "wally",
      "walty",
      "wamed",
      "wames",
      "wamus",
      "wands",
      "waned",
      "wanes",
      "waney",
      "wangs",
      "wanks",
      "wanky",
      "wanle",
      "wanly",
      "wanna",
      "wants",
      "wanty",
      "wanze",
      "waqfs",
      "warbs",
      "warby",
      "wards",
      "wared",
      "wares",
      "warez",
      "warks",
      "warms",
      "warns",
      "warps",
      "warre",
      "warst",
      "warts",
      "wases",
      "washy",
      "wasms",
      "wasps",
      "waspy",
      "wasts",
      "watap",
      "watts",
      "wauff",
      "waugh",
      "wauks",
      "waulk",
      "wauls",
      "waurs",
      "waved",
      "waves",
      "wavey",
      "wawas",
      "wawes",
      "wawls",
      "waxed",
      "waxer",
      "waxes",
      "wayed",
      "wazir",
      "wazoo",
      "weald",
      "weals",
      "weamb",
      "weans",
      "wears",
      "webby",
      "weber",
      "wecht",
      "wedel",
      "wedgy",
      "weeds",
      "weeke",
      "weeks",
      "weels",
      "weems",
      "weens",
      "weeny",
      "weeps",
      "weepy",
      "weest",
      "weete",
      "weets",
      "wefte",
      "wefts",
      "weids",
      "weils",
      "weirs",
      "weise",
      "weize",
      "wekas",
      "welds",
      "welke",
      "welks",
      "welkt",
      "wells",
      "welly",
      "welts",
      "wembs",
      "wends",
      "wenge",
      "wenny",
      "wents",
      "weros",
      "wersh",
      "wests",
      "wetas",
      "wetly",
      "wexed",
      "wexes",
      "whamo",
      "whams",
      "whang",
      "whaps",
      "whare",
      "whata",
      "whats",
      "whaup",
      "whaur",
      "wheal",
      "whear",
      "wheen",
      "wheep",
      "wheft",
      "whelk",
      "whelm",
      "whens",
      "whets",
      "whews",
      "wheys",
      "whids",
      "whift",
      "whigs",
      "whilk",
      "whims",
      "whins",
      "whios",
      "whips",
      "whipt",
      "whirr",
      "whirs",
      "whish",
      "whiss",
      "whist",
      "whits",
      "whity",
      "whizz",
      "whomp",
      "whoof",
      "whoot",
      "whops",
      "whore",
      "whorl",
      "whort",
      "whoso",
      "whows",
      "whump",
      "whups",
      "whyda",
      "wicca",
      "wicks",
      "wicky",
      "widdy",
      "wides",
      "wiels",
      "wifed",
      "wifes",
      "wifey",
      "wifie",
      "wifty",
      "wigan",
      "wigga",
      "wiggy",
      "wikis",
      "wilco",
      "wilds",
      "wiled",
      "wiles",
      "wilga",
      "wilis",
      "wilja",
      "wills",
      "wilts",
      "wimps",
      "winds",
      "wined",
      "wines",
      "winey",
      "winge",
      "wings",
      "wingy",
      "winks",
      "winna",
      "winns",
      "winos",
      "winze",
      "wiped",
      "wiper",
      "wipes",
      "wired",
      "wirer",
      "wires",
      "wirra",
      "wised",
      "wises",
      "wisha",
      "wisht",
      "wisps",
      "wists",
      "witan",
      "wited",
      "wites",
      "withe",
      "withs",
      "withy",
      "wived",
      "wiver",
      "wives",
      "wizen",
      "wizes",
      "woads",
      "woald",
      "wocks",
      "wodge",
      "woful",
      "wojus",
      "woker",
      "wokka",
      "wolds",
      "wolfs",
      "wolly",
      "wolve",
      "wombs",
      "womby",
      "womyn",
      "wonga",
      "wongi",
      "wonks",
      "wonky",
      "wonts",
      "woods",
      "wooed",
      "woofs",
      "woofy",
      "woold",
      "wools",
      "woons",
      "woops",
      "woopy",
      "woose",
      "woosh",
      "wootz",
      "words",
      "works",
      "worms",
      "wormy",
      "worts",
      "wowed",
      "wowee",
      "woxen",
      "wrang",
      "wraps",
      "wrapt",
      "wrast",
      "wrate",
      "wrawl",
      "wrens",
      "wrick",
      "wried",
      "wrier",
      "wries",
      "writs",
      "wroke",
      "wroot",
      "wroth",
      "wryer",
      "wuddy",
      "wudus",
      "wulls",
      "wurst",
      "wuses",
      "wushu",
      "wussy",
      "wuxia",
      "wyled",
      "wyles",
      "wynds",
      "wynns",
      "wyted",
      "wytes",
      "xebec",
      "xenia",
      "xenic",
      "xenon",
      "xeric",
      "xerox",
      "xerus",
      "xoana",
      "xrays",
      "xylan",
      "xylem",
      "xylic",
      "xylol",
      "xylyl",
      "xysti",
      "xysts",
      "yaars",
      "yabas",
      "yabba",
      "yabby",
      "yacca",
      "yacka",
      "yacks",
      "yaffs",
      "yager",
      "yages",
      "yagis",
      "yahoo",
      "yaird",
      "yakka",
      "yakow",
      "yales",
      "yamen",
      "yampy",
      "yamun",
      "yangs",
      "yanks",
      "yapok",
      "yapon",
      "yapps",
      "yappy",
      "yarak",
      "yarco",
      "yards",
      "yarer",
      "yarfa",
      "yarks",
      "yarns",
      "yarrs",
      "yarta",
      "yarto",
      "yates",
      "yauds",
      "yauld",
      "yaups",
      "yawed",
      "yawey",
      "yawls",
      "yawns",
      "yawny",
      "yawps",
      "ybore",
      "yclad",
      "ycled",
      "ycond",
      "ydrad",
      "ydred",
      "yeads",
      "yeahs",
      "yealm",
      "yeans",
      "yeard",
      "years",
      "yecch",
      "yechs",
      "yechy",
      "yedes",
      "yeeds",
      "yeesh",
      "yeggs",
      "yelks",
      "yells",
      "yelms",
      "yelps",
      "yelts",
      "yenta",
      "yente",
      "yerba",
      "yerds",
      "yerks",
      "yeses",
      "yesks",
      "yests",
      "yesty",
      "yetis",
      "yetts",
      "yeuks",
      "yeuky",
      "yeven",
      "yeves",
      "yewen",
      "yexed",
      "yexes",
      "yfere",
      "yiked",
      "yikes",
      "yills",
      "yince",
      "yipes",
      "yippy",
      "yirds",
      "yirks",
      "yirrs",
      "yirth",
      "yites",
      "yitie",
      "ylems",
      "ylike",
      "ylkes",
      "ymolt",
      "ympes",
      "yobbo",
      "yobby",
      "yocks",
      "yodel",
      "yodhs",
      "yodle",
      "yogas",
      "yogee",
      "yoghs",
      "yogic",
      "yogin",
      "yogis",
      "yoick",
      "yojan",
      "yoked",
      "yokel",
      "yoker",
      "yokes",
      "yokul",
      "yolks",
      "yolky",
      "yomim",
      "yomps",
      "yonic",
      "yonis",
      "yonks",
      "yoofs",
      "yoops",
      "yores",
      "yorks",
      "yorps",
      "youks",
      "yourn",
      "yours",
      "yourt",
      "youse",
      "yowed",
      "yowes",
      "yowie",
      "yowls",
      "yowza",
      "yrapt",
      "yrent",
      "yrivd",
      "yrneh",
      "ysame",
      "ytost",
      "yuans",
      "yucas",
      "yucca",
      "yucch",
      "yucko",
      "yucks",
      "yucky",
      "yufts",
      "yugas",
      "yuked",
      "yukes",
      "yukky",
      "yukos",
      "yulan",
      "yules",
      "yummo",
      "yummy",
      "yumps",
      "yupon",
      "yuppy",
      "yurta",
      "yurts",
      "yuzus",
      "zabra",
      "zacks",
      "zaida",
      "zaidy",
      "zaire",
      "zakat",
      "zaman",
      "zambo",
      "zamia",
      "zanja",
      "zante",
      "zanza",
      "zanze",
      "zappy",
      "zarfs",
      "zaris",
      "zatis",
      "zaxes",
      "zayin",
      "zazen",
      "zeals",
      "zebec",
      "zebub",
      "zebus",
      "zedas",
      "zeins",
      "zendo",
      "zerda",
      "zerks",
      "zeros",
      "zests",
      "zetas",
      "zexes",
      "zezes",
      "zhomo",
      "zibet",
      "ziffs",
      "zigan",
      "zilas",
      "zilch",
      "zilla",
      "zills",
      "zimbi",
      "zimbs",
      "zinco",
      "zincs",
      "zincy",
      "zineb",
      "zines",
      "zings",
      "zingy",
      "zinke",
      "zinky",
      "zippo",
      "zippy",
      "ziram",
      "zitis",
      "zizel",
      "zizit",
      "zlote",
      "zloty",
      "zoaea",
      "zobos",
      "zobus",
      "zocco",
      "zoeae",
      "zoeal",
      "zoeas",
      "zoism",
      "zoist",
      "zombi",
      "zonae",
      "zonda",
      "zoned",
      "zoner",
      "zones",
      "zonks",
      "zooea",
      "zooey",
      "zooid",
      "zooks",
      "zooms",
      "zoons",
      "zooty",
      "zoppa",
      "zoppo",
      "zoril",
      "zoris",
      "zorro",
      "zouks",
      "zowee",
      "zowie",
      "zulus",
      "zupan",
      "zupas",
      "zuppa",
      "zurfs",
      "zuzim",
      "zygal",
      "zygon",
      "zymes",
      "zymic"
    ]);
    Game = class {
      /**
       * Create a game object from the player's cookie, or initialise a new game
       */
      constructor(serialized = void 0) {
        __publicField(this, "index");
        __publicField(this, "guesses");
        __publicField(this, "answers");
        __publicField(this, "answer");
        if (serialized) {
          const [index4, guesses, answers] = serialized.split("-");
          this.index = +index4;
          this.guesses = guesses ? guesses.split(" ") : [];
          this.answers = answers ? answers.split(" ") : [];
        } else {
          this.index = Math.floor(Math.random() * words.length);
          this.guesses = ["", "", "", "", "", ""];
          this.answers = [];
        }
        this.answer = words[this.index];
      }
      /**
       * Update game state based on a guess of a five-letter word. Returns
       * true if the guess was valid, false otherwise
       */
      enter(letters) {
        const word = letters.join("");
        const valid = allowed.has(word);
        if (!valid)
          return false;
        this.guesses[this.answers.length] = word;
        const available = Array.from(this.answer);
        const answer = Array(5).fill("_");
        for (let i = 0; i < 5; i += 1) {
          if (letters[i] === available[i]) {
            answer[i] = "x";
            available[i] = " ";
          }
        }
        for (let i = 0; i < 5; i += 1) {
          if (answer[i] === "_") {
            const index4 = available.indexOf(letters[i]);
            if (index4 !== -1) {
              answer[i] = "c";
              available[index4] = " ";
            }
          }
        }
        this.answers.push(answer.join(""));
        return true;
      }
      /**
       * Serialize game state so it can be set as a cookie
       */
      toString() {
        return `${this.index}-${this.guesses.join(" ")}-${this.answers.join(" ")}`;
      }
    };
    load = ({ cookies }) => {
      const game = new Game(cookies.get("sverdle"));
      return {
        /**
         * The player's guessed words so far
         */
        guesses: game.guesses,
        /**
         * An array of strings like '__x_c' corresponding to the guesses, where 'x' means
         * an exact match, and 'c' means a close match (right letter, wrong place)
         */
        answers: game.answers,
        /**
         * The correct answer, revealed if the game is over
         */
        answer: game.answers.length >= 6 ? game.answer : null
      };
    };
    actions = {
      /**
       * Modify game state in reaction to a keypress. If client-side JavaScript
       * is available, this will happen in the browser instead of here
       */
      update: async ({ request, cookies }) => {
        const game = new Game(cookies.get("sverdle"));
        const data = await request.formData();
        const key2 = data.get("key");
        const i = game.answers.length;
        if (key2 === "backspace") {
          game.guesses[i] = game.guesses[i].slice(0, -1);
        } else {
          game.guesses[i] += key2;
        }
        cookies.set("sverdle", game.toString());
      },
      /**
       * Modify game state in reaction to a guessed word. This logic always runs on
       * the server, so that people can't cheat by peeking at the JavaScript
       */
      enter: async ({ request, cookies }) => {
        const game = new Game(cookies.get("sverdle"));
        const data = await request.formData();
        const guess = data.getAll("guess");
        if (!game.enter(guess)) {
          return fail(400, { badGuess: true });
        }
        cookies.set("sverdle", game.toString());
      },
      restart: async ({ cookies }) => {
        cookies.delete("sverdle");
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/sverdle/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var get_initial_motion_preference, reduced_motion, css2, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/sverdle/_page.svelte.js"() {
    init_ssr();
    init_index2();
    get_initial_motion_preference = () => {
      return false;
    };
    reduced_motion = readable(get_initial_motion_preference(), (set) => {
    });
    css2 = {
      code: "form.svelte-1pg2j5l.svelte-1pg2j5l{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;flex:1}.how-to-play.svelte-1pg2j5l.svelte-1pg2j5l{color:var(--color-text)}.how-to-play.svelte-1pg2j5l.svelte-1pg2j5l::before{content:'i';display:inline-block;font-size:0.8em;font-weight:900;width:1em;height:1em;padding:0.2em;line-height:1;border:1.5px solid var(--color-text);border-radius:50%;text-align:center;margin:0 0.5em 0 0;position:relative;top:-0.05em}.grid.svelte-1pg2j5l.svelte-1pg2j5l{--width:min(100vw, 40vh, 380px);max-width:var(--width);align-self:center;justify-self:center;width:100%;height:100%;display:flex;flex-direction:column;justify-content:flex-start}.grid.svelte-1pg2j5l .row.svelte-1pg2j5l{display:grid;grid-template-columns:repeat(5, 1fr);grid-gap:0.2rem;margin:0 0 0.2rem 0}@media(prefers-reduced-motion: no-preference){.grid.bad-guess.svelte-1pg2j5l .row.current.svelte-1pg2j5l{animation:svelte-1pg2j5l-wiggle 0.5s}}.grid.playing.svelte-1pg2j5l .row.current.svelte-1pg2j5l{filter:drop-shadow(3px 3px 10px var(--color-bg-0))}.letter.svelte-1pg2j5l.svelte-1pg2j5l{aspect-ratio:1;width:100%;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;text-transform:lowercase;border:none;font-size:calc(0.08 * var(--width));border-radius:2px;background:white;margin:0;color:rgba(0, 0, 0, 0.7)}.letter.missing.svelte-1pg2j5l.svelte-1pg2j5l{background:rgba(255, 255, 255, 0.5);color:rgba(0, 0, 0, 0.5)}.letter.exact.svelte-1pg2j5l.svelte-1pg2j5l{background:var(--color-theme-2);color:white}.letter.close.svelte-1pg2j5l.svelte-1pg2j5l{border:2px solid var(--color-theme-2)}.selected.svelte-1pg2j5l.svelte-1pg2j5l{outline:2px solid var(--color-theme-1)}.controls.svelte-1pg2j5l.svelte-1pg2j5l{text-align:center;justify-content:center;height:min(18vh, 10rem)}.keyboard.svelte-1pg2j5l.svelte-1pg2j5l{--gap:0.2rem;position:relative;display:flex;flex-direction:column;gap:var(--gap);height:100%}.keyboard.svelte-1pg2j5l .row.svelte-1pg2j5l{display:flex;justify-content:center;gap:0.2rem;flex:1}.keyboard.svelte-1pg2j5l button.svelte-1pg2j5l,.keyboard.svelte-1pg2j5l button.svelte-1pg2j5l:disabled{--size:min(8vw, 4vh, 40px);background-color:white;color:black;width:var(--size);border:none;border-radius:2px;font-size:calc(var(--size) * 0.5);margin:0}.keyboard.svelte-1pg2j5l button.exact.svelte-1pg2j5l{background:var(--color-theme-2);color:white}.keyboard.svelte-1pg2j5l button.missing.svelte-1pg2j5l{opacity:0.5}.keyboard.svelte-1pg2j5l button.close.svelte-1pg2j5l{border:2px solid var(--color-theme-2)}.keyboard.svelte-1pg2j5l button.svelte-1pg2j5l:focus{background:var(--color-theme-1);color:white;outline:none}.keyboard.svelte-1pg2j5l button[data-key='enter'].svelte-1pg2j5l,.keyboard.svelte-1pg2j5l button[data-key='backspace'].svelte-1pg2j5l{position:absolute;bottom:0;width:calc(1.5 * var(--size));height:calc(1 / 3 * (100% - 2 * var(--gap)));text-transform:uppercase;font-size:calc(0.3 * var(--size));padding-top:calc(0.15 * var(--size))}.keyboard.svelte-1pg2j5l button[data-key='enter'].svelte-1pg2j5l{right:calc(50% + 3.5 * var(--size) + 0.8rem)}.keyboard.svelte-1pg2j5l button[data-key='backspace'].svelte-1pg2j5l{left:calc(50% + 3.5 * var(--size) + 0.8rem)}.keyboard.svelte-1pg2j5l button[data-key='enter'].svelte-1pg2j5l:disabled{opacity:0.5}.restart.svelte-1pg2j5l.svelte-1pg2j5l{width:100%;padding:1rem;background:rgba(255, 255, 255, 0.5);border-radius:2px;border:none}.restart.svelte-1pg2j5l.svelte-1pg2j5l:focus,.restart.svelte-1pg2j5l.svelte-1pg2j5l:hover{background:var(--color-theme-1);color:white;outline:none}@keyframes svelte-1pg2j5l-wiggle{0%{transform:translateX(0)}10%{transform:translateX(-2px)}30%{transform:translateX(4px)}50%{transform:translateX(-6px)}70%{transform:translateX(+4px)}90%{transform:translateX(-2px)}100%{transform:translateX(0)}}",
      map: null
    };
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let won;
      let i;
      let submittable;
      let $$unsubscribe_reduced_motion;
      $$unsubscribe_reduced_motion = subscribe(reduced_motion, (value) => value);
      let { data } = $$props;
      let { form } = $$props;
      let classnames;
      let description;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      if ($$props.form === void 0 && $$bindings.form && form !== void 0)
        $$bindings.form(form);
      $$result.css.add(css2);
      won = data.answers.at(-1) === "xxxxx";
      i = won ? -1 : data.answers.length;
      submittable = data.guesses[i]?.length === 5;
      {
        {
          classnames = {};
          description = {};
          data.answers.forEach((answer, i2) => {
            const guess = data.guesses[i2];
            for (let i3 = 0; i3 < 5; i3 += 1) {
              const letter = guess[i3];
              if (answer[i3] === "x") {
                classnames[letter] = "exact";
                description[letter] = "correct";
              } else if (!classnames[letter]) {
                classnames[letter] = answer[i3] === "c" ? "close" : "missing";
                description[letter] = answer[i3] === "c" ? "present" : "absent";
              }
            }
          });
        }
      }
      $$unsubscribe_reduced_motion();
      return ` ${$$result.head += `<!-- HEAD_svelte-18lvto8_START -->${$$result.title = `<title>Sverdle</title>`, ""}<meta name="description" content="A Wordle clone written in SvelteKit"><!-- HEAD_svelte-18lvto8_END -->`, ""} <h1 class="visually-hidden" data-svelte-h="svelte-16hvqlg">Sverdle</h1> <form method="POST" action="?/enter" class="svelte-1pg2j5l"><a class="how-to-play svelte-1pg2j5l" href="/sverdle/how-to-play" data-svelte-h="svelte-1w3fhu3">How to play</a> <div class="${[
        "grid svelte-1pg2j5l",
        (!won ? "playing" : "") + " " + (form?.badGuess ? "bad-guess" : "")
      ].join(" ").trim()}">${each(Array.from(Array(6).keys()), (row) => {
        let current = row === i;
        return ` <h2 class="visually-hidden">Row ${escape(row + 1)}</h2> <div class="${["row svelte-1pg2j5l", current ? "current" : ""].join(" ").trim()}">${each(Array.from(Array(5).keys()), (column) => {
          let answer = data.answers[row]?.[column], value = data.guesses[row]?.[column] ?? "", selected = current && column === data.guesses[row].length, exact = answer === "x", close = answer === "c", missing = answer === "_";
          return `      <div class="${[
            "letter svelte-1pg2j5l",
            (exact ? "exact" : "") + " " + (close ? "close" : "") + " " + (missing ? "missing" : "") + " " + (selected ? "selected" : "")
          ].join(" ").trim()}">${escape(value)} <span class="visually-hidden">${exact ? `(correct)` : `${close ? `(present)` : `${missing ? `(absent)` : `empty`}`}`}</span> <input name="guess" ${!current ? "disabled" : ""} type="hidden"${add_attribute("value", value, 0)}> </div>`;
        })} </div>`;
      })}</div> <div class="controls svelte-1pg2j5l">${won || data.answers.length >= 6 ? `${!won && data.answer ? `<p>the answer was &quot;${escape(data.answer)}&quot;</p>` : ``} <button data-key="enter" class="restart selected svelte-1pg2j5l" formaction="?/restart">${escape(won ? "you won :)" : `game over :(`)} play again?</button>` : `<div class="keyboard svelte-1pg2j5l"><button data-key="enter" ${!submittable ? "disabled" : ""} class="${["svelte-1pg2j5l", submittable ? "selected" : ""].join(" ").trim()}">enter</button> <button data-key="backspace" formaction="?/update" name="key" value="backspace" class="svelte-1pg2j5l" data-svelte-h="svelte-1ptb1bp">back</button> ${each(["qwertyuiop", "asdfghjkl", "zxcvbnm"], (row) => {
        return `<div class="row svelte-1pg2j5l">${each(row, (letter) => {
          return `<button${add_attribute("data-key", letter, 0)} class="${escape(null_to_empty(classnames[letter]), true) + " svelte-1pg2j5l"}" ${data.guesses[i].length === 5 ? "disabled" : ""} formaction="?/update" name="key"${add_attribute("value", letter, 0)} aria-label="${escape(letter, true) + " " + escape(description[letter] || "", true)}">${escape(letter)} </button>`;
        })} </div>`;
      })}</div>`}</div></form> ${won ? `<div style="position: absolute; left: 50%; top: 30%"></div>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  server: () => page_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets3
});
var index3, component3, server_id, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_page_server_ts();
    index3 = 4;
    component3 = async () => (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    server_id = "src/routes/sverdle/+page.server.ts";
    imports3 = ["_app/immutable/nodes/4.8fe57f3d.js", "_app/immutable/chunks/scheduler.f1cf81fe.js", "_app/immutable/chunks/index.711e9b05.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/chunks/singletons.39635090.js", "_app/immutable/chunks/index.c6cf24cb.js"];
    stylesheets3 = ["_app/immutable/assets/4.9d501049.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/prod-ssr.js
var DEV = false;

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "5dp1bt"
};
function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_chunks();
init_index2();
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | import('../runtime/control.js').HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed2 = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"].filter(
    (method) => method in mod
  );
  if ("GET" in mod || "HEAD" in mod)
    allowed2.push("HEAD");
  return allowed2;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler2 = mod[method];
  if (!handler2 && method === "HEAD") {
    handler2 = mod.GET;
  }
  if (!handler2) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler2(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (method === "PUT" || method === "PATCH" || method === "DELETE" || method === "OPTIONS") {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive$1(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive$1(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive$1(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive$1(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index22 = p++;
    indexes.set(thing, index22);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index22] = `["${key2}",${flatten(value2)}]`;
        return index22;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index22] = str;
    return index22;
  }
  const index4 = flatten(value);
  if (index4 < 0)
    return `${index4}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions2 = server2?.actions;
  if (!actions2) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions2);
  try {
    const data = await call_action(event, actions2);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions2 = server2?.actions;
  if (!actions2) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions2);
  try {
    const data = await call_action(event, actions2);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions2) {
  if (actions2.default && Object.keys(actions2).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions2) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions2[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: cloned_headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let vary = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    if (key2 === "age")
      age = value;
    if (key2 === "vary")
      vary = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !vary) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode$1(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words2 = new Uint32Array(bytes.buffer);
  words2[words2.length - 2] = Math.floor(length / 4294967296);
  words2[words2.length - 1] = length;
  return words2;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets4 = new Set(client.stylesheets);
  const fonts4 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets4.add(url);
      for (const url of node.fonts)
        fonts4.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets4) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts4) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder2 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index4 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index4]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options2) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options2 || {};
  var dec = opt.decode || decode;
  var index4 = 0;
  while (index4 < str.length) {
    var eqIdx = str.indexOf("=", index4);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index4);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index4 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index4, eqIdx).trim();
    if (void 0 === obj[key2]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index4 = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options2) {
  var opt = options2 || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = parse_1(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = parse_1(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = parse_1(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name, value, opts = {}) {
      set_internal(name, value, { ...defaults, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name, value, opts) {
      return serialize_1(name, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = parse_1(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, opts) {
    const path = opts.path ?? default_path;
    new_cookies[name] = {
      name,
      value,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers.append("set-cookie", serialize_1(name, value, options2));
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options2) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  try {
    value = options2.decodeValues ? decodeURIComponent(value) : value;
  } catch (e) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
      e
    );
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parseNameValuePair(nameValuePairStr) {
  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}
function parse(input, options2) {
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!input) {
    if (!options2.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      input = input.headers["set-cookie"];
    } else {
      var sch = input.headers[Object.keys(input.headers).find(function(key2) {
        return key2.toLowerCase() === "set-cookie";
      })];
      if (!sch && input.headers.cookie && !options2.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!options2.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options2);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options2);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix2 = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix2) ? decoded.slice(prefix2.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of splitCookiesString_1(set_cookie)) {
            const { name, value, ...options3 } = parseString_1(str);
            set_internal(
              name,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
var valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
var valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
var valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
var valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
var validate_layout_exports = validator(valid_layout_exports);
var validate_page_exports = validator(valid_page_exports);
var validate_layout_server_exports = validator(valid_layout_server_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) || "/";
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-netlify"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
        } else {
          throw new Error("This should never happen");
        }
        return response;
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    const entries = Object.entries(env);
    const prefix2 = __privateGet(this, _options).env_public_prefix;
    Object.fromEntries(entries.filter(([k]) => !k.startsWith(prefix2)));
    const pub = Object.fromEntries(entries.filter(([k]) => k.startsWith(prefix2)));
    set_public_env(pub);
    if (!__privateGet(this, _options).hooks) {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve }) => resolve(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/netlify-tmp/manifest.js
var manifest = {
  appDir: "_app",
  appPath: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "robots.txt"]),
  mimeTypes: { ".png": "image/png", ".txt": "text/plain" },
  _: {
    client: { "start": "_app/immutable/entry/start.e51c15eb.js", "app": "_app/immutable/entry/app.0ee0ae5c.js", "imports": ["_app/immutable/entry/start.e51c15eb.js", "_app/immutable/chunks/scheduler.f1cf81fe.js", "_app/immutable/chunks/singletons.39635090.js", "_app/immutable/chunks/index.c6cf24cb.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/entry/app.0ee0ae5c.js", "_app/immutable/chunks/scheduler.f1cf81fe.js", "_app/immutable/chunks/index.711e9b05.js"], "stylesheets": [], "fonts": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3))
    ],
    routes: [
      {
        id: "/sverdle",
        pattern: /^\/sverdle\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 2 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
var prerendered = /* @__PURE__ */ new Set(["/", "/about", "/sverdle/how-to-play"]);

// .svelte-kit/netlify-tmp/entry.js
var server = new Server(manifest);
var prefix = `/${manifest.appPath}/`;
var initialized = server.init({
  // @ts-ignore
  env: Deno.env.toObject()
});
async function handler(request, context) {
  if (is_static_file(request)) {
    return;
  }
  await initialized;
  return server.respond(request, {
    platform: { context },
    getClientAddress() {
      return context.ip;
    }
  });
}
function is_static_file(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith(prefix)) {
    return true;
  }
  const pathname = url.pathname.replace(/\/$/, "");
  let file = pathname.substring(1);
  try {
    file = decodeURIComponent(file);
  } catch (err) {
  }
  return manifest.assets.has(file) || manifest.assets.has(file + "/index.html") || prerendered.has(pathname || "/");
}
export {
  handler as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=render.js.map
