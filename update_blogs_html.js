const fs = require('fs');
const path = require('path');

const blogsFile = path.join(__dirname, 'blogs.html');
let content = fs.readFileSync(blogsFile, 'utf8');

const blogListing = `
<!-- ADD THIS BLOG LISTING SECTION -->
<section class="blog-listing" style="margin-bottom: 60px;">
  <h1 style="font-family:'Fraunces',serif; font-size: 2rem; color: #0C2340; margin-bottom: 10px;">Medical365 Insights — Healthcare Software Guides for India</h1>
  <p style="color: #6B7E91; font-size: 1.1rem; margin-bottom: 40px;">Expert guides on hospital management software, EMR systems, ABDM compliance, and healthcare IT for Indian hospitals and clinics.</p>

  <div class="posts-grid" style="margin-bottom: 40px;">
    <div class="post-card">
      <a href="/blogs/emr-vs-ehr-india" class="card-inner" style="padding: 24px; text-decoration: none;">
        <h2 style="font-family:'Fraunces',serif; font-size: 1.2rem; color: #1D5A9F; margin-bottom: 12px;">EMR vs EHR — What's the Difference for Indian Hospitals?</h2>
        <p style="color: #3D5166; font-size: 0.9rem; margin-bottom: 16px; line-height: 1.5;">Understand the key differences between EMR and EHR systems, which suits your Indian hospital, and why ABDM compliance matters in 2026.</p>
        <span style="font-size: 0.8rem; color: #6B7E91; font-weight: 600;">June 2026 · 5 min read</span>
      </a>
    </div>

    <div class="post-card">
      <a href="/blogs/nabh-compliance-guide" class="card-inner" style="padding: 24px; text-decoration: none;">
        <h2 style="font-family:'Fraunces',serif; font-size: 1.2rem; color: #1D5A9F; margin-bottom: 12px;">What is NABH Compliance? Complete Guide for Indian Hospitals</h2>
        <p style="color: #3D5166; font-size: 0.9rem; margin-bottom: 16px; line-height: 1.5;">Step-by-step guide to NABH accreditation for Indian hospitals — requirements, process, and how the right HMS software helps you achieve it faster.</p>
        <span style="font-size: 0.8rem; color: #6B7E91; font-weight: 600;">June 2026 · 6 min read</span>
      </a>
    </div>

    <div class="post-card">
      <a href="/blogs/abha-integration-guide" class="card-inner" style="padding: 24px; text-decoration: none;">
        <h2 style="font-family:'Fraunces',serif; font-size: 1.2rem; color: #1D5A9F; margin-bottom: 12px;">ABHA Integration Guide for Hospitals — How to Get ABDM Compliant</h2>
        <p style="color: #3D5166; font-size: 0.9rem; margin-bottom: 16px; line-height: 1.5;">Complete guide to ABHA ID generation, ABDM integration, and what Indian hospitals need to do to become digitally compliant in 2026.</p>
        <span style="font-size: 0.8rem; color: #6B7E91; font-weight: 600;">June 2026 · 7 min read</span>
      </a>
    </div>

    <div class="post-card">
      <a href="/blogs/hospital-software-rajasthan" class="card-inner" style="padding: 24px; text-decoration: none;">
        <h2 style="font-family:'Fraunces',serif; font-size: 1.2rem; color: #1D5A9F; margin-bottom: 12px;">Top 10 Hospital Management Software in Rajasthan 2026</h2>
        <p style="color: #3D5166; font-size: 0.9rem; margin-bottom: 16px; line-height: 1.5;">Comparing the best HMS platforms for Rajasthan hospitals — features, pricing, ABDM compliance, and which system is right for your facility size.</p>
        <span style="font-size: 0.8rem; color: #6B7E91; font-weight: 600;">June 2026 · 8 min read</span>
      </a>
    </div>
  </div>
</section>
`;

if (!content.includes('Medical365 Insights — Healthcare Software Guides for India')) {
    content = content.replace('<main id="main">', '<main id="main">\n' + blogListing);
}

const blogSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Medical365 Insights",
  "description": "Expert guides on hospital management software, EMR systems, ABDM compliance and healthcare IT for Indian hospitals and clinics.",
  "url": "https://www.medical365.in/blogs",
  "publisher": {
    "@type": "Organization",
    "name": "Medical365",
    "url": "https://www.medical365.in",
    "logo": "https://www.medical365.in/medical365logo1.png"
  }
}
</script>
`;

if (!content.includes('"@type": "Blog"')) {
    content = content.replace('</head>', blogSchema + '\n</head>');
}

fs.writeFileSync(blogsFile, content, 'utf8');
console.log("Updated blogs.html successfully!");
