// Seed script — pre-populate Sanity with initial content
// Run: npx sanity exec seed.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const documents = [
  {
    "_type": "siteSettings",
    "_id": "siteSettings",
    "siteName": "Advocate Of Shalom",
    "ctaLabel": "Get Started",
    "ctaUrl": "/contact",
    "contactEmail": "eparker@advocateofshalom.net",
    "contactPhone": "",
    "contactAddress": "",
    "copyrightText": "© 2026 Advocate Of Shalom. All rights reserved."
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
        "title": "Advocate Of Shalom",
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
        "_key": "featureGrid-2"
      },
      {
        "_type": "processSteps",
        "_key": "processSteps-3"
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
    "_type": "page",
    "_id": "page-about",
    "title": "About",
    "slug": {
      "_type": "slug",
      "current": "/about"
    },
    "sections": [
      {
        "_type": "heroSection",
        "_key": "heroSection-0"
      },
      {
        "_type": "textContent",
        "_key": "textContent-1"
      },
      {
        "_type": "splitSection",
        "_key": "splitSection-2"
      },
      {
        "_type": "teamProjectsSection",
        "_key": "teamProjectsSection-3"
      },
      {
        "_type": "pricingCtaSection",
        "_key": "pricingCtaSection-4"
      }
    ]
  },
  {
    "_type": "page",
    "_id": "page-contact",
    "title": "Contact",
    "slug": {
      "_type": "slug",
      "current": "/contact"
    },
    "sections": [
      {
        "_type": "textContent",
        "_key": "textContent-0"
      },
      {
        "_type": "contactSection",
        "_key": "contactSection-1",
        "email": "eparker@advocateofshalom.net"
      }
    ]
  },
  {
    "_type": "page",
    "_id": "page-services",
    "title": "Services",
    "slug": {
      "_type": "slug",
      "current": "/services"
    },
    "sections": [
      {
        "_type": "heroSection",
        "_key": "heroSection-0"
      },
      {
        "_type": "textContent",
        "_key": "textContent-1"
      },
      {
        "_type": "featureGrid",
        "_key": "featureGrid-2"
      },
      {
        "_type": "processSteps",
        "_key": "processSteps-3"
      },
      {
        "_type": "faqSection",
        "_key": "faqSection-4"
      },
      {
        "_type": "pricingCtaSection",
        "_key": "pricingCtaSection-5"
      }
    ]
  },
  {
    "_type": "page",
    "_id": "page-partners",
    "title": "Partners",
    "slug": {
      "_type": "slug",
      "current": "/partners"
    },
    "sections": [
      {
        "_type": "heroSection",
        "_key": "heroSection-0"
      },
      {
        "_type": "textContent",
        "_key": "textContent-1"
      },
      {
        "_type": "featureGrid",
        "_key": "featureGrid-2"
      },
      {
        "_type": "splitSection",
        "_key": "splitSection-3"
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
    "_type": "page",
    "_id": "page-resources",
    "title": "Resources",
    "slug": {
      "_type": "slug",
      "current": "/resources"
    },
    "sections": [
      {
        "_type": "heroSection",
        "_key": "heroSection-0"
      },
      {
        "_type": "textContent",
        "_key": "textContent-1"
      },
      {
        "_type": "featureGrid",
        "_key": "featureGrid-2"
      },
      {
        "_type": "splitSection",
        "_key": "splitSection-3"
      },
      {
        "_type": "pricingCtaSection",
        "_key": "pricingCtaSection-4"
      }
    ]
  },
  {
    "_type": "legalPage",
    "_id": "legal-privacy-policy",
    "title": "Privacy Policy",
    "slug": {
      "_type": "slug",
      "current": "/privacy-policy"
    }
  },
  {
    "_type": "legalPage",
    "_id": "legal-terms-and-conditions",
    "title": "Terms & Conditions",
    "slug": {
      "_type": "slug",
      "current": "/terms-and-conditions"
    }
  },
  {
    "_type": "legalPage",
    "_id": "legal-accessibility",
    "title": "Accessibility Statement",
    "slug": {
      "_type": "slug",
      "current": "/accessibility"
    }
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

async function seed() {
  console.log(`Seeding ${documents.length} document(s)...`)
  const transaction = client.transaction()
  for (const doc of documents) {
    transaction.createIfNotExists(doc)
  }
  await transaction.commit()
  console.log('Seed complete!')
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
