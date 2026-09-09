// Fail closed on Netlify unless this is the approved PR preview or production from main.
const isNetlify = process.env.NETLIFY === "true";
const context = process.env.CONTEXT;
const branch = process.env.BRANCH;
const reviewId = process.env.REVIEW_ID;

if (!isNetlify) process.exit(0);

const approvedPreview = context === "deploy-preview" && reviewId === "5";
const approvedProduction = context === "production" && branch === "main";

if (!approvedPreview && !approvedProduction) {
  throw new Error(
    `UNEXPECTED NETLIFY BUILD CONTEXT. Refusing context=${context || "unset"}, branch=${branch || "unset"}, review=${reviewId || "unset"}.`,
  );
}
