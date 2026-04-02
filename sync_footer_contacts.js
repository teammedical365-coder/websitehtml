const fs = require('fs');
const path = require('path');

const newFooter = `<footer class="main-footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <img src="https://medical365.in/medical365logo1.png" alt="Medical365" class="footer-logo">
                <p>Empowering healthcare providers with modern, cloud-based management solutions.</p>
                <div style="margin-top: 20px;">
                    <a href="contact.html" class="btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">Book a Demo</a>
                </div>
            </div>
            
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="blogs.html">Blogs & News</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                    <li><a href="privacy.html" title="Governed by Indian jurisdiction and IT Act">Privacy Policy</a></li>
                    <li><a href="terms.html" title="Governed by Indian jurisdiction and IT Act">Terms of Service</a></li>
                </ul>
            </div>
            
            <div class="footer-links">
                <h4>Services</h4>
                <ul>
                    <li><a href="outpatient.html">Clinics (OPD)</a></li>
                    <li><a href="inpatient-management.html">Hospitals (IPD)</a></li>
                    <li><a href="specialty-care.html">Specialty Care</a></li>
                    <li><a href="pharmacy.html">Pharmacy Management</a></li>
                </ul>
            </div>
            
            <div class="footer-links">
                <h4>Locations We Serve</h4>
                <nav aria-label="Locations Menu">
                    <ul>
                        <li><a href="hospital-software-mansarovar.html">Hospital Software in Mansarovar</a></li>
                        <li><a href="hospital-software-malviya-nagar.html">Hospital Software in Malviya Nagar</a></li>
                        <li><a href="hospital-software-c-scheme.html">Hospital Software in C-Scheme</a></li>
                        <li><a href="hospital-software-vaishali-nagar.html">Hospital Software in Vaishali Nagar</a></li>
                        <li><a href="hospital-software-tonk-road.html">Hospital Software in Tonk Road</a></li>
                    </ul>
                </nav>
            </div>
            
            <div class="footer-links">
                <h4>Contact Details</h4>
                <ul style="display: flex; flex-direction: column; gap: 12px;">
                    <li style="color: #94A3B8; font-size: 0.85rem; line-height: 1.5;">
                        <span style="font-weight: 600; color: #fff;">Address:</span><br>
                        Bhamashah Techno Hub,<br>Sansthan Path, Jhalana Gram,<br>Malviya Nagar, Jaipur,<br>Rajasthan 302017
                    </li>
                    <li style="color: #94A3B8; font-size: 0.9rem;">
                        <span style="font-weight: 600; color: #fff;">Mobile:</span><br>
                        <a href="tel:+917791910007" style="color: var(--brand-teal); font-weight: 600;font-size: 1rem;">+91 7791910007</a>
                    </li>
                    <li style="margin-top: 8px;">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.4586208761183!2d75.81180000000001!3d26.8571876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db66d3a0429a3%3A0xe54d3cdfe92ece2b!2sBhamashah%20Techno%20Hub!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="150" style="border:0; border-radius: 8px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Medical365. All rights reserved.</p>
        </div>
    </div>
</footer>`;

const footerRegex = /<footer class="main-footer">[\s\S]*?<\/footer>/i;
const files = fs.readdirSync(__dirname);
let footerCount = 0;

files.forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
        if (footerRegex.test(content)) {
            content = content.replace(footerRegex, newFooter);
            fs.writeFileSync(path.join(__dirname, file), content);
            footerCount++;
        }
    }
});
console.log(`Successfully deployed the requested Contact Info and Map embedded Footer to ${footerCount} HTML files.`);
