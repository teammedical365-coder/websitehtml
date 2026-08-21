export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    
    // Construct email content for Gmail
    const emailSubject = `Medical365 Lead: ${data.first_name || 'New Submission'}`;
    const emailBody = `
      New lead from Medical365:
      --------------------------
      Name: ${data.first_name} ${data.last_name}
      Email: ${data.email}
      Phone: ${data.phone_number}
      Organization: ${data.organization_name || 'N/A'}
      Facility Type: ${data.facility_type || 'N/A'}
      Bed Count: ${data.bed_count || 'N/A'}
      Challenges: ${data.challenges || 'N/A'}
    `;

    // FOR THE USER: 
    // Since Vercel doesn't support PHP mail(), you need an API-based service.
    // I recommend using Resend or Formspree.
    // Setting up a relay to Formspree for immediate functionality:
    
    const FORMSPREE_ID = "mqaegeoj"; // TO BE UPDATED BY USER OR KEPT AS A RELAY
    
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send');
    }

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}
