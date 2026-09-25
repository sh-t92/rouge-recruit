// Google Analytics 4
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
    transport_type: 'beacon'
  };

  if (href.indexOf('https://line.me/') === 0) {
    gtag('event', 'generate_lead', commonParams);
  } else if (href.indexOf('tel:') === 0) {
    gtag('event', 'click_to_call', commonParams);
  }
});
