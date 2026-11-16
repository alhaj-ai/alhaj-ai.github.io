import test from "node:test";
import assert from "node:assert/strict";
import { DOMAIN_PROJECTS, FLAGSHIP_PROJECTS } from "../portfolio-data";
import {
  answerPortfolioQuery,
  filterDomainProjects,
  filterFlagshipProjects,
} from "../portfolio-helpers";

test("filterFlagshipProjects narrows cleanly by category and stack query", () => {
  const visionMatches = filterFlagshipProjects(
    FLAGSHIP_PROJECTS,
    "Fine-Tuning & Vision",
    "layoutlmv3"
  );
  assert.equal(visionMatches.length, 1);
  assert.equal(visionMatches[0].id, "docushield-ai");

  const emptyMatches = filterFlagshipProjects(FLAGSHIP_PROJECTS, "All", "zzzz-nonexistent");
  assert.equal(emptyMatches.length, 0);
});

test("filterDomainProjects matches across repo scope and verification", () => {
  const ragDomain = filterDomainProjects(DOMAIN_PROJECTS, "RAG & Search", "whisperx");
  assert.equal(ragDomain.length, 1);
  assert.equal(ragDomain[0].id, "majles-ai");
});

test("answerPortfolioQuery resolves verified project and metric questions accurately", () => {
  const harnessReply = answerPortfolioQuery("Show Agent Harness proof");
  assert.equal(harnessReply.matched, true);
  assert.match(harnessReply.answer, /SHA-256/);
  assert.match(harnessReply.answer, /813ms/);
  assert.ok(harnessReply.links.some((l) => l.href.includes("Haseen-AI")));

  const docuReply = answerPortfolioQuery("Tell me about DocuShield-AI");
  assert.equal(docuReply.matched, true);
  assert.match(docuReply.answer, /0\.9856/);

  const credReply = answerPortfolioQuery("Verified Certifications");
  assert.equal(credReply.matched, true);
  assert.ok(credReply.links.some((l) => l.href.includes("credly.com")));
  assert.ok(credReply.links.some((l) => l.href.includes("academy.claude.com")));
});

test("answerPortfolioQuery handles blank and unknown inputs without fabricating claims", () => {
  const blankReply = answerPortfolioQuery("   ");
  assert.equal(blankReply.matched, false);
  assert.ok(blankReply.followUps.length > 0);

  const unknownReply = answerPortfolioQuery("quantum blockchain toaster");
  assert.equal(unknownReply.matched, false);
  assert.match(unknownReply.answer, /only responds from verified repository/i);
});
