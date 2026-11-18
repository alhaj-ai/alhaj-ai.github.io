import test from "node:test";
import assert from "node:assert/strict";
import {
  CORE_TOOLKIT_DOMAINS,
  DOMAIN_PROJECTS,
  ENGINEERING_PRINCIPLES,
  FLAGSHIP_PROJECTS,
  JOURNEY_TIMELINE,
} from "../portfolio-data";
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

test("flagship projects expose two concrete proof metrics and concise descriptions", () => {
  for (const project of FLAGSHIP_PROJECTS) {
    assert.ok(project.proofMetrics, `${project.id} must define proofMetrics`);
    assert.equal(project.proofMetrics.length, 2, `${project.id} must have exactly 2 proof metrics`);
    assert.ok(project.problem.length > 0 && project.problem.length < 240);
    assert.ok(project.architecture.length > 0 && project.architecture.length < 260);
  }
});

test("toolkit domains, principles, and journey entries are structured cleanly", () => {
  assert.equal(CORE_TOOLKIT_DOMAINS.length, 4);
  assert.equal(ENGINEERING_PRINCIPLES.length, 3);
  assert.equal(JOURNEY_TIMELINE.length, 3);

  const alRazi = JOURNEY_TIMELINE.find((j) => j.id === "education");
  assert.ok(alRazi);
  assert.match(alRazi.institution, /Al-Razi University/);
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
