import * as cheerio from "cheerio";

/**
 * DOM Distillation for AI Processing
 *
 * This module extracts only interactive elements from HTML,
 * reducing token count by 10x-100x for faster AI processing.
 *
 * Based on Vercel's agent-browser approach.
 */

interface SimplifiedElement {
  id: number;
  selector: string;
  type: string;
  text: string;
}

interface SimplifiedDomResult {
  text: string;
  elements: Map<number, SimplifiedElement>;
}

/**
 * Extract interactive elements and create AI-readable representation
 */
export function getSimplifiedDom(html: string): SimplifiedDomResult {
  const $ = cheerio.load(html);

  // 1. Remove noise: scripts, styles, SVGs, etc.
  $("script, style, noscript, svg, path, link, meta, head").remove();
  $("*")
    .contents()
    .filter((_, el) => el.type === "comment")
    .remove();

  // 2. Find interactive elements
  const interactiveSelector =
    'button, a, input, textarea, select, [role="button"], [role="link"], [onclick], [data-testid]';
  const elements = $(interactiveSelector);

  // 3. Assign AI IDs and build element map
  const elementMap = new Map<number, SimplifiedElement>();
  let aiId = 1;

  elements.each((_, el) => {
    const $el = $(el);

    // Skip hidden elements
    if ($el.css("display") === "none" || $el.attr("hidden") !== undefined) {
      return;
    }

    const id = aiId++;
    const selector = getUniqueSelector($el, $);
    const type = getElementType($el);
    const text = getElementText($el);

    // Mark element with AI ID for visual reference
    $el.attr("data-ai-id", id.toString());
    $el.prepend(`[ID:${id}] `);

    elementMap.set(id, {
      id,
      selector,
      type,
      text,
    });
  });

  // 4. Convert to simplified text
  const simplifiedText = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim();

  return {
    text: simplifiedText,
    elements: elementMap,
  };
}

/**
 * Generate a unique CSS selector for an element
 */
function getUniqueSelector(
  $el: cheerio.Cheerio<cheerio.Element>,
  $: cheerio.CheerioAPI
): string {
  // Priority 1: data-testid
  const testId = $el.attr("data-testid");
  if (testId) return `[data-testid="${testId}"]`;

  // Priority 2: id attribute
  const id = $el.attr("id");
  if (id) return `#${id}`;

  // Priority 3: data-ai-id (our assigned ID)
  const aiId = $el.attr("data-ai-id");
  if (aiId) return `[data-ai-id="${aiId}"]`;

  // Priority 4: Unique class combination
  const classes = $el.attr("class");
  if (classes) {
    const classSelector = "." + classes.split(" ").filter(Boolean).join(".");
    if ($(classSelector).length === 1) return classSelector;
  }

  // Fallback: Tag name with nth-child
  const tagName = ($el.prop("tagName") || "div").toLowerCase();
  const index = $el.index() + 1;
  return `${tagName}:nth-child(${index})`;
}

/**
 * Determine the type of interactive element
 */
function getElementType($el: cheerio.Cheerio<cheerio.Element>): string {
  const tagName = ($el.prop("tagName") || "").toLowerCase();
  const role = $el.attr("role");

  if (role === "button" || tagName === "button") return "button";
  if (role === "link" || tagName === "a") return "link";
  if (tagName === "input") {
    const inputType = $el.attr("type") || "text";
    return `input[${inputType}]`;
  }
  if (tagName === "textarea") return "textarea";
  if (tagName === "select") return "select";

  return "interactive";
}

/**
 * Extract meaningful text from an element
 */
function getElementText($el: cheerio.Cheerio<cheerio.Element>): string {
  // Get direct text content, limiting length
  const text = $el.text().trim().slice(0, 50);
  const ariaLabel = $el.attr("aria-label");
  const placeholder = $el.attr("placeholder");
  const title = $el.attr("title");

  return ariaLabel || text || placeholder || title || "unknown";
}

/**
 * Create a summary of the page for AI context
 */
export function createPageSummary(html: string): string {
  const { text, elements } = getSimplifiedDom(html);

  let summary = "=== Page Summary ===\n\n";
  summary += "Interactive Elements:\n";

  elements.forEach((el, id) => {
    summary += `  [ID:${id}] ${el.type}: "${el.text}"\n`;
  });

  summary += `\n=== Page Content ===\n${text.slice(0, 2000)}`;

  return summary;
}

export default getSimplifiedDom;
