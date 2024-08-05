const fs = require('fs');
const path = require('path');

const urls = [
  { loc: 'https://indiajapanguide.com/', lastmod: '2024-07-01', priority: '1.0' },
  { loc: 'https://indiajapanguide.com/blogs', lastmod: '2024-07-15', priority: '0.8' },
  { loc: 'https://indiajapanguide.com/events', lastmod: '2024-07-20', priority: '0.8' },
  { loc: 'https://indiajapanguide.com/about', lastmod: '2024-07-20', priority: '0.8' },
  { loc: 'https://indiajapanguide.com/contact', lastmod: '2024-07-20', priority: '0.8' },
  
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(url => {
      return `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <priority>${url.priority}</priority>
      </url>
    `;
    })
    .join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap, 'utf8');
console.log('sitemap.xml generated');
