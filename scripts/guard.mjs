// Preview source must never become a production deploy without a separately
// authorized release commit. Netlify reports CONTEXT=deploy-preview for PR builds.
const isNetlify = process.env.NETLIFY === "true";
const isApprovedPreview =
  process.env.CONTEXT === "deploy-preview" &&
  process.env.BRANCH === "forge/growth-engine-preview";

if (process.env.CONTEXT === "production" || (isNetlify && !isApprovedPreview)) {
  throw new Error(
    "PRODUCTION NOT AUTHORIZED. This build is restricted to the approved Netlify Deploy Preview.",
  );
}
