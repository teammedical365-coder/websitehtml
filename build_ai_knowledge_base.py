import os
import re
import json
from pathlib import Path
from html.parser import HTMLParser

class CleanHTMLTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self.ignore_tags = {'script', 'style', 'noscript', 'header', 'footer', 'nav', 'svg'}
        self.current_tag_stack = []

    def handle_starttag(self, tag, attrs):
        self.current_tag_stack.append(tag.lower())

    def handle_endtag(self, tag):
        if self.current_tag_stack and self.current_tag_stack[-1] == tag.lower():
            self.current_tag_stack.pop()

    def handle_data(self, data):
        if not any(tag in self.ignore_tags for tag in self.current_tag_stack):
            clean = data.strip()
            if clean:
                self.text_parts.append(clean)

    def get_text(self):
        return " ".join(self.text_parts)

def extract_json_ld(html_content):
    schemas = []
    matches = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html_content, re.DOTALL | re.IGNORECASE)
    for m in matches:
        try:
            data = json.loads(m.strip())
            schemas.append(data)
        except Exception:
            pass
    return schemas

def extract_meta_tags(html_content):
    meta = {}
    title_match = re.search(r'<title>(.*?)</title>', html_content, re.IGNORECASE | re.DOTALL)
    if title_match:
        meta['title'] = title_match.group(1).strip()
    desc_match = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', html_content, re.IGNORECASE)
    if desc_match:
        meta['description'] = desc_match.group(1).strip()
    return meta

def extract_headings_and_content(html_content):
    # Extract h1, h2, h3 and following text
    sections = []
    # find all headings
    matches = re.findall(r'<(h[1-3])[^>]*>(.*?)</\1>', html_content, re.IGNORECASE | re.DOTALL)
    for tag, content in matches:
        clean_text = re.sub(r'<[^>]+>', '', content).strip()
        clean_text = re.sub(r'\s+', ' ', clean_text)
        if clean_text and len(clean_text) > 3:
            sections.append((tag.lower(), clean_text))
    return sections

def process_workspace():
    root_dir = Path(".")
    html_files = list(root_dir.glob("*.html"))
    blog_files = list((root_dir / "blogs").glob("*.html")) if (root_dir / "blogs").exists() else []

    all_faqs = {}
    modules_info = []
    blogs_info = []
    cities_set = set()

    # Process all root HTML files
    for file_path in html_files:
        try:
            content = file_path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        filename = file_path.name
        meta = extract_meta_tags(content)
        schemas = extract_json_ld(content)

        # Extract FAQs from schema
        for s in schemas:
            items = []
            if isinstance(s, dict):
                if s.get("@type") == "FAQPage" and "mainEntity" in s:
                    items = s["mainEntity"]
                elif "@graph" in s:
                    for g in s["@graph"]:
                        if g.get("@type") == "FAQPage" and "mainEntity" in g:
                            items.extend(g["mainEntity"])
            for item in items:
                q = item.get("name", "").strip()
                ans = item.get("acceptedAnswer", {}).get("text", "").strip()
                if q and ans and q not in all_faqs:
                    all_faqs[q] = ans

            # Extract local cities
            if isinstance(s, dict):
                if s.get("@type") == "LocalBusiness" and "address" in s:
                    addr = s["address"]
                    if isinstance(addr, dict) and addr.get("addressLocality"):
                        cities_set.add(addr.get("addressLocality"))
                if "@graph" in s:
                    for g in s["@graph"]:
                        if g.get("@type") == "LocalBusiness" and "address" in g:
                            addr = g["address"]
                            if isinstance(addr, dict) and addr.get("addressLocality"):
                                cities_set.add(addr.get("addressLocality"))

        # If it is a core module (not a geo-targeted variant)
        is_geo_page = any(city.lower() in filename.lower() for city in ["jaipur", "ajmer", "alwar", "bikaner", "jodhpur", "kota", "udaipur", "sikar", "pali", "bhopal", "delhi", "mumbai", "bengaluru", "chennai", "hyderabad", "malviya-nagar", "mansarovar", "vaishali", "vidyadhar", "tonk-road", "raja-park", "c-scheme", "jhotwara", "bapu-nagar", "jagatpura", "bhubaneswar", "chandigarh", "coimbatore", "dehradun", "guwahati", "indore", "kanpur", "kochi", "kolkata", "lucknow", "ludhiana", "nagpur", "nashik", "patna", "pune", "rajkot", "ranchi", "surat", "vadodara", "visakhapatnam", "bharatpur", "bhilwara", "sri-ganganagar"])
        
        if not is_geo_page and filename not in ["sitemap.html", "landingpages_sitemap.html", "superadmin.html", "templates.html", "seo_template.html", "free-webpage.html"]:
            headings = extract_headings_and_content(content)
            parser = CleanHTMLTextExtractor()
            parser.feed(content)
            clean_body = parser.get_text()
            
            modules_info.append({
                "file": filename,
                "title": meta.get("title", filename),
                "description": meta.get("description", ""),
                "headings": [h[1] for h in headings if h[0] in ['h1', 'h2']],
                "summary": clean_body[:800]
            })

    # Process blogs
    for b_file in blog_files:
        try:
            content = b_file.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        meta = extract_meta_tags(content)
        parser = CleanHTMLTextExtractor()
        parser.feed(content)
        clean_text = parser.get_text()

        blogs_info.append({
            "file": b_file.name,
            "title": meta.get("title", b_file.name),
            "description": meta.get("description", ""),
            "summary": clean_text[:1200]
        })

    # 1. Generate medical365-ai-knowledge-base.md
    kb_content = []
    kb_content.append("# Medical365 Master AI Knowledge Base & Context")
    kb_content.append("\n> Comprehensive knowledge base extracted from Medical365 platform documentation, features, compliance specifications, and healthcare solutions.\n")

    kb_content.append("## 1. Company & Platform Overview")
    kb_content.append("- **Product Name**: Medical365")
    kb_content.append("- **Category**: Cloud-based Hospital Information Management System (HIMS) & Electronic Medical Record (EMR/EHR) Platform")
    kb_content.append("- **Official Website**: https://www.medical365.in")
    kb_content.append("- **Target Audience**: Independent Clinics, Multi-specialty Hospitals, Polyclinics, Diagnostic Centers, and Healthcare Chains across India.")
    kb_content.append("- **Headquarters**: Bhamashah Techno Hub, Sansthan Path, Jhalana Gram, Malviya Nagar, Jaipur, Rajasthan 302017, India")
    kb_content.append("- **Phone Support / Sales**: +91 77919 10007")
    kb_content.append("- **Email**: info@medical365.in\n")

    kb_content.append("## 2. Core Modules & Capabilities")
    for m in modules_info:
        kb_content.append(f"### {m['title']}")
        if m['description']:
            kb_content.append(f"- **Summary**: {m['description']}")
        if m['headings']:
            kb_content.append(f"- **Key Features / Sections**: {', '.join(m['headings'][:8])}")
        kb_content.append("")

    kb_content.append("## 3. Regulatory Compliance & Security Standards")
    kb_content.append("- **ABDM Certified (Ayushman Bharat Digital Mission)**: Full M1 (Health ID creation / ABHA), M2 (Health Records linking & Personal Health Records / PHR), and M3 (Health Facility Registry / HFR & Health Professional Registry / HPR) integration.")
    kb_content.append("- **DPDP Act 2023 Compliant**: Adheres to the Digital Personal Data Protection Act 2023 with strict consent management, end-to-end encrypted storage, role-based access control, and granular audit logs.")
    kb_content.append("- **MoHFW EHR Standards**: Aligned with Ministry of Health and Family Welfare electronic health records interoperability standards.")
    kb_content.append("- **ISO 27001 Certified**: Information security management certified for healthcare data integrity and privacy.")
    kb_content.append("- **Offline-First Sync Engine**: Intelligent local caching allowing doctors and staff to work uninterrupted during internet drops, automatically syncing with cloud master upon reconnection.")
    kb_content.append("- **Indian Data Sovereignty**: 100% of patient data and medical records are hosted within certified Tier-3/Tier-4 data centers inside India.\n")

    kb_content.append("## 4. Key Performance & ROI Metrics")
    kb_content.append("- **Revenue Realization**: Up to 40% faster billing cycles and claims reconciliation.")
    kb_content.append("- **Patient Wait Times**: Reduced by ~30% with smart token kiosks, WhatsApp queues, and dynamic OPD scheduling.")
    kb_content.append("- **Deployment Speed**: 2–4 weeks rapid onboarding with dedicated on-ground local deployment teams.")
    kb_content.append("- **Data Reliability**: 99.9% cloud uptime with automated automated database backups.\n")

    kb_content.append("## 5. Frequently Asked Questions (Verified FAQ Corpus)")
    for q, a in all_faqs.items():
        kb_content.append(f"#### Q: {q}")
        kb_content.append(f"**A**: {a}\n")

    kb_content.append("## 6. Educational Guides & Articles (Knowledge Library)")
    for b in blogs_info:
        kb_content.append(f"### {b['title']}")
        if b['description']:
            kb_content.append(f"- **Overview**: {b['description']}")
        kb_content.append(f"- **Key Takeaway**: {b['summary'][:400]}...\n")

    kb_content.append("## 7. Geographic Reach & Service Network")
    kb_content.append(f"- **Key Cities & Regions Served**: {', '.join(sorted(list(cities_set)))}")
    kb_content.append("- **Deployment Model**: Cloud SaaS with dedicated on-premise regional training and deployment assistance across India.\n")

    kb_file_path = root_dir / "medical365-ai-knowledge-base.md"
    kb_file_path.write_text("\n".join(kb_content), encoding="utf-8")
    print(f"Generated: {kb_file_path} ({len(kb_content)} lines)")

    # 2. Generate llms-full.txt
    llms_full = []
    llms_full.append("# Medical365 - Full System Documentation & LLM Context")
    llms_full.append("Website: https://www.medical365.in")
    llms_full.append("Version: 4.5\n")
    llms_full.append("## System Architecture & Value Proposition")
    llms_full.append("Medical365 is a cloud-native Hospital Information Management System (HIMS) and Electronic Health Records (EHR) platform architected for clinics, specialty hospitals, and hospital networks in India. It seamlessly integrates clinical, administrative, and financial operations while adhering to national and international healthcare data standards.\n")
    
    llms_full.append("## Core Capabilities")
    for m in modules_info:
        llms_full.append(f"- **{m['title']}**: {m['description']}")
    
    llms_full.append("\n## Compliance, Security & Sovereign Data")
    llms_full.append("- ABDM Milestones M1, M2, M3 certified.")
    llms_full.append("- DPDP Act 2023 compliant data governance & consent architecture.")
    llms_full.append("- MoHFW EHR standards & ISO 27001 data integrity.")
    llms_full.append("- Offline-first local sync for uninterrupted clinical care.")
    llms_full.append("- 100% Indian Data Center residency.\n")

    llms_full.append("## Core Q&A Knowledge")
    for q, a in list(all_faqs.items())[:15]:
        llms_full.append(f"Q: {q}\nA: {a}\n")

    llms_full_path = root_dir / "llms-full.txt"
    llms_full_path.write_text("\n".join(llms_full), encoding="utf-8")
    print(f"Generated: {llms_full_path}")

    # 3. Generate JSONL dataset
    jsonl_records = []
    # Add System context
    jsonl_records.append({
        "messages": [
            {"role": "system", "content": "You are the Medical365 AI Assistant. You provide expert information about Medical365 Hospital Information Management System (HIMS), EMR/EHR, ABDM compliance, and clinic management software in India."},
            {"role": "user", "content": "What is Medical365 and what does it do?"},
            {"role": "assistant", "content": "Medical365 is a comprehensive, cloud-based Hospital Information Management System (HIMS) and Electronic Health Record (EHR) platform designed specifically for the Indian healthcare ecosystem. It provides end-to-end digital infrastructure for clinics, multi-specialty hospitals, and healthcare chains, covering EMR/EHR, Billing/RCM, LIMS, Pharmacy, OPD Queue Management, and Telemedicine, all fully compliant with ABDM (Ayushman Bharat Digital Mission) and the DPDP Act 2023."}
        ]
    })

    for q, a in all_faqs.items():
        jsonl_records.append({
            "messages": [
                {"role": "system", "content": "You are the Medical365 AI Assistant, an expert in Medical365 HIMS, EMR, and healthcare compliance."},
                {"role": "user", "content": q},
                {"role": "assistant", "content": a}
            ]
        })

    for b in blogs_info:
        jsonl_records.append({
            "messages": [
                {"role": "system", "content": "You are the Medical365 AI Assistant."},
                {"role": "user", "content": f"Can you explain the key concepts from: {b['title']}?"},
                {"role": "assistant", "content": f"{b['description']}\n\nSummary: {b['summary'][:600]}"}
            ]
        })

    jsonl_path = root_dir / "medical365-ai-dataset.jsonl"
    with open(jsonl_path, "w", encoding="utf-8") as f:
        for rec in jsonl_records:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")
    print(f"Generated: {jsonl_path} ({len(jsonl_records)} records)")

if __name__ == "__main__":
    process_workspace()
