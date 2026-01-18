import { chromium, Browser, Page } from "playwright";
import { openai } from "@ai-sdk/openai";
import { generateText, tool } from "ai";
import { z } from "zod";
import { getSimplifiedDom, createPageSummary } from "./utils/simplify-dom";

const TARGET_URL = process.env.TARGET_URL || "http://localhost:3000";
const MAX_STEPS = 15;

/**
 * UPSIDER Design Verification Agent
 *
 * AI-driven agent that navigates the prototype to verify:
 * - Screen transitions work correctly
 * - Implementation completeness
 * - Design consistency
 *
 * Based on Vercel's agent-browser approach with DOM distillation.
 */

async function runAgent(goal: string) {
  console.log("\n🚀 UPSIDER Design Verification Agent Started");
  console.log(`📋 Goal: "${goal}"`);
  console.log(`🌐 Target: ${TARGET_URL}\n`);

  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    browser = await chromium.launch({
      headless: false, // Show browser for visual verification
      slowMo: 100, // Slow down for visibility
    });

    page = await browser.newPage({
      viewport: { width: 375, height: 812 }, // iPhone viewport
    });

    await page.goto(TARGET_URL, { waitUntil: "networkidle" });
    console.log("✅ Page loaded\n");

    let step = 0;
    let conversationHistory: string[] = [];

    while (step < MAX_STEPS) {
      step++;
      console.log(`\n--- Step ${step}/${MAX_STEPS} ---`);

      // Wait for any animations to complete
      await page.waitForTimeout(500);

      // Get current page state
      const html = await page.content();
      const pageSummary = createPageSummary(html);
      const { elements } = getSimplifiedDom(html);

      console.log(`📄 Found ${elements.size} interactive elements`);

      // AI decides next action
      const result = await generateText({
        model: openai("gpt-4o"),
        system: `あなたはUPSIDER PRESIDENT CARDアプリのデザイン検証エージェントです。

役割:
- 画面遷移が正しく機能するか確認
- 実装の抜け漏れを発見
- デザインの一貫性をチェック

ルール:
1. 操作可能な要素には [ID:数字] が付いています
2. クリックや入力はこのIDを使って行ってください
3. 問題を発見したらreportIssueツールで報告してください
4. ゴール達成または問題発見で終了してください

UPSIDERデザイン基準:
- ダークテーマ（背景: #001215）
- プライマリカラー: #394D45
- タップ領域は最低44x44px
- 金額は右揃え、等幅フォント
- 日本語用語: 「決済」「利用可能額」`,
        prompt: `Goal: ${goal}

Previous actions:
${conversationHistory.slice(-5).join("\n") || "None"}

Current page state:
${pageSummary}

What action should I take next?`,
        tools: {
          click: tool({
            description: "指定されたIDの要素をクリックする",
            parameters: z.object({
              id: z.number().describe("クリックする要素のID"),
              reason: z.string().describe("クリックする理由"),
            }),
            execute: async ({ id, reason }) => {
              const selector = `[data-ai-id="${id}"]`;
              console.log(`👆 Click ID:${id} - ${reason}`);

              try {
                await page!.click(selector);
                conversationHistory.push(`Clicked ID:${id} (${reason})`);
                return { success: true, message: `Clicked element ${id}` };
              } catch (error) {
                return { success: false, message: `Failed to click: ${error}` };
              }
            },
          }),

          type: tool({
            description: "指定されたIDの入力欄に文字を入力する",
            parameters: z.object({
              id: z.number(),
              text: z.string(),
            }),
            execute: async ({ id, text }) => {
              const selector = `[data-ai-id="${id}"]`;
              console.log(`⌨️ Type "${text}" into ID:${id}`);

              try {
                await page!.fill(selector, text);
                conversationHistory.push(`Typed "${text}" into ID:${id}`);
                return { success: true };
              } catch (error) {
                return { success: false, message: `Failed to type: ${error}` };
              }
            },
          }),

          scroll: tool({
            description: "ページをスクロールする",
            parameters: z.object({
              direction: z.enum(["up", "down"]),
              amount: z.number().default(300),
            }),
            execute: async ({ direction, amount }) => {
              const delta = direction === "down" ? amount : -amount;
              console.log(`📜 Scroll ${direction} ${amount}px`);

              await page!.evaluate((d) => window.scrollBy(0, d), delta);
              conversationHistory.push(`Scrolled ${direction}`);
              return { success: true };
            },
          }),

          reportIssue: tool({
            description: "デザインや実装の問題を報告する",
            parameters: z.object({
              type: z.enum(["design", "implementation", "usability"]),
              severity: z.enum(["low", "medium", "high"]),
              description: z.string(),
              suggestion: z.string().optional(),
            }),
            execute: async ({ type, severity, description, suggestion }) => {
              console.log(`\n⚠️ ISSUE FOUND`);
              console.log(`   Type: ${type}`);
              console.log(`   Severity: ${severity}`);
              console.log(`   Description: ${description}`);
              if (suggestion) console.log(`   Suggestion: ${suggestion}`);
              console.log("");

              conversationHistory.push(
                `Reported ${severity} ${type} issue: ${description}`
              );
              return { success: true, message: "Issue reported" };
            },
          }),

          finish: tool({
            description: "検証を終了する",
            parameters: z.object({
              success: z.boolean(),
              summary: z.string(),
            }),
            execute: async ({ success, summary }) => {
              console.log(`\n🏁 Verification ${success ? "PASSED" : "FAILED"}`);
              console.log(`📝 Summary: ${summary}\n`);

              // Keep browser open briefly for review
              await new Promise((resolve) => setTimeout(resolve, 3000));

              await browser?.close();
              process.exit(success ? 0 : 1);
            },
          }),
        },
        maxSteps: 1,
      });

      // Brief pause between actions
      await page.waitForTimeout(300);
    }

    console.log("\n⚠️ Max steps reached");
    await browser.close();
  } catch (error) {
    console.error("\n❌ Agent error:", error);
    await browser?.close();
    process.exit(1);
  }
}

// Parse command line arguments
const goal =
  process.argv[2] || "ホーム画面の各要素が正しく表示されているか確認する";

// Check for OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY environment variable is required");
  console.error("   Set it with: export OPENAI_API_KEY=your-api-key");
  process.exit(1);
}

runAgent(goal);
