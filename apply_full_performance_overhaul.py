import re
from pathlib import Path

def optimize_index_performance():
    index_path = Path("index.html")
    content = index_path.read_text(encoding="utf-8")

    # 1. Non-blocking Deferred GTM & GA4 Script
    # Replace synchronous GTM & gtag in <head> with non-blocking deferred loader
    gtm_old_pattern = r'<!-- Google Tag Manager -->.*?gtag\(\'config\', \'G-RMGG2LX0RF\'\);\s*</script>'
    
    gtm_deferred = """<!-- High-Performance Non-Blocking Analytics (Deferred until Idle) -->
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        function loadAnalytics() {
            if (window.__analyticsLoaded) return;
            window.__analyticsLoaded = true;
            
            // GTM
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W5H82GQ7');

            // GA4
            var gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-RMGG2LX0RF';
            document.head.appendChild(gaScript);
            gtag('js', new Date());
            gtag('config', 'G-RMGG2LX0RF');
        }

        // Trigger on first user interaction or when browser is idle
        if ('requestIdleCallback' in window) {
            requestIdleCallback(function() { setTimeout(loadAnalytics, 2500); });
        } else {
            window.addEventListener('load', function() { setTimeout(loadAnalytics, 2000); });
        }
        ['mousemove', 'touchstart', 'scroll', 'keydown'].forEach(function(e) {
            window.addEventListener(e, loadAnalytics, { once: true, passive: true });
        });
    </script>"""

    content = re.sub(gtm_old_pattern, gtm_deferred, content, flags=re.DOTALL)

    # 2. Add Preload for Hero LCP Image
    hero_preload = """    <!-- Preload Critical LCP Hero Image -->
    <link rel="preload" as="image" href="img/redesign/medical365_dashboard_v2.webp" type="image/webp" fetchpriority="high">
    <link rel="preload" as="image" href="img/redesign/clinic_management_isometric.webp" type="image/webp">
"""
    if "Preload Critical LCP Hero Image" not in content:
        content = re.sub(r'(<meta name="viewport"[^>]*>)', r'\1\n' + hero_preload, content, count=1)

    # 3. Update all image extensions in index.html to .webp
    # Replace all .png and .jpg image sources with .webp
    img_replacements = [
        ("medical365_dashboard_v2.png", "medical365_dashboard_v2.webp"),
        ("clinic_management_isometric.png", "clinic_management_isometric.webp"),
        ("emr_icon_3d_1775221267246.png", "emr_icon_3d_1775221267246.webp"),
        ("medical365_doctor_ui_new.png", "medical365_doctor_ui_new.webp"),
        ("rcm_icon_3d_1775221290252.png", "rcm_icon_3d_1775221290252.webp"),
        ("avatar_set_3d_1775221404479.png", "avatar_set_3d_1775221404479.webp"),
        ("hero_3d_dashboard_mockup_1775221247034.png", "hero_3d_dashboard_mockup_1775221247034.webp"),
        ("hospital_management_isometric.png", "hospital_management_isometric.webp"),
        ("lab_automation_isometric.png", "lab_automation_isometric.webp"),
        ("medical365_admin_ui_new.png", "medical365_admin_ui_new.webp"),
        ("medical365_management_ui_new.png", "medical365_management_ui_new.webp"),
        ("medical_ecosystem_isometric.png", "medical_ecosystem_isometric.webp"),
        ("secure_cloud_isometric.png", "secure_cloud_isometric.webp"),
        ("security_card_dark_visual_1775221310733.png", "security_card_dark_visual_1775221310733.webp"),
        ("specialty_care_isometric.png", "specialty_care_isometric.webp"),
        ("telemedicine_isometric.png", "telemedicine_isometric.webp"),
        ("audience_billing_ui_1775221358794.png", "audience_billing_ui_1775221358794.webp"),
        ("audience_doctor_ui_1775221336150.png", "audience_doctor_ui_1775221336150.webp"),
        ("audience_management_ui_1775221382117.png", "audience_management_ui_1775221382117.webp"),
        ("doctor_using_tablet_jaipur_1777267686585.png", "doctor_using_tablet_jaipur_1777267686585.webp"),
        ("jaipur_clinic_dashboard_1777267669141.png", "jaipur_clinic_dashboard_1777267669141.webp"),
        ("operational-dashboard.png", "operational-dashboard.webp"),
        ("medical365fav.jpg", "medical365fav.webp")
    ]

    for old_img, new_img in img_replacements:
        content = content.replace(old_img, new_img)

    # 4. Add fetchpriority="high" to the Hero LCP Image
    content = content.replace(
        '<img src="img/redesign/medical365_dashboard_v2.webp" alt="Medical365 Dashboard" \n                         class="dashboard-center">',
        '<img fetchpriority="high" loading="eager" decoding="async" width="900" height="520" src="img/redesign/medical365_dashboard_v2.webp" alt="Medical365 Dashboard" class="dashboard-center">'
    )

    # Also handle single-line version if formatted differently
    content = re.sub(
        r'<img[^>]*src="img/redesign/medical365_dashboard_v2\.webp"[^>]*>',
        '<img fetchpriority="high" loading="eager" decoding="async" width="900" height="520" src="img/redesign/medical365_dashboard_v2.webp" alt="Medical365 Dashboard" class="dashboard-center">',
        content
    )

    # 5. Add loading="lazy" and decoding="async" to all other images that don't have loading attribute
    def add_lazy_loading(match):
        tag = match.group(0)
        if "fetchpriority" in tag or "loading=" in tag:
            return tag
        # Add loading="lazy" decoding="async"
        return tag.replace("<img ", '<img loading="lazy" decoding="async" ')

    content = re.sub(r'<img [^>]+>', add_lazy_loading, content)

    # 6. Ensure FastGPT iframe only loads on user interaction (Click to Open)
    content = re.sub(
        r'<iframe id="m365-ai-iframe" src="https://cloud\.fastgpt\.io/chat/share\?shareId=mgf9GHRSyOVAa5FcDtPgfbD9"',
        r'<iframe id="m365-ai-iframe" data-src="https://cloud.fastgpt.io/chat/share?shareId=mgf9GHRSyOVAa5FcDtPgfbD9" src="about:blank"',
        content
    )

    # Update JS to load iframe src on open
    js_update_pattern = r'function openChat\(\) \{.*?modal\.style\.display = \'flex\';'
    js_update_replacement = """function openChat() {
            if (!isLoaded && iframe && iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
                isLoaded = true;
            }
            modal.style.display = 'flex';"""
    content = re.sub(js_update_pattern, js_update_replacement, content, flags=re.DOTALL)

    index_path.write_text(content, encoding="utf-8")
    print("Successfully overhauled index.html for maximum PageSpeed & Core Web Vitals score!")

if __name__ == "__main__":
    optimize_index_performance()
