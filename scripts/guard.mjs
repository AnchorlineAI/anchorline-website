// This source is authorized only for Netlify's owner-review Deploy Preview PR #5.
const isNetlify = process.env.NETLIFY === "true";
const isApprovedPreview =
  process.env.CONTEXT === "deploy-preview" &&
  process.env.REVIEW_ID === "5";
if (isNetlify && !isApprovedPreview) {
  throw new Error(
    "PRODUCTION NOT AUTHORIZED. This build is restricted to owner-review Deploy Preview PR #5.",
  );
}
