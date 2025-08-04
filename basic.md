- The `html, body { height: 100% }` chain enables percentage-based heights
- `100vh` forces `<main>` to cover the entire viewport vertically
- Matching body background acts as fallback for any overflow
- `box-sizing: border-box` ensures padding doesn't create overflow

The white gap at the top persists because of two main issues: the default body margin isn't fully reset, and the layout isn't properly handling the viewport height. Here's the complete solution:

```css
html {
  font-family: "Noto Sans TC", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.15;
  letter-spacing: 1px;
  word-spacing: 1px;
}

/* Fix 1: Properly reset body margin and set min-height */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Fix 2: Set body background to match main */
body {
  background-color: #27254a;
  min-height: 100vh;
}

main {
  background-color: #27254a;
  padding-top: 0; /* Remove top padding */
}

.container {
  width: 80%;
  margin: 50px auto;
  padding: 50px 30px;
  background-color: #ebedefed;
  border-radius: 8px;
}
```

### Key Fixes Explained:

1. **Body Background & Margin**:

   ```css
   body {
     background-color: #27254a; /* Match main background */
     min-height: 100vh; /* Cover full viewport height */
     margin: 0; /* Ensure no default margin */
   }
   ```

   - Setting body background to match `<main>` ensures any gaps show the correct color
   - `min-height: 100vh` forces body to cover the entire viewport

2. **HTML/Body Height Reset**:

   ```css
   html,
   body {
     height: 100%;
     margin: 0;
     padding: 0;
   }
   ```

   - Fixes percentage height calculations
   - Removes all default spacing

3. **Main Element Padding**:

   ```css
   main {
     padding-top: 0; /* Remove top padding */
   }
   ```

   - Prevents unnecessary space at the top of the main content

4. **Container Margin**:
   ```css
   .container {
     margin: 50px auto; /* Vertical margin creates space */
   }
   ```
   - The 50px top margin is intentional for design spacing
   - This space will now show the dark blue background (not white)

### Why This Works:

- The body now covers the entire viewport with the correct background color
- Any spacing around the container shows the dark blue background
- Percentage heights work correctly with the html/body height declaration
- Removes all default browser spacing that caused the white gap

`* { margin: 0; padding: 0; }` resets margins and padding for **all HTML elements**, it doesn't affect the root `<html>` element itself.
Browsers apply default `margin: 8px` to the `<html>` element

### Why the white gap persists:

1. The `*` selector targets **all elements** but doesn't affect the root `<html>` element itself
2. Browsers apply default `margin: 8px` to the `<html>` element
3. Your `body` background is still default white

### Key fixes:

1. Explicitly reset `<html>` margins/paddings:
   ```css
   html,
   body {
     margin: 0;
     padding: 0;
   }
   ```
2. Set background color on both html and body:
   ```css
   html,
   body {
     background-color: #27254a; /* Match main's background */
   }
   ```

### Why this works:

- Resetting `<html>` margin eliminates the browser's default 8px gap
- Setting background on html/body ensures full coverage
- The `*` selector handles all other elements

The `*` selector applies to all elements **inside** the document, but not to the root `<html>` element itself. This is why we need to explicitly target `html` in our reset.

### The Proper Way to Reset Margins/Paddings

```css
html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box; /* This is safe for universal application */
}
```

### Why `*` isn't enough for margins/paddings

1. **Performance Impact**:

   - `*` applies to every single element (paragraphs, lists, buttons, etc.)
   - Browser must recalculate layout for all elements
   - Explicitly targeting `html, body` is more efficient

2. **Specificity Issues**:

   - `*` has low specificity (0,0,0)
   - Browser defaults have higher specificity
   - Explicit targets ensure override

3. **Unintended Consequences**:

   - Resets form elements (inputs, buttons) to unusable states
   - Removes list indentation (ul/ol) which is often desirable
   - Over-resets semantic spacing

4. **Background Handling**:
   - Even with `*`, you still need to explicitly set background colors
   - The white gap you saw was actually the browser window background showing through transparent elements

### Best Practice Reset

```css
/* 1. Core reset */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%; /* For percentage-based heights */
}

/* 2. Safe universal properties */
* {
  box-sizing: border-box; /* Include padding in width calc */
}

/* 3. Body defaults */
body {
  background-color: #27254a; /* Your main color */
  color: #333; /* Default text color */
  line-height: 1.5;
}

/* 4. Add back sensible defaults */
ul,
ol {
  padding-left: 2em; /* Restore list indentation */
}
```

### Why You Saw the White Gap

- The white wasn't a margin, but the browser window background
- When elements don't cover the full viewport, the window shows through
- Solution: Always set `background-color` on both `html` and `body`

```css
html,
body {
  background-color: #27254a; /* Cover potential gaps */
}
```

### Key Takeaways

1. Use `html, body` for root element resets
2. Use `*` only for safe universal properties like `box-sizing`
3. Always set background colors on both html and body
4. Restore sensible defaults for specific elements (lists, etc.)

This approach gives you proper control without the performance hit or unintended consequences of universal margin/padding resets.

why setting background colors on both `<html>` and `<body>` is recommended, and what happens when you set it only on `<html>`:

### The Browser Rendering Hierarchy

Browsers render backgrounds in this order:

1. **Browser canvas** (default white)
2. **`<html>` element** background
3. **`<body>` element** background
4. **Child elements** backgrounds

### When you set background ONLY on `<html>`:

```css
html {
  background: #27254a;
}
body {
  background: none; /* default transparent */
}
```

1. The `<html>` element only covers its content area by default
2. If your content doesn't fill the viewport:
   - The `<body>` is transparent
   - Browser shows the `<html>` background where content exists
   - **But** shows the browser canvas (white) in unfilled areas

### Visual Demonstration

Consider this simplified view:

```
┌───────────────────────────────────┐
│ Browser Canvas (white)            │
│ ┌───────────────────────────────┐ │
│ │ <html> background (#27254a)   │ │
│ │ ┌───────────────────────────┐ │ │
│ │ │ <body> (transparent)      │ │ │
│ │ │                           │ │ │
│ │ │                           │ │ │
│ │ └───────────────────────────┘ │ │
│ │                               │ │
│ └───────────────────────────────┘ │
└───────────────────────────────────┘
```

The white areas around the `<html>` element become visible gaps.

### The Proper Solution

```css
html,
body {
  background: #27254a; /* Both get same color */
  margin: 0;
  padding: 0;
  min-height: 100vh; /* Cover full viewport */
}
```

### Why This Works Perfectly

1. `<html>` covers the entire browser canvas
2. `<body>` covers the entire `<html>` element
3. Any scrollable areas maintain background color
4. No gaps regardless of content height

### Special Case: When `<html>`-Only Works

You could set only on `<html>` if you add:

```css
html {
  background: #27254a;
  min-height: 100vh; /* Force html to full height */
}
body {
  background: transparent;
}
```

But this has 2 drawbacks:

1. Less intuitive for other developers
2. Potential issues with browser compatibility
3. Doesn't work with percentage-based heights

### Professional Recommendation

**Always set backgrounds on both:**

```css
html,
body {
  background: #27254a;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
```

This approach:

- Works in all browsers (including legacy)
- Prevents any potential gap issues
- Creates a predictable rendering environment
- Handles both short and long content pages
- Follows industry best practices (used by Bootstrap, Tailwind, etc.)

The minor duplication is worth the rendering consistency across all devices and browsers.

### Default Behavior Explained

By default, the `<html>` element:

1. Is a **block-level element** like any other div or section
2. **Only expands to fit its content** - not the full viewport
3. Has **no inherent height** beyond what its children require
4. **Doesn't automatically fill** the browser window

### Visual Demonstration

Consider this simplified HTML structure:

```html
<html>
  <body>
    <div>Content</div>
  </body>
</html>
```

By default, the rendering looks like this:

```
┌───────────────────────────────┐ ← Browser Window (canvas)
│                               │
│   ┌───────────────────────┐   │
│   │ <html>                │   │
│   │   ┌─────────────────┐ │   │
│   │   │ <body>          │ │   │
│   │   │   ┌───────────┐ │ │   │
│   │   │   │ Content   │ │ │   │
│   │   │   └───────────┘ │ │   │
│   │   └─────────────────┘ │   │
│   └───────────────────────┘   │
│                               │ ← White space shows here
└───────────────────────────────┘
```

### Key Implications

1. **If your content is short**:

   - `<html>`/`<body>` only cover the content area
   - The browser canvas (white by default) shows around them

2. **If your content is tall**:

   - `<html>`/`<body>` expand vertically with content
   - No white gap at the bottom, but top/sides may still show

3. **Background propagation**:
   - `<body>` background propagates to the entire canvas ONLY if:
     a) `<html>` has no background set
     b) The content is shorter than the viewport

### The Solution

To make the background cover the entire viewport regardless of content height:

```css
html {
  background-color: #27254a; /* Primary background */
  min-height: 100vh; /* Force to cover viewport */
}

body {
  background-color: #27254a; /* Secondary protection */
  margin: 0; /* Remove default 8px margin */
}
```

### Why This Works

1. `min-height: 100vh` forces `<html>` to:

   - Be at least as tall as the viewport
   - Expand beyond viewport if content is taller

2. Setting both backgrounds:
   - Ensures coverage during initial page load
   - Prevents flickering or gaps during rendering
   - Handles both short and long content cases

### Real-World Example

When your page loads:

1. Browser starts with white canvas
2. Begins parsing HTML/CSS
3. If `<body>` renders first with content shorter than viewport:
   - Without `html { min-height: 100vh }`, white gaps appear
   - With it, background covers immediately

This behavior is why you saw the top white gap - the browser canvas was showing through until the content rendered completely. The dual background declaration with viewport units provides the most reliable coverage.

### The Short Answer

**No, resetting `html` and `body` doesn't affect pseudo-elements.** Pseudo-elements like `::before` and `::after` require separate attention.

### Why They're Different

1. **Pseudo-elements are separate entities**:

   ```css
   /* These are distinct from regular elements */
   ::before,
   ::after {
     /* Styles here */
   }
   ```

2. **Default browser styles**:

   - Most pseudo-elements have no default margins/padding
   - Exceptions: `::marker` (list bullets) may have spacing

3. **Inheritance behavior**:
   - Pseudo-elements inherit styles from their parent element
   - But they don't inherit the reset applied to `html/body`

### The Complete Reset Approach

For true "nuclear" reset:

```css
/* 1. Core HTML/Body reset */
html,
body {
  margin: 0;
  padding: 0;
}

/* 2. Pseudo-element reset (optional but recommended) */
*,
*::before,
*::after {
  box-sizing: border-box; /* Crucial for layout */
  margin: 0;
  padding: 0;
}

/* 3. Special pseudo-elements */
::marker {
  /* Reset list markers */
  padding: 0;
  margin: 0;
}
```

### When You Might Need Pseudo-element Reset

1. **Consistent layout calculations**:

   - Some browsers add default `display` values to pseudo-elements
   - Example: `::before` defaults to `display: inline`

2. **Third-party library conflicts**:

   - Component libraries might style pseudo-elements

3. **Advanced design systems**:
   - When using pseudo-elements for decorative purposes

### Practical Recommendation

For most projects:

```css
/* Essential reset */
html,
body {
  margin: 0;
  padding: 0;
  background-color: #27254a; /* Your main color */
}

/* Safe pseudo-element reset */
*,
*::before,
*::after {
  box-sizing: border-box; /* Most important */
}
```

You typically **don't** need to reset margins/padding on pseudo-elements unless:

- You're seeing unexpected spacing from `::marker`
- Using pseudo-elements for layout components
- Working with complex grid/flex layouts

### Real-World Example

In your pricing card layout:

- The checkmark icons (`::before` in Font Awesome) have their own box model
- But they don't contribute to the top white gap
- Resetting `html/body` is sufficient for the main layout issue

The white gap was caused by:

1. Default `<html>` margin (8px in Chrome)
2. Transparent background allowing browser canvas to show
3. Not forcing full viewport coverage

Pseudo-elements were never part of that equation. Focus on the `html/body` reset and background coverage as we discussed earlier for the main layout fix.

Browser default CSS settings, also known as **user-agent stylesheets**, are predefined styles applied by web browsers to HTML elements to ensure basic readability and visual presentation before any custom styling is added. These defaults vary slightly across browsers but follow consistent patterns. Below is a comprehensive overview:

### 🔧 1. **Core Purpose of Default Styles**

- Ensure unstyled HTML content remains legible and visually structured (e.g., headings larger than body text, lists indented) .
- Provide baseline styling for elements like links (`a:link { color: blue; text-decoration: underline; }`), form controls, and typography .

### 📌 2. **Common Default Styles**

- **Layout & Box Model**:
  - `body`: `margin: 8px;` (creates white gaps if not reset) .
  - `div`, `section`: `display: block;` .
  - Headings (`h1`-`h6`): Top/bottom margins (e.g., `h1 { margin-top: 0.67em; }`) and bold font weights .
- **Typography**:
  - `em`: `font-style: italic;`
  - `strong`: `font-weight: bold;`
  - `pre`, `code`: Monospace font stacks .
- **Lists**:
  - `ul`, `ol`: `margin-top: 1em; margin-bottom: 1em; padding-left: 40px;` .
- **Media**:
  - `img`: `display: inline-block;` .

### 🌐 3. **Browser-Specific Variations**

- **Chrome/Safari (WebKit)**: Subtle differences in form control styling (e.g., `input` shadows).
- **Firefox (Gecko)**: Larger default font sizes for some elements .
- **Legacy Browsers (IE)**: Inconsistent box models or outdated styles .
  > 💡 Example: `h2` margins range from `0.83em` (Chrome) to `0.75em` (Firefox) .

### 🔍 4. **Inspecting Default Styles**

- Use browser **Developer Tools** (e.g., Chrome DevTools):
  1.  Right-click an element → "Inspect".
  2.  Check the "Styles" panel for "user agent stylesheet" rules .
- Tools like [Browser Default Styles](https://browserdefaultstyles.com/) allow cross-browser comparisons .

### 🛠️ 5. **Overriding Defaults: CSS Resets**

Developers use resets to standardize styles:

- **Universal Reset**:
  ````css
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Ensures padding/border don't expand element size */
  }
  ``` .
  ````
- **Targeted Resets**:
  ````css
  body { margin: 0; }
  ul, ol { padding-left: 1rem; list-style: none; } /* Remove list indentation */
  a { color: inherit; text-decoration: none; } /* Unstyle links */
  ``` .
  ````
- **Popular Libraries**:
  - **Normalize.css**: Preserves useful defaults while fixing inconsistencies .
  - **Uniform CSS**: Resets borders, form elements, and typography .

### ⚠️ 6. **Key Considerations**

- **Performance**: Over-resetting with `*` can impact rendering speed; target critical elements instead .
- **Accessibility**: Retain semantic defaults (e.g., focus outlines for keyboard navigation) .
- **Pseudo-elements**: Reset separately (e.g., `*::before, *::after { box-sizing: border-box; }`) .

### 💎 Conclusion

Browser defaults ensure content is minimally usable without CSS but introduce cross-browser inconsistencies. **CSS resets** provide a clean starting point for custom designs. For a full reference, explore [CSS Default Values](https://www.w3schools.am/cssref/css_default_values.html) or browser-specific stylesheets .

> **Implementation Tip**: Always place reset styles at the top of your CSS to override defaults before applying custom rules .

# flex grow and shrink

In CSS, **flex growth** refers to the `flex-grow` property, which is part of the **Flexbox layout module**. It controls how a flex item expands to **absorb extra space** within a flex container when there's unused space available. Here's a breakdown:

### Key Points:

1. **Purpose**:  
   `flex-grow` determines how much a flex item will grow relative to other items in the container to fill any remaining space.

   - Default: `0` (no expansion).
   - Works only after the items' base sizes (`flex-basis`) are calculated.

2. **Syntax**:

   ```css
   .item {
     flex-grow: <number>; /* Non-negative value (e.g., 0, 1, 2) */
   }
   ```

3. **How It Works**:

   - The value is a **proportion**. It’s not an absolute size (e.g., pixels).
   - If all items have `flex-grow: 1`, they share extra space equally.
   - If one item has `flex-grow: 2` and others `flex-grow: 1`, the first item takes **twice as much** extra space as the others.

   ```
   Extra Space Distribution = (Item's flex-grow value / Total flex-grow values) × Remaining Space
   ```

4. **Example**:

   ```html
   <div class="container">
     <div class="item item-A">A</div>
     <div class="item item-B">B</div>
   </div>
   ```

   ```css
   .container {
     display: flex; /* Flex container */
     width: 300px;
   }
   .item {
     flex-basis: 50px; /* Base width */ content A is too small so add a basis width
   }
   .item-A {
     flex-grow: 1; /* Takes 1 part of extra space */
   }
   .item-B {
     flex-grow: 2; /* Takes 2 parts of extra space */
   }
   ```

   - If the total space is `300px` and base widths are `50px` each, the **remaining space** is `300px - 100px = 200px`.
   - This extra `200px` is split into `3` parts (`1 + 2`):
     - `item-A` gets `(1/3) × 200px ≈ 66.67px` → Final width = `50px + 66.67px = 116.67px`.
     - `item-B` gets `(2/3) × 200px ≈ 133.33px` → Final width = `50px + 133.33px = 183.33px`.

5. **Notes**:
   - `flex-grow` only applies if there's **positive free space** in the container.
   - Combine with `flex-shrink` (for shrinking) and `flex-basis` (base size) for full control.
   - Shorthand: Use the `flex` property:
     ```css
     .item {
       flex: 1 0 auto; /* flex-grow | flex-shrink | flex-basis */
     }
     ```

### Practical Use Cases:

- Building responsive layouts where items expand proportionally.
- Distributing leftover space evenly (e.g., navigation bars, grid systems).
- Creating fluid designs without fixed dimensions.

### Example: Equal Columns

```css
.container {
  display: flex;
}
.item {
  flex-grow: 1; /* All items expand equally to fill the container */
}
```

**In summary**: `flex-grow` defines how flex items **grow** when extra space exists in the container, using proportional ratios to distribute space. It’s foundational for flexible layouts in modern CSS.

In the `flex` shorthand `flex: 1 0 auto;`, the `auto` sets the **`flex-basis`** property. Here's what it means:

### `flex-basis: auto` Explained:

1. **Natural Size Basis**

   - The item's size is based on its **content width** (for horizontal layouts) or **content height** (for vertical layouts).
   - If you've explicitly set `width`/`height`, it uses that value instead.
   - Essentially: _"Start with my natural content size or explicit dimensions, then grow/shrink from there."_

2. **Behavior in Layout**
   - The flex container first calculates space using the item's natural/content-based size.
   - **Extra space** is then distributed according to `flex-grow` (here `1`).
   - **Shrinking** is disabled (`flex-shrink: 0`), so items won't shrink below their base size.

---

### Example: `flex: 1 0 auto;`

```html
<div class="container">
  <div class="item">Short</div>
  width is based on the content
  <div class="item">Much Longer Content</div>
  this content is triple the width
</div>
```

```css
.container {
  display: flex;
  width: 500px; /* Container wider than content */
}

.item {
  flex: 1 0 auto; /* flex-grow:1 | flex-shrink:0 | flex-basis:auto */
}
```

#### What Happens:

1. **Base Sizes**:

   - First item: Width = `width` of "Short" (e.g., 50px)
   - Second item: Width = `width` of "Much Longer Content" (e.g., 150px)

2. **Distribute Extra Space**:
   - Total content width: `50px + 150px = 200px`
   - **Remaining space**: `500px - 200px = 300px`
   - Since both items have `flex-grow: 1`, they split extra space equally:
     - Each gets `300px / 2 = 150px` added.
   - Final widths:
     - First item: `50px + 150px = 200px`
     - Second item: `150px + 150px = 300px`

---

### Key Differences:

| `flex-basis` Value | Behavior                                                                  |
| ------------------ | ------------------------------------------------------------------------- |
| `auto`             | Starts from natural content size (or explicit `width`/`height`).          |
| `0`                | Ignores content size; all space distributed by `flex-grow`/`flex-shrink`. |
| `250px`            | Forces a fixed starting size (overrides content size).                    |

---

### When to Use `auto`:

- When you want items to **retain their content-proportioned base size** before growing.
- For layouts where items should expand **proportionally** but respect content differences (e.g., navigation bars with uneven labels).
- When you need to **prevent text wrapping** until space runs out.

### Shorthand Recap:

```css
.item {
  flex: 1 0 auto;
}
```

- **`1`**: Grow equally if space is available (`flex-grow`).
- **`0`**: Don't shrink (`flex-shrink`).
- **`auto`**: Start from natural content size (`flex-basis`).

This combination creates items that maintain their content's visual weight while expanding to fill the container.
