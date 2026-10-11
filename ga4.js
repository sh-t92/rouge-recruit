// Google Analytics 4
var conversionStyles = document.createElement('link');
conversionStyles.rel = 'stylesheet';
conversionStyles.href = 'conversion.css';
document.head.appendChild(conversionStyles);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-09QZRMTLVK');

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
    utm_source: new URLSearchParams(window.location.search).get('utm_source') || '(not set)',
    utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '(not set)',
    utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '(not set)',
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
