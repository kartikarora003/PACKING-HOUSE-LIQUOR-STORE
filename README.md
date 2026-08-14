# Packing House Liquor Store — Website

Multi-page website for **Packing House Liquor Store** in Kelowna, BC.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, quick links, delivery banner, Instagram, reviews |
| Flyers | `flyers.html` | Weekly specials & promotional flyers |
| Delivery | `delivery.html` | DoorDash & Uber Eats ordering |
| Contact | `contact.html` | Contact form, map, hours, Google reviews |

## Quick Start

Open `index.html` in your browser — no build step required.

## Customize

Edit **`config.js`** to update store info across all pages:

- Phone, email, address, hours
- Instagram & social links
- DoorDash & Uber Eats store URLs
- Google Maps / reviews links
- Flyer images & titles

### Adding Flyers

1. Save flyer images to `images/flyers/` (e.g. `flyer-1.jpg`)
2. Add entries to the `flyers` array in `config.js`

### Delivery Links

Replace the DoorDash and Uber Eats URLs in `config.js` with your exact store page links from each app.

### Google Reviews

Update `googleReviewsUrl` in `config.js` with your direct Google Business Profile link for accurate review links.

## Deploy

Upload the entire folder to Netlify, GitHub Pages, or Cloudflare Pages.
