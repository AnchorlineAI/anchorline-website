if (
  process.env.CONTEXT === "production" ||
  (process.env.NETLIFY === "true" &&
    process.env.BRANCH !== "forge/growth-engine-preview")
) {
  throw new Error(
    "PRODUCTION NOT AUTHORIZED. This build is restricted to forge/growth-engine-preview.",
  );
}
