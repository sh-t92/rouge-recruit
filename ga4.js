// Google Analytics 4
var conversionStyles = document.createElement('link');
conversionStyles.rel = 'stylesheet';
conversionStyles.href = 'conversion.css';
document.head.appendChild(conversionStyles);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-09QZRMTLVK');

// Keep the original campaign information while visitors move between pages.
var attributionKey = 'rouge_recruit_attribution';
var query = new URLSearchParams(window.location.search);
var savedAttribution = {};
try {
  savedAttribution = JSON.parse(sessionStorage.getItem(attributionKey) || '{}');
} catch (error) {
  savedAttribution = {};
}

var currentAttribution = {
  utm_source: query.get('utm_source') || savedAttribution.utm_source || '(direct)',
  utm_medium: query.get('utm_medium') || savedAttribution.utm_medium || '(none)',
  utm_campaign: query.get('utm_campaign') || savedAttribution.utm_campaign || '(not set)',
  utm_content: query.get('utm_content') || savedAttribution.utm_content || '(not set)',
  landing_page: savedAttribution.landing_page || window.location.pathname,
  first_referrer: savedAttribution.first_referrer || document.referrer || '(direct)'
};

try {
  sessionStorage.setItem(attributionKey, JSON.stringify(currentAttribution));
} catch (error) {
  // Measurement still works if browser storage is unavailable.
}

// Measure recruitment actions consistently across every page.
document.addEventListener('click', function(event) {
  var link = event.target.closest('a[href]');
  if (!link) return;

  var href = link.getAttribute('href') || '';
  var commonParams = {
    cta_location: link.dataset.cta || window.location.pathname,
    cta_text: (link.textContent || '').trim(),
    page_path: window.location.pathname,
    link_url: href,
    utm_source: currentAttribution.utm_source,
    utm_medium: currentAttribution.utm_medium,
    utm_campaign: currentAttribution.utm_campaign,
    utm_content: currentAttribution.utm_content,
    landing_page: currentAttribution.landing_page,
    first_referrer: currentAttribution.first_referrer,
    transport_type: 'beacon'
  };

  if (href.indexOf('https://line.me/') === 0) {
    gtag('event', 'generate_lead', commonParams);
  } else if (href.indexOf('tel:') === 0) {
    gtag('event', 'click_to_call', commonParams);
  }
});

// Keep the application route visible on mobile, including direct SEO-page visits.
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.mobile-entry-bar')) return;

  var bar = document.createElement('aside');
  bar.className = 'mobile-entry-bar';
  bar.setAttribute('aria-label', '女性ホステス求人への応募');
  bar.innerHTML = '<span>女性ホステス募集<br><small>「求人を見た」で相談OK</small></span><a data-cta="line-mobile-fixed" href="https://line.me/ti/p/MGM9CfKDj5">LINEで相談</a>';
  document.body.appendChild(bar);
});
