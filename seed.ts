// Seed script — pre-populate Sanity with initial content
// Run: npx sanity exec seed.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// ── Markdown-lite → Portable Text helper ──────────────────────────
// Handles: # h1, ## h2, ### h3, - bullet list items, plain paragraphs.
// Skips blank lines. Each non-blank line becomes one PT block.
let _ptKey = 0
function ptBlock(text: string, style: string = 'normal', listItem?: 'bullet' | 'number') {
  _ptKey += 1
  const key = `pt-${_ptKey}`
  const block: any = {
    _type: 'block',
    _key: key,
    style,
    children: [{ _type: 'span', _key: `${key}-s`, text, marks: [] }],
    markDefs: [],
  }
  if (listItem) {
    block.listItem = listItem
    block.level = 1
  }
  return block
}
function md(input: string) {
  return input
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith('### ')) return ptBlock(line.slice(4), 'h3')
      if (line.startsWith('## ')) return ptBlock(line.slice(3), 'h2')
      if (line.startsWith('# ')) return ptBlock(line.slice(2), 'h1')
      if (line.startsWith('- ')) return ptBlock(line.slice(2), 'normal', 'bullet')
      return ptBlock(line, 'normal')
    })
}

const documents = [
  {
    "_type": "siteSettings",
    "_id": "siteSettings",
    "siteName": "Advocate Of SHALOM",
    "ctaLabel": "Get Started",
    "ctaUrl": "/contact",
    "contactEmail": "navigator@advocateofshalom.com",
    "contactPhone": "",
    "contactAddress": "",
    "copyrightText": "© 2026 Advocate Of SHALOM. All rights reserved."
  },
  {
    "_type": "page",
    "_id": "page-home",
    "title": "Home",
    "slug": {
      "_type": "slug",
      "current": "/"
    },
    "sections": [
      {
        "_type": "heroSection",
        "_key": "heroSection-0",
        "title": "Advocate Of SHALOM",
        "subtitle": "",
        "cta": {
          "label": "Get Started",
          "url": "/contact"
        }
      },
      {
        "_type": "textContent",
        "_key": "textContent-1"
      },
      {
        "_type": "featureGrid",
        "_key": "featureGrid-2",
        "heading": "What We Bring to Every Case",
        "items": [
          { "_key": "feat-1", "_type": "featureItem", "title": "Criminal Justice Navigation", "icon": "Scale", "description": "Hands-on advocacy from arraignment through reentry — translating the system into plain language at every stage." },
          { "_key": "feat-2", "_type": "featureItem", "title": "Agency Advocacy", "icon": "Landmark", "description": "DHS, Medicaid, housing, benefits — we walk in with you and walk out with what you came for." },
          { "_key": "feat-3", "_type": "featureItem", "title": "Coordinated Support", "icon": "Network", "description": "We partner with attorneys, social workers, and community providers so nothing falls through the cracks." },
          { "_key": "feat-4", "_type": "featureItem", "title": "Someone In Your Corner", "icon": "Shield", "description": "Ongoing presence and follow-through, because lasting stability takes more than solving the immediate problem." }
        ]
      },
      {
        "_type": "processSteps",
        "_key": "processSteps-3",
        "heading": "How We Work",
        "subheading": "A simple, clear process — because you have enough to think about.",
        "steps": [
          { "_key": "step-1", "_type": "processStep", "title": "Reach Out", "icon": "Phone", "description": "Contact us to share your situation. There's no wrong way to start the conversation." },
          { "_key": "step-2", "_type": "processStep", "title": "We Listen", "icon": "Ear", "description": "We take time to understand what you're facing before we recommend anything. No rushing, no judgment." },
          { "_key": "step-3", "_type": "processStep", "title": "We Build a Plan", "icon": "ClipboardList", "description": "Together we map out the steps, the agencies involved, and what advocacy looks like for your specific situation." },
          { "_key": "step-4", "_type": "processStep", "title": "We Walk With You", "icon": "PersonStanding", "description": "We stay involved through the process — attending appointments, following up with agencies, and making sure nothing falls through the cracks." }
        ]
      },
      {
        "_type": "videoSection",
        "_key": "videoSection-3a",
        "heading": "How We Work",
        "subheading": "A short walkthrough of what advocacy looks like — coming soon.",
        "placeholderText": "Video coming soon"
      },
      {
        "_type": "testimonialsSection",
        "_key": "testimonialsSection-4"
      },
      {
        "_type": "pricingCtaSection",
        "_key": "pricingCtaSection-5"
      }
    ]
  },
  {
    "_type": "aboutPage",
    "_id": "aboutPage",
    "storyVersion": "alludes",
    "heroHeadlineFull": "We Know This System From the Inside Out",
    "heroSubheadlineFull": "Advocate Of SHALOM was built by someone who lived it — and came back to make sure others don't have to face it alone.",
    "heroHeadlineAlludes": "We Show Up for People the System Has Forgotten",
    "heroSubheadlineAlludes": "Advocate Of SHALOM exists because someone saw what happens when people have to navigate these systems alone — and decided to do something about it.",
    "originStoryFull": "Elyse Parker spent 13 years in prison for a crime she didn't physically commit. She came out with nothing — no housing, no support, no roadmap. What followed was homelessness, relapse, and the very real possibility of losing everything that mattered. But she refused to let that be the end of the story. She rebuilt her life from the ground up. From shelter resident to case manager. From case manager to criminal defense advocate. Today she works alongside legal teams across Colorado, walking people through the same system she survived — this time as the one who knows the language, knows the agencies, and knows how to make it work for the people who need it most. Advocate Of SHALOM is the organization she wished had existed when she needed it.",
    "originStoryAlludes": "Elyse Parker has spent years working on both sides of the criminal justice system — first navigating it herself, then learning to advocate within it professionally. That experience isn't academic. It's the reason she knows what it actually takes to help someone get their Medicaid approved, find stable housing, or walk into a DHS office and come out with what they came for. She started Advocate Of SHALOM because she'd seen what happens when people face these systems without support. And she decided that for the people she could reach, that wouldn't be the story anymore.",
    "teamBioFull": "Elyse brings something most advocates can't: she's been inside the system as a client, survived what it does to people, and rebuilt her life on the other side. After 13 years of incarceration and the hard road that followed, she moved from shelter resident to case manager to criminal defense advocate — working alongside legal teams across Colorado. She holds two active state contracts and is currently building Advocate Of SHALOM to extend that work to the people who need it most but don't yet have access to it.",
    "teamBioAlludes": "Elyse has spent years working within Colorado's criminal justice and social services systems — first as a client, then as a case manager, and now as a criminal defense advocate working alongside legal teams statewide. She holds two active state contracts and brings a level of firsthand knowledge to this work that can't be taught in a classroom. She started Advocate Of SHALOM to make that knowledge available to the people who need it and can't afford to go without it.",
    "approachHeading": "Our Approach",
    "approachBody": "Holistic advocacy means we don't stop at the legal case. We address what it actually takes to rebuild a life — housing, healthcare, finances, social reintegration, spiritual wellbeing. Whatever the barrier is, we work on it. One client at a time if that's what it takes.",
    "whoWeServeHeading": "Who We Serve",
    "whoWeServeBody": "We work primarily with individuals transitioning out of incarceration — people navigating parole, reentry, DHS systems, and the practical reality of starting over in a world that moved on without them. We also partner with attorneys, social workers, and community agencies who need a dedicated advocate in their client's corner.",
    "ctaHeading": "Want to learn more about what we do?",
    "ctaSubline": "Whether you're looking for support or want to explore working alongside us — we'd love to hear from you.",
    "ctaButtonLabel": "Get In Touch",
    "ctaButtonUrl": "/contact"
  },
  {
    "_type": "contactPage",
    "_id": "contactPage",
    "textHeading": "We'd Love to Hear From You",
    "bodyContent": "Whether you're looking for support navigating a difficult situation or you're a professional interested in working alongside us — this is the right place to start. Fill out the form below and we'll get back to you as soon as possible.",
    "contactHeading": "Send Us a Message",
    "contactPhone": "(970) 773-5907",
    "contactEmail": "navigator@advocateofshalom.com",
    "contactHoursLabel": "Monday – Friday, 9:00 AM – 5:00 PM MST",
    "contactWarmNote": "We read every message personally and respond within 1–2 business days.",
    "contactResponseNote": "We typically respond within 1–2 business days.",
    "mapHeading": "Find Us",
    "mapAddress": "536 31½ Rd #1\nGrand Junction, CO 81504",
    "mapPhone": "(970) 773-5907",
    "mapEmail": "navigator@advocateofshalom.com",
    "mapAppointmentNote": "Visits are by appointment only. Please reach out using the form above or by phone to schedule a time.",
    "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3097.037004815798!2d-108.47091732349385!3d39.082854835739354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87471f2210b43f45%3A0xb0186204a94f7650!2s536%2031%201%2F2%20Rd%2C%20Grand%20Junction%2C%20CO%2081504!5e0!3m2!1sen!2sus!4v1780605704614!5m2!1sen!2sus"
  },
  {
    "_type": "servicesPage",
    "_id": "servicesPage",
    "heroTitle": "We Help People Navigate Systems That Weren't Built for Them",
    "heroSubtitle": "Whether you're facing a criminal charge, transitioning out of incarceration, or trying to access services you're entitled to — we know how to get you what you need.",
    "heroCta": { "label": "Reach Out", "url": "/contact" },
    "servicesIntroHeading": "What We Do",
    "servicesIntroBody": "The systems meant to support people are often the hardest to navigate alone. Court requirements, DHS offices, housing applications, agency paperwork — for most people going through a difficult time, it's overwhelming. Advocate Of SHALOM provides holistic, hands-on advocacy that addresses the whole person — not just the immediate case.",
    "servicesHeading": "Our Services",
    "servicesSubheading": "We meet you where you are and walk with you through what comes next.",
    "services": [
      { "_key": "svc-1", "_type": "serviceItem", "title": "Criminal Justice Navigation", "icon": "Scale", "description": "We help individuals understand their rights, their options, and what to expect at every stage of the legal process. You don't have to walk into that courtroom alone." },
      { "_key": "svc-2", "_type": "serviceItem", "title": "DHS & Agency Advocacy", "icon": "Landmark", "description": "From food stamps to Medicaid to housing benefits — we know the language these agencies speak and we use it on your behalf. You go in with us, you come out with what you came for." },
      { "_key": "svc-3", "_type": "serviceItem", "title": "Reentry Support", "icon": "DoorOpen", "description": "The transition out of incarceration is one of the hardest things a person can face. We help with ID acquisition, housing, healthcare access, and the practical reality of starting over." },
      { "_key": "svc-4", "_type": "serviceItem", "title": "Holistic Life Advocacy", "icon": "Heart", "description": "Spiritual wellbeing, finances, fitness, social skills — we address the whole pie. Lasting stability requires more than solving the immediate problem." },
      { "_key": "svc-5", "_type": "serviceItem", "title": "Appointment Accompaniment", "icon": "Users", "description": "We show up with you — to DHS, to the doctor, to the courthouse. Having someone who knows the system standing beside you changes everything." },
      { "_key": "svc-6", "_type": "serviceItem", "title": "Coordinated Support Network", "icon": "Network", "description": "We partner with attorneys, social workers, and community providers to build a support network around you. No one falls through the cracks." }
    ],
    "processHeading": "How We Work",
    "processSubheading": "A simple, clear process — because you have enough to think about.",
    "steps": [
      { "_key": "step-1", "_type": "processStep", "title": "Reach Out", "icon": "Phone", "description": "Contact us to share your situation. There's no wrong way to start the conversation." },
      { "_key": "step-2", "_type": "processStep", "title": "We Listen", "icon": "Ear", "description": "We take time to understand what you're facing before we recommend anything. No rushing, no judgment." },
      { "_key": "step-3", "_type": "processStep", "title": "We Build a Plan", "icon": "ClipboardList", "description": "Together we map out the steps, the agencies involved, and what advocacy looks like for your specific situation." },
      { "_key": "step-4", "_type": "processStep", "title": "We Walk With You", "icon": "PersonStanding", "description": "We stay involved through the process — attending appointments, following up with agencies, and making sure nothing falls through the cracks." }
    ],
    "faqHeading": "Common Questions",
    "faqSubheading": "If you don't see your question here, just reach out.",
    "faqs": [
      { "_key": "faq-1", "_type": "faqItem", "question": "Who do you work with?", "answer": "We primarily work with individuals navigating the criminal justice system or transitioning out of incarceration. We also work with people struggling to access government services and benefits through agencies like DHS." },
      { "_key": "faq-2", "_type": "faqItem", "question": "Is there a cost for your services?", "answer": "Please reach out directly to discuss services and fees. We work to make advocacy accessible to the people who need it most." },
      { "_key": "faq-3", "_type": "faqItem", "question": "What does the process look like after I contact you?", "answer": "We'll start with a conversation to understand your situation. From there we'll discuss what advocacy looks like for your specific needs and agree on next steps together. There's no commitment required just to talk." },
      { "_key": "faq-4", "_type": "faqItem", "question": "Do you work across Colorado?", "answer": "We are based in Grand Junction, CO and primarily serve the Grand Valley region. Reach out to discuss your situation and we can talk through what support is possible." },
      { "_key": "faq-5", "_type": "faqItem", "question": "Can you help someone who is currently incarcerated?", "answer": "Yes. We work with individuals at every stage — including those currently incarcerated and planning for reentry, as well as those who have recently been released." },
      { "_key": "faq-6", "_type": "faqItem", "question": "What if I'm not sure whether you can help me?", "answer": "Reach out anyway. The worst that can happen is we point you toward someone who can. We'd rather hear from you and not be able to help than have you go without support because you weren't sure." }
    ],
    "servicesCtaHeadline": "Not Sure Where to Start?",
    "servicesCtaText": "You don't have to have it all figured out before you reach out. That's what we're here for.",
    "servicesCtaButtonLabel": "Get In Touch",
    "servicesCtaButtonUrl": "/contact"
  },
  {
    "_type": "partnersPage",
    "_id": "partnersPage",
    "heroTitle": "We Work Alongside Professionals Who Share Our Commitment",
    "heroSubtitle": "If you work with individuals navigating the criminal justice system or complex agencies, Advocate Of SHALOM can be the dedicated support presence your clients need.",
    "heroCta": { "label": "Get In Touch", "url": "/contact" },
    "partnersIntroHeading": "How Partnership Works",
    "partnersIntroBody": "Advocate Of SHALOM works alongside attorneys, social workers, case managers, and community agencies to build a coordinated support network around shared clients. We don't duplicate what you do — we fill the gaps. When your client needs someone to show up to a DHS appointment, navigate a housing application, or work through the practical barriers of reentry, that's where we come in.",
    "partnersServicesHeading": "Where We Fit In",
    "partnersServicesSubheading": "How Advocate Of SHALOM complements your work",
    "partnerServices": [
      { "_key": "svc-1", "_type": "serviceItem", "title": "Criminal Justice Navigation", "icon": "Scale", "description": "We help shared clients understand their rights, obligations, and next steps at every stage of the legal process — so you can focus on the legal work." },
      { "_key": "svc-2", "_type": "serviceItem", "title": "Agency Navigation", "icon": "Landmark", "description": "We accompany clients to DHS, housing offices, and community service agencies — ensuring they leave with what they came for." },
      { "_key": "svc-3", "_type": "serviceItem", "title": "Reentry Support", "icon": "DoorOpen", "description": "From ID acquisition to healthcare access to practical life skills, we address the full scope of what reentry actually requires." },
      { "_key": "svc-4", "_type": "serviceItem", "title": "Holistic Advocacy", "icon": "Heart", "description": "We address spiritual, financial, physical, and social needs alongside the legal and administrative — because lasting stability requires all of it." },
      { "_key": "svc-5", "_type": "serviceItem", "title": "Ongoing Availability", "icon": "Phone", "description": "We stay involved. We follow through. When something falls through the cracks we catch it — so you don't have to." },
      { "_key": "svc-6", "_type": "serviceItem", "title": "Coordinated Communication", "icon": "Share2", "description": "We keep relevant parties informed and maintain clear communication across the support network around each client." }
    ],
    "whoWeWorkWithHeading": "Who We Work With",
    "whoWeWorkWithBody": "We partner with professionals and organizations already serving individuals in or transitioning out of the criminal justice system.",
    "whoWeWorkWithFeatures": [
      "Criminal defense attorneys",
      "Public defenders",
      "Social workers and case managers",
      "Parole and probation officers",
      "Community service agencies",
      "Faith-based organizations",
      "Homeless service providers"
    ],
    "whatWeNeedHeading": "What Makes a Good Partnership",
    "whatWeNeedBody": "The best partnerships are built on a shared commitment to the whole person — not just the immediate case. We work best alongside professionals who believe in long-term stability over quick resolutions.",
    "whatWeNeedFeatures": [
      "Shared clients with complex, overlapping needs",
      "Willingness to coordinate across disciplines",
      "Commitment to client dignity and self-determination",
      "Open communication and clear referral processes"
    ],
    "partnerTestimonials": [],
    "partnersCtaHeadline": "Interested in Working Together?",
    "partnersCtaText": "Partnership inquiries receive a direct response. Reach out and let's talk about how we can support your clients.",
    "partnersCtaButtonLabel": "Get In Touch",
    "partnersCtaButtonUrl": "/contact"
  },
  {
    "_type": "resourcesPage",
    "_id": "resourcesPage",
    "heroTitle": "Resources for People Navigating Difficult Systems",
    "heroSubtitle": "Practical information, helpful links, and guides for individuals and professionals working through the criminal justice system and government agencies.",
    "heroCta": { "label": "Need More Help?", "url": "/contact" },
    "resourcesIntroHeading": "Finding the Right Help",
    "resourcesIntroBody": "Navigating the criminal justice system, reentry, or government agencies is hard enough without having to find the right resources on your own. We've put together information across the most common areas our clients face. This page grows over time — if you don't see what you need, reach out directly and we'll point you in the right direction.",
    "resourcesHeading": "Resource Categories",
    "resourcesSubheading": "Information organized by the areas where people need it most.",
    "resources": [
      { "_key": "res-1", "_type": "resourceItem", "title": "Legal Aid & Rights", "icon": "Scale", "description": "Organizations and resources to help you understand your legal rights, find representation, and navigate the court system in Colorado." },
      { "_key": "res-2", "_type": "resourceItem", "title": "Housing & Shelter", "icon": "Home", "description": "Emergency shelter, transitional housing, and longer-term housing resources for individuals and families in the Grand Valley and across Colorado." },
      { "_key": "res-3", "_type": "resourceItem", "title": "Healthcare & Benefits", "icon": "HeartPulse", "description": "Information on accessing Medicaid, mental health services, substance use treatment, and other health benefits you may be entitled to." },
      { "_key": "res-4", "_type": "resourceItem", "title": "Reentry Support", "icon": "DoorOpen", "description": "Resources specifically for individuals transitioning out of incarceration — ID acquisition, employment, housing, and community reintegration." },
      { "_key": "res-5", "_type": "resourceItem", "title": "Financial Assistance", "icon": "Wallet", "description": "Emergency financial assistance, benefits access, and resources for stabilizing finances during a difficult transition." },
      { "_key": "res-6", "_type": "resourceItem", "title": "Community & Faith", "icon": "Users", "description": "Community organizations, faith-based support networks, and peer support resources in the Grand Valley region." }
    ],
    "resourcesSplitHeading": "Don't See What You Need?",
    "resourcesSplitBody": "This page grows as we add more. If you're looking for something specific and can't find it here, reach out directly. We'd rather help you find the right resource than have you go without.",
    "resourcesSplitFeatures": [
      "We respond within 1–2 business days",
      "No commitment required to ask a question",
      "We'll point you toward the right resource even if it isn't us"
    ],
    "resourcesSplitCtaLabel": "Contact Us",
    "resourcesSplitCtaUrl": "/contact",
    "resourcesCtaHeadline": "Need Someone in Your Corner?",
    "resourcesCtaText": "Resources are a starting point. If you need someone to walk with you through the process — that's what we're here for.",
    "resourcesCtaButtonLabel": "Reach Out",
    "resourcesCtaButtonUrl": "/contact"
  },
  {
    "_type": "legalPage",
    "_id": "legal-privacy-policy",
    "title": "Privacy Policy",
    "slug": { "_type": "slug", "current": "privacy-policy" },
    "lastUpdated": "2026-05-25",
    "body": md(`
## Overview

Advocate Of SHALOM ("we," "us," or "our") operates advocateofshalom.com and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.

## Information We Collect

Information you provide directly:
- Contact form submissions (name, email, phone, message)

Information collected automatically:
- Browser type and operating system
- Pages visited and time spent on site
- IP address (anonymized)
- Referring website

We use Simple Analytics, a privacy-first analytics tool that does not use cookies and does not collect personal data.

## How We Use Your Information

We use collected information to:
- Respond to your inquiries and service requests
- Send relevant communications you have opted into
- Improve our website and services
- Comply with legal obligations

We do not sell, trade, or rent your personal information to third parties.

## Data Retention

We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.

## Your Rights

You have the right to:
- Request access to your personal data
- Request correction of inaccurate data
- Request deletion of your data
- Opt out of marketing communications at any time

To exercise these rights, contact us at navigator@advocateofshalom.com.

## Third-Party Services

Our website may use third-party services including social media platforms and embedded content. These services have their own privacy policies.

## Children's Privacy

Our website is not directed at children under 13. We do not knowingly collect personal information from children under 13.

## Changes to This Policy

We may update this Privacy Policy periodically. We will notify you of significant changes by posting a notice on our website.

## Contact Us

Advocate Of SHALOM
Email: navigator@advocateofshalom.com
Website: advocateofshalom.com
    `)
  },
  {
    "_type": "legalPage",
    "_id": "legal-terms-and-conditions",
    "title": "Terms & Conditions",
    "slug": { "_type": "slug", "current": "terms-and-conditions" },
    "lastUpdated": "2026-05-25",
    "body": md(`
## Agreement to Terms

By accessing and using the website at advocateofshalom.com, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use this site.

## Use of This Website

You may use this website for lawful purposes only. You agree not to:
- Use this site in any way that violates applicable local, state, or federal laws
- Attempt to gain unauthorized access to any part of the site
- Transmit harmful, offensive, or disruptive content
- Use automated tools to scrape or harvest data from this site

## Services and Advocacy Work

Advocate Of SHALOM provides holistic advocacy and consulting services to individuals navigating the criminal justice system and government agencies. Nothing on this website constitutes legal advice. Advocate Of SHALOM is not a law firm and does not provide legal representation. Any information provided through this website or through our services is for informational and advocacy purposes only and should not be relied upon as legal counsel. For legal advice, consult a licensed attorney.

## Intellectual Property

All content on this website — including text, images, logos, and design — is the property of Advocate Of SHALOM and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without prior written permission.

## Disclaimer of Warranties

This website and the information contained herein are provided "as is" without warranties of any kind, either express or implied. Advocate Of SHALOM does not warrant that the site will be error-free, uninterrupted, or free of viruses or other harmful components. Advocate Of SHALOM makes no warranties regarding the accuracy, completeness, or suitability of any information on this site for any particular purpose.

## Limitation of Liability

To the fullest extent permitted by law, Advocate Of SHALOM, its founder, agents, and representatives shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on any information provided herein. This limitation applies regardless of the legal theory on which the claim is based, even if Advocate Of SHALOM has been advised of the possibility of such damages. Our total liability for any claim arising from use of this website shall not exceed the amount paid by you, if any, for accessing this site.

## No Client Relationship

Accessing or using this website does not create an advocate-client or any other professional relationship between you and Advocate Of SHALOM. A formal relationship is only established through a signed service agreement.

## Links to Third-Party Websites

This site may contain links to external websites. Advocate Of SHALOM is not responsible for the content, accuracy, or privacy practices of those sites. Links do not constitute an endorsement of the linked site or its content.

## Privacy

Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms & Conditions by reference.

## Changes to These Terms

We reserve the right to update these Terms & Conditions at any time. Changes take effect immediately upon posting. Continued use of the site after changes are posted constitutes your acceptance of the revised terms. We encourage you to review this page periodically.

## Severability

If any provision of these Terms & Conditions is found to be invalid, illegal, or unenforceable, the remaining provisions will continue in full force and effect.

## Governing Law

These Terms are governed by the laws of the State of Colorado, without regard to conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Mesa County, Colorado.

## Contact Us

Advocate Of SHALOM
Email: navigator@advocateofshalom.com
Website: advocateofshalom.com
    `)
  },
  {
    "_type": "legalPage",
    "_id": "legal-accessibility",
    "title": "Accessibility Statement",
    "slug": { "_type": "slug", "current": "accessibility-statement" },
    "lastUpdated": "2026-05-25",
    "body": md(`
## Our Commitment

Advocate Of SHALOM is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.

## Standards We Aim to Meet

We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible to people with disabilities.

## Measures We Take

We take the following measures to ensure accessibility:
- Use semantic HTML elements
- Provide text alternatives for non-text content
- Ensure keyboard navigability throughout the site
- Maintain sufficient color contrast
- Use descriptive link text
- Provide visible focus indicators

## Known Limitations

While we strive for full accessibility, some content may not yet meet all standards. We are actively working to address these issues.

## Feedback

We welcome your feedback on the accessibility of advocateofshalom.com. If you experience any barriers, please contact us:

Email: navigator@advocateofshalom.com

We aim to respond to accessibility feedback within 2 business days.

## Formal Complaints

If you are not satisfied with our response, you may contact the relevant accessibility enforcement body in your jurisdiction.
    `)
  },
  {
    "_type": "footerColumns",
    "_id": "footer-column-explore",
    "title": "Explore",
    "order": 1,
    "links": [
      { "_key": "exp-1", "_type": "navLink", "label": "Partners", "url": "/partners" },
      { "_key": "exp-2", "_type": "navLink", "label": "Resources", "url": "/resources" }
    ]
  },
  {
    "_type": "footerColumns",
    "_id": "footer-column-legal",
    "title": "Legal",
    "order": 2,
    "links": [
      { "_key": "leg-1", "_type": "navLink", "label": "Privacy Policy", "url": "/privacy-policy" },
      { "_key": "leg-2", "_type": "navLink", "label": "Terms & Conditions", "url": "/terms-and-conditions" },
      { "_key": "leg-3", "_type": "navLink", "label": "Accessibility Statement", "url": "/accessibility" }
    ]
  },
  {
    "_type": "socialLinks",
    "_id": "social-facebook",
    "platform": "facebook",
    "url": "https://facebook.com/advocateofshalom",
    "order": 1
  },
  {
    "_type": "socialLinks",
    "_id": "social-instagram",
    "platform": "instagram",
    "url": "https://instagram.com/advocateofshalom",
    "order": 2
  },
  {
    "_type": "navigation",
    "_id": "nav-main",
    "navType": "main",
    "items": [
      {
        "_key": "home",
        "label": "Home",
        "url": "/"
      },
      {
        "_key": "about",
        "label": "About",
        "url": "/about"
      },
      {
        "_key": "contact",
        "label": "Contact",
        "url": "/contact"
      },
      {
        "_key": "services",
        "label": "Services",
        "url": "/services"
      }
    ]
  },
  {
    "_type": "navigation",
    "_id": "nav-footer",
    "navType": "footer",
    "items": [
      {
        "_key": "partners",
        "label": "Partners",
        "url": "/partners"
      },
      {
        "_key": "resources",
        "label": "Resources",
        "url": "/resources"
      }
    ]
  },
  {
    "_type": "navigation",
    "_id": "nav-legal",
    "navType": "legal",
    "items": [
      {
        "_key": "privacy-policy",
        "label": "Privacy Policy",
        "url": "/privacy-policy"
      },
      {
        "_key": "terms-and-conditions",
        "label": "Terms & Conditions",
        "url": "/terms-and-conditions"
      },
      {
        "_key": "accessibility",
        "label": "Accessibility Statement",
        "url": "/accessibility"
      }
    ]
  }
]

// Docs that should overwrite on re-seed (vs. only create when missing).
// Legal pages were renamed (title → pageTitle, body → bodyContent), so existing
// docs need their fields rewritten — createIfNotExists would leave stale fields.
const REPLACE_IDS = new Set<string>([
  'legal-privacy-policy',
  'legal-terms-and-conditions',
  'legal-accessibility',
  // Explore column trimmed to just Partners + Resources — overwrite the existing doc
  'footer-column-explore',
])

async function seed() {
  console.log(`Seeding ${documents.length} document(s)...`)
  const transaction = client.transaction()
  for (const doc of documents) {
    if (REPLACE_IDS.has(doc._id)) {
      transaction.createOrReplace(doc as any)
    } else {
      transaction.createIfNotExists(doc as any)
    }
  }
  await transaction.commit()
  console.log('Seed complete!')
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
