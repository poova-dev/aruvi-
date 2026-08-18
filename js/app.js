// Aruvi Fabrics E-Commerce Application Engine

(function () {
  'use strict';

  // State Management
  const store = {
    cart: JSON.parse(localStorage.getItem('aruvi_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('aruvi_wishlist') || '[]'),
    activeProductDetail: null,
    selectedDetailColorIdx: 0,
    searchQuery: ''
  };

  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initBadges();
    initGlobalListeners();
    initPageSpecifics();
  });

  // Header Scroll Effect
  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('shadow-sm', 'bg-surface-bright/98');
      } else {
        header.classList.remove('shadow-sm');
      }
    });
  }

  // Update Badge Counts
  function initBadges() {
    const cartCount = store.cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    document.querySelectorAll('.cart-count-badge').forEach(badge => {
      badge.textContent = cartCount;
      if (cartCount > 0) badge.classList.remove('hidden');
      else badge.classList.add('hidden');
    });

    const wishlistCount = store.wishlist.length;
    document.querySelectorAll('.wishlist-count-badge').forEach(badge => {
      badge.textContent = wishlistCount;
      if (wishlistCount > 0) badge.classList.remove('hidden');
      else badge.classList.add('hidden');
    });
  }

  function initGlobalListeners() {
    // Search Modal
    document.querySelectorAll('.open-search-btn').forEach(btn => {
      btn.addEventListener('click', openSearchModal);
    });
    const closeSearch = document.getElementById('close-search-btn');
    if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    }

    // Quick View Modal Close
    const closeQuickView = document.getElementById('close-quickview-btn');
    if (closeQuickView) closeQuickView.addEventListener('click', closeQuickViewModal);

    // Modal Backdrops
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeSearchModal();
          closeQuickViewModal();
        }
      });
    });
  }

  // Color Swatch Variant Switcher on Product Cards
  window.switchProductCardColor = function (productId, colorIndex, element) {
    if (element) {
      const card = element.closest('.product-card');
      if (card) {
        const product = ARUVI_PRODUCTS.find(p => p.id === productId);
        if (!product || !product.colors[colorIndex]) return;

        const targetColor = product.colors[colorIndex];
        const imgEl = card.querySelector('.product-card-img');
        const colorNameEl = card.querySelector('.selected-color-label');

        // Apply Crossfade Transition
        if (imgEl) {
          imgEl.classList.add('swapping');
          setTimeout(() => {
            imgEl.src = targetColor.image;
            imgEl.classList.remove('swapping');
          }, 150);
        }

        if (colorNameEl) {
          colorNameEl.textContent = targetColor.name;
        }

        // Update Swatch Active State
        card.querySelectorAll('.color-swatch-btn').forEach((swatch, i) => {
          if (i === colorIndex) {
            swatch.classList.add('active');
          } else {
            swatch.classList.remove('active');
          }
        });

        // Store selected variant on card dataset
        card.setAttribute('data-selected-color', targetColor.name);
      }
    }
  };

  // Cart Operations
  window.addToCart = function (productId, colorName, quantity = 1) {
    const product = ARUVI_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const selectedColor = colorName || (product.colors[0] ? product.colors[0].name : 'Default');
    const existingIndex = store.cart.findIndex(item => item.productId === productId && item.colorName === selectedColor);

    if (existingIndex > -1) {
      store.cart[existingIndex].quantity += quantity;
    } else {
      store.cart.push({
        productId,
        colorName: selectedColor,
        quantity,
        price: product.price
      });
    }

    localStorage.setItem('aruvi_cart', JSON.stringify(store.cart));
    initBadges();
    showToast(`Added "${product.name}" (${selectedColor}) to Cart`);

    // If on Cart page, re-render
    if (window.location.pathname.includes('cart.html')) {
      renderCartPage();
    }
  };

  window.removeFromCart = function (index) {
    if (store.cart[index]) {
      const removed = store.cart.splice(index, 1);
      localStorage.setItem('aruvi_cart', JSON.stringify(store.cart));
      initBadges();
      showToast('Item removed from cart');
      if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
      }
    }
  };

  window.updateCartQuantity = function (index, delta) {
    if (store.cart[index]) {
      store.cart[index].quantity += delta;
      if (store.cart[index].quantity <= 0) {
        store.cart.splice(index, 1);
      }
      localStorage.setItem('aruvi_cart', JSON.stringify(store.cart));
      initBadges();
      if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
      }
    }
  };

  // Wishlist Operations
  window.toggleWishlist = function (productId) {
    const index = store.wishlist.indexOf(productId);
    const product = ARUVI_PRODUCTS.find(p => p.id === productId);

    if (index > -1) {
      store.wishlist.splice(index, 1);
      showToast('Removed from wishlist');
    } else {
      store.wishlist.push(productId);
      showToast(`Saved "${product ? product.name : 'fabric'}" to wishlist`);
    }

    localStorage.setItem('aruvi_wishlist', JSON.stringify(store.wishlist));
    initBadges();

    // Update heart icons on page
    document.querySelectorAll(`[data-wishlist-id="${productId}"]`).forEach(btn => {
      const isWishlisted = store.wishlist.includes(productId);
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.className = `material-symbols-outlined ${isWishlisted ? 'fill-icon text-accent' : ''}`;
        icon.textContent = isWishlisted ? 'favorite' : 'favorite_border';
      }
    });

    if (window.location.pathname.includes('wishlist.html')) {
      renderWishlistPage();
    }
  };

  // WhatsApp Enquiry Link Generator
  window.getWhatsAppProductUrl = function (product, colorName, quantity = 1) {
    const text = `Hi Aruvi Fabrics, I am interested in ordering "${product.name}" (${product.id}), Colour: ${colorName}, Qty: ${quantity} ${product.unit}(s). Please share availability and purchase details.`;
    return `https://wa.me/${ARUVI_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  window.getWhatsAppCartUrl = function () {
    if (store.cart.length === 0) return '#';
    let text = "Hi Aruvi Fabrics,\n\nI would like to enquire about ordering the following items from my cart:\n\n";
    let subtotal = 0;

    store.cart.forEach((item, i) => {
      const p = ARUVI_PRODUCTS.find(prod => prod.id === item.productId);
      if (p) {
        const itemTotal = p.price * item.quantity;
        subtotal += itemTotal;
        text += `${i + 1}. ${p.name} (${p.id})\n   Colour: ${item.colorName}\n   Qty: ${item.quantity} ${p.unit}(s) - ${ARUVI_CONFIG.currency}${itemTotal.toLocaleString()}\n\n`;
      }
    });

    text += `Estimated Subtotal: ${ARUVI_CONFIG.currency}${subtotal.toLocaleString()}\n\nPlease confirm availability and final payment details.`;
    return `https://wa.me/${ARUVI_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  // Quick View Modal
  window.openQuickView = function (productId) {
    const product = ARUVI_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickview-modal');
    const container = document.getElementById('quickview-content');

    if (modal && container) {
      let selectedColorIdx = 0;
      const initialColor = product.colors[0];

      container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="aspect-[4/5] bg-surface-container rounded overflow-hidden relative border border-hairline">
            <img id="qv-main-img" src="${initialColor.image}" alt="${product.name}" class="w-full h-full object-cover variant-img-fade" />
          </div>
          <div class="flex flex-col justify-between">
            <div>
              <span class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">${product.categoryLabel}</span>
              <h2 class="font-display-lg text-2xl font-bold text-primary mt-1 mb-2">${product.name}</h2>
              <p class="font-body-md text-sm text-on-surface-variant mb-4 leading-relaxed">${product.shortDescription}</p>
              <div class="text-2xl font-bold text-primary mb-6">${ARUVI_CONFIG.currency}${product.price.toLocaleString()} <span class="text-xs text-on-surface-variant font-normal">/ ${product.unit}</span></div>
              
              <!-- Color Selector -->
              <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-label-caps text-xs text-primary uppercase tracking-wider font-semibold">Colour: <span id="qv-color-name" class="font-normal text-on-surface-variant">${initialColor.name}</span></span>
                </div>
                <div class="flex gap-3">
                  ${product.colors.map((c, i) => `
                    <button onclick="window.switchQuickViewColor(${i})" 
                            class="qv-swatch-btn color-swatch-btn ${i === 0 ? 'active' : ''}" 
                            style="background-color: ${c.hex};" 
                            title="${c.name}"></button>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <button onclick="window.addToCart('${product.id}', '${initialColor.name}', 1); window.closeQuickViewModal();" 
                      class="bg-primary text-on-primary py-3.5 px-6 rounded uppercase font-label-caps text-xs tracking-widest font-semibold hover:bg-accent transition-colors">
                Add to Cart
              </button>
              <a id="qv-wa-link" href="${getWhatsAppProductUrl(product, initialColor.name, 1)}" target="_blank" 
                 class="border border-primary text-primary py-3 px-6 rounded uppercase font-label-caps text-xs tracking-widest font-semibold text-center hover:bg-surface-container transition-colors flex items-center justify-center gap-2">
                <i class="fa-brands fa-whatsapp text-base"></i> Enquire on WhatsApp
              </a>
              <a href="product.html?id=${product.id}" class="text-center font-label-caps text-xs text-secondary underline hover:text-primary mt-2">View Full Product Details →</a>
            </div>
          </div>
        </div>
      `;

      window.switchQuickViewColor = function (cIdx) {
        selectedColorIdx = cIdx;
        const color = product.colors[cIdx];
        const qvImg = document.getElementById('qv-main-img');
        const qvColorName = document.getElementById('qv-color-name');
        const qvWaLink = document.getElementById('qv-wa-link');

        if (qvImg) {
          qvImg.classList.add('swapping');
          setTimeout(() => {
            qvImg.src = color.image;
            qvImg.classList.remove('swapping');
          }, 150);
        }
        if (qvColorName) qvColorName.textContent = color.name;
        if (qvWaLink) qvWaLink.href = getWhatsAppProductUrl(product, color.name, 1);

        document.querySelectorAll('.qv-swatch-btn').forEach((btn, i) => {
          btn.classList.toggle('active', i === cIdx);
        });
      };

      modal.classList.add('open');
    }
  };

  function closeQuickViewModal() {
    const modal = document.getElementById('quickview-modal');
    if (modal) modal.classList.remove('open');
  }
  window.closeQuickViewModal = closeQuickViewModal;

  // Search Modal
  function openSearchModal() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');
    if (modal) {
      modal.classList.add('open');
      if (input) {
        input.value = '';
        input.focus();
        handleSearch('');
      }
    }
  }

  function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) modal.classList.remove('open');
  }

  function handleSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    const q = query.trim().toLowerCase();
    let matches = ARUVI_PRODUCTS;

    if (q) {
      matches = ARUVI_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.colors.some(c => c.name.toLowerCase().includes(q))
      );
    }

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<div class="text-center py-8 text-on-surface-variant">No matching fabrics found for "${query}"</div>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(product => `
      <div onclick="window.location.href='product.html?id=${product.id}'" 
           class="flex items-center gap-4 p-3 hover:bg-surface-container-low rounded cursor-pointer transition-colors border-b border-hairline">
        <img src="${product.colors[0].image}" alt="${product.name}" class="w-14 h-16 object-cover rounded border border-hairline" />
        <div class="flex-grow">
          <span class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">${product.categoryLabel}</span>
          <h4 class="font-headline-md text-base text-primary font-bold">${product.name}</h4>
          <div class="flex items-center gap-3 mt-1">
            <span class="font-body-md text-xs font-semibold text-primary">${ARUVI_CONFIG.currency}${product.price.toLocaleString()} / ${product.unit}</span>
            <div class="flex gap-1">
              ${product.colors.map(c => `<span class="w-2.5 h-2.5 rounded-full" style="background-color: ${c.hex};" title="${c.name}"></span>`).join('')}
            </div>
          </div>
        </div>
        <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
      </div>
    `).join('');
  }

  // Toast System
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="material-symbols-outlined text-accent text-base">check_circle</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Page Specific Inits
  function initPageSpecifics() {
    const page = window.location.pathname.split('/').pop();

    if (page === 'cart.html') {
      renderCartPage();
    } else if (page === 'wishlist.html') {
      renderWishlistPage();
    } else if (page === 'product.html') {
      initProductDetailPage();
    } else if (page === 'shop.html' || page === 'collection.html') {
      initShopCatalogPage();
    }
  }

  // Render Cart Page
  function renderCartPage() {
    const container = document.getElementById('cart-items-list');
    const summaryContainer = document.getElementById('cart-summary');
    if (!container) return;

    if (store.cart.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 bg-surface-bright rounded border border-hairline p-8">
          <span class="material-symbols-outlined text-5xl text-outline mb-3">shopping_bag</span>
          <h2 class="font-headline-md text-2xl font-bold mb-2">Your Shopping Cart is Empty</h2>
          <p class="font-body-md text-on-surface-variant mb-6">Explore our pure silks and heritage cotton collections.</p>
          <a href="shop.html" class="inline-block bg-primary text-on-primary px-8 py-3.5 rounded font-label-caps text-xs uppercase tracking-widest hover:bg-accent transition-colors">Start Shopping</a>
        </div>
      `;
      if (summaryContainer) summaryContainer.innerHTML = '';
      return;
    }

    let subtotal = 0;

    container.innerHTML = store.cart.map((item, index) => {
      const product = ARUVI_PRODUCTS.find(p => p.id === item.productId);
      if (!product) return '';

      const colorVariant = product.colors.find(c => c.name === item.colorName) || product.colors[0];
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      return `
        <div class="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between p-4 bg-surface-bright rounded border border-hairline mb-4">
          <div class="flex gap-4 items-center">
            <img src="${colorVariant.image}" alt="${product.name}" class="w-20 h-24 object-cover rounded border border-hairline" />
            <div>
              <span class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">${product.categoryLabel}</span>
              <h3 class="font-headline-md text-lg font-bold text-primary"><a href="product.html?id=${product.id}" class="hover:text-accent">${product.name}</a></h3>
              <p class="font-body-md text-xs text-on-surface-variant mb-2">Selected Colour: <span class="font-semibold text-primary">${item.colorName}</span></p>
              <div class="text-sm font-bold text-primary">${ARUVI_CONFIG.currency}${product.price.toLocaleString()} / ${product.unit}</div>
            </div>
          </div>

          <div class="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <!-- Quantity Control -->
            <div class="flex items-center border border-hairline rounded bg-surface-container-low">
              <button onclick="window.updateCartQuantity(${index}, -1)" class="px-3 py-1.5 text-primary hover:bg-surface-container font-bold">-</button>
              <span class="px-4 py-1.5 font-bold text-sm text-primary">${item.quantity}</span>
              <button onclick="window.updateCartQuantity(${index}, 1)" class="px-3 py-1.5 text-primary hover:bg-surface-container font-bold">+</button>
            </div>

            <div class="text-right">
              <div class="font-bold text-base text-primary">${ARUVI_CONFIG.currency}${itemTotal.toLocaleString()}</div>
              <button onclick="window.removeFromCart(${index})" class="text-xs text-error hover:underline mt-1">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div class="bg-surface-container-low p-6 rounded border border-hairline flex flex-col gap-4">
          <h3 class="font-headline-md text-xl font-bold border-b border-hairline pb-3">Order Summary</h3>
          <div class="flex justify-between font-body-md text-sm text-on-surface-variant">
            <span>Items Subtotal</span>
            <span class="font-semibold text-primary">${ARUVI_CONFIG.currency}${subtotal.toLocaleString()}</span>
          </div>
          <div class="flex justify-between font-body-md text-sm text-on-surface-variant">
            <span>Shipping / Delivery</span>
            <span class="font-semibold text-accent">Calculated on WhatsApp</span>
          </div>
          <div class="border-t border-hairline pt-3 flex justify-between font-headline-md text-xl font-bold text-primary">
            <span>Estimated Total</span>
            <span>${ARUVI_CONFIG.currency}${subtotal.toLocaleString()}</span>
          </div>
          <a href="${getWhatsAppCartUrl()}" target="_blank" 
             class="bg-accent text-white py-4 px-6 rounded uppercase font-label-caps text-xs tracking-widest font-semibold text-center hover:bg-primary transition-all flex items-center justify-center gap-2 mt-2 shadow-md">
            <i class="fa-brands fa-whatsapp text-lg"></i> Send Order Enquiry on WhatsApp
          </a>
          <p class="text-[11px] text-on-surface-variant text-center leading-relaxed">Direct WhatsApp order enquiry connects you with Aruvi Fabrics styling advisors to confirm fabric availability and fast dispatch.</p>
        </div>
      `;
    }
  }

  // Render Wishlist Page
  function renderWishlistPage() {
    const container = document.getElementById('wishlist-grid');
    if (!container) return;

    if (store.wishlist.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16 bg-surface-bright rounded border border-hairline p-8">
          <span class="material-symbols-outlined text-5xl text-outline mb-3">favorite_border</span>
          <h2 class="font-headline-md text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
          <p class="font-body-md text-on-surface-variant mb-6">Explore our collections and click the heart icon to save your favourites.</p>
          <a href="shop.html" class="inline-block bg-primary text-on-primary px-8 py-3.5 rounded font-label-caps text-xs uppercase tracking-widest hover:bg-accent transition-colors">Browse Products</a>
        </div>
      `;
      return;
    }

    const items = store.wishlist.map(id => ARUVI_PRODUCTS.find(p => p.id === id)).filter(Boolean);

    container.innerHTML = items.map(product => {
      const firstColor = product.colors[0];
      return `
        <div class="product-card bg-surface-bright rounded border border-hairline overflow-hidden flex flex-col group" data-product-id="${product.id}">
          <div class="aspect-[3/4] relative overflow-hidden bg-surface-container">
            <img src="${firstColor.image}" alt="${product.name}" class="product-card-img w-full h-full object-cover variant-img-fade group-hover:scale-105 transition-transform duration-700" />
            <button onclick="window.toggleWishlist('${product.id}')" 
                    data-wishlist-id="${product.id}" 
                    class="absolute top-3 right-3 bg-surface/80 backdrop-blur-md p-2 rounded-full text-accent shadow-sm hover:bg-surface transition-all">
              <span class="material-symbols-outlined fill-icon">favorite</span>
            </button>
          </div>
          <div class="p-4 flex flex-col flex-grow justify-between">
            <div>
              <span class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">${product.categoryLabel}</span>
              <h3 class="font-headline-md text-base font-bold text-primary group-hover:text-accent transition-colors">
                <a href="product.html?id=${product.id}">${product.name}</a>
              </h3>
              <div class="font-body-md text-sm font-bold text-primary mt-1 mb-3">${ARUVI_CONFIG.currency}${product.price.toLocaleString()} / ${product.unit}</div>
            </div>
            <div class="flex gap-2">
              <button onclick="window.addToCart('${product.id}', '${firstColor.name}', 1)" class="flex-1 bg-primary text-on-primary py-2.5 px-3 rounded font-label-caps text-[11px] uppercase tracking-wider hover:bg-accent transition-colors">Add to Cart</button>
              <a href="${getWhatsAppProductUrl(product, firstColor.name, 1)}" target="_blank" class="border border-hairline p-2.5 rounded text-primary hover:bg-surface-container flex items-center justify-center">
                <i class="fa-brands fa-whatsapp text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Product Detail Page Init
  function initProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'ARV-001';
    const product = ARUVI_PRODUCTS.find(p => p.id === productId) || ARUVI_PRODUCTS[0];

    store.activeProductDetail = product;
    store.selectedDetailColorIdx = 0;

    // Populate Page Elements
    const titleEl = document.getElementById('pd-page-title');
    const catEl = document.getElementById('pd-page-category');
    const priceEl = document.getElementById('pd-page-price');
    const descEl = document.getElementById('pd-page-description');
    const mainImgEl = document.getElementById('pd-page-main-img');
    const thumbnailsContainer = document.getElementById('pd-page-thumbnails');
    const swatchesContainer = document.getElementById('pd-page-swatches');
    const colorNameEl = document.getElementById('pd-page-color-name');
    const specsContainer = document.getElementById('pd-page-specs');
    const waBtn = document.getElementById('pd-page-wa-btn');
    const cartBtn = document.getElementById('pd-page-cart-btn');
    const wishlistBtn = document.getElementById('pd-page-wishlist-btn');

    if (titleEl) titleEl.textContent = product.name;
    if (catEl) catEl.textContent = product.categoryLabel;
    if (priceEl) priceEl.textContent = `${ARUVI_CONFIG.currency}${product.price.toLocaleString()}`;
    if (descEl) descEl.textContent = product.fullDescription;

    const initialColor = product.colors[0];
    if (mainImgEl) {
      mainImgEl.src = initialColor.image;
      mainImgEl.alt = product.name;
    }
    if (colorNameEl) colorNameEl.textContent = initialColor.name;

    // Render Gallery Thumbnails
    if (thumbnailsContainer) {
      thumbnailsContainer.innerHTML = product.gallery.map((img, i) => `
        <div onclick="document.getElementById('pd-page-main-img').src='${img}'" 
             class="aspect-square bg-surface-container rounded overflow-hidden border border-hairline cursor-pointer hover:opacity-80 transition-opacity">
          <img src="${img}" alt="${product.name} preview ${i + 1}" class="w-full h-full object-cover" />
        </div>
      `).join('');
    }

    // Render Color Swatches
    if (swatchesContainer) {
      swatchesContainer.innerHTML = product.colors.map((c, i) => `
        <button onclick="window.switchDetailColor(${i})" 
                class="pd-swatch-btn color-swatch-btn ${i === 0 ? 'active' : ''}" 
                style="background-color: ${c.hex};" 
                title="${c.name}"></button>
      `).join('');
    }

    window.switchDetailColor = function (colorIndex) {
      store.selectedDetailColorIdx = colorIndex;
      const color = product.colors[colorIndex];

      if (mainImgEl) {
        mainImgEl.classList.add('swapping');
        setTimeout(() => {
          mainImgEl.src = color.image;
          mainImgEl.classList.remove('swapping');
        }, 150);
      }
      if (colorNameEl) colorNameEl.textContent = color.name;
      if (waBtn) waBtn.href = getWhatsAppProductUrl(product, color.name, 1);

      document.querySelectorAll('.pd-swatch-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === colorIndex);
      });
    };

    // Render Specs
    if (specsContainer && product.specs) {
      specsContainer.innerHTML = `
        <li class="flex justify-between py-3 border-b border-hairline"><span class="text-on-surface-variant">Width</span><span class="font-semibold text-primary">${product.specs.width}</span></li>
        <li class="flex justify-between py-3 border-b border-hairline"><span class="text-on-surface-variant">Weight (GSM)</span><span class="font-semibold text-primary">${product.specs.gsm}</span></li>
        <li class="flex justify-between py-3 border-b border-hairline"><span class="text-on-surface-variant">Feel</span><span class="font-semibold text-primary">${product.specs.feel}</span></li>
        <li class="flex justify-between py-3 border-b border-hairline"><span class="text-on-surface-variant">Care</span><span class="font-semibold text-primary">${product.specs.care}</span></li>
        <li class="flex justify-between py-3 border-b border-hairline"><span class="text-on-surface-variant">Origin</span><span class="font-semibold text-primary">${product.specs.origin}</span></li>
      `;
    }

    // Add to Cart Action
    if (cartBtn) {
      cartBtn.onclick = () => {
        const selectedColor = product.colors[store.selectedDetailColorIdx].name;
        addToCart(product.id, selectedColor, 1);
      };
    }

    // WhatsApp Action
    if (waBtn) {
      waBtn.href = getWhatsAppProductUrl(product, initialColor.name, 1);
    }

    // Wishlist Action
    if (wishlistBtn) {
      wishlistBtn.onclick = () => toggleWishlist(product.id);
    }
  }

  // Shop Catalog Page Init
  function initShopCatalogPage() {
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;

    let activeCategory = 'all';

    function renderCatalog() {
      let filtered = ARUVI_PRODUCTS;
      if (activeCategory !== 'all') {
        filtered = ARUVI_PRODUCTS.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
      }

      grid.innerHTML = filtered.map(product => {
        const isWishlisted = store.wishlist.includes(product.id);
        const defaultColor = product.colors[0];

        return `
          <article class="product-card flex flex-col bg-surface-bright border border-hairline rounded overflow-hidden group hover:shadow-diffused transition-all duration-500" data-product-id="${product.id}" data-selected-color="${defaultColor.name}">
            <div class="w-full aspect-[3/4] relative bg-surface-container overflow-hidden">
              <img class="product-card-img w-full h-full object-cover variant-img-fade group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                   src="${defaultColor.image}" alt="${product.name}" loading="lazy" />
              
              ${product.newArrival ? `<span class="absolute top-3 left-3 bg-primary text-on-primary font-label-caps text-[10px] px-2.5 py-1 uppercase tracking-widest">New</span>` : ''}
              
              <button onclick="window.toggleWishlist('${product.id}')" 
                      data-wishlist-id="${product.id}" 
                      class="absolute top-3 right-3 bg-surface/80 backdrop-blur-md p-2 rounded-full text-primary hover:bg-surface transition-all shadow-sm">
                <span class="material-symbols-outlined ${isWishlisted ? 'fill-icon text-accent' : ''}">${isWishlisted ? 'favorite' : 'favorite_border'}</span>
              </button>

              <button onclick="window.openQuickView('${product.id}')" 
                      class="absolute bottom-3 left-3 right-3 bg-surface/90 backdrop-blur-md py-2.5 rounded font-label-caps text-[11px] uppercase tracking-widest text-primary hover:bg-primary hover:text-on-primary transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 text-center">
                Quick View
              </button>
            </div>

            <div class="p-4 flex flex-col flex-grow justify-between">
              <div>
                <span class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">${product.categoryLabel}</span>
                <h3 class="font-headline-md text-base font-bold text-primary group-hover:text-accent transition-colors mt-0.5">
                  <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="font-body-md text-sm font-bold text-primary mt-1 mb-3">${ARUVI_CONFIG.currency}${product.price.toLocaleString()} / ${product.unit}</div>
              </div>

              <!-- Multi-Color Swatch Selector -->
              <div class="flex items-center justify-between border-t border-hairline pt-3">
                <span class="selected-color-label font-label-caps text-[10px] text-on-surface-variant">${defaultColor.name}</span>
                <div class="flex gap-2">
                  ${product.colors.map((c, idx) => `
                    <button onclick="window.switchProductCardColor('${product.id}', ${idx}, this)" 
                            class="color-swatch-btn ${idx === 0 ? 'active' : ''}" 
                            style="background-color: ${c.hex};" 
                            title="${c.name}"></button>
                  `).join('')}
                </div>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    renderCatalog();

    // Category Filter Buttons
    document.querySelectorAll('.shop-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeCategory = e.currentTarget.getAttribute('data-category');
        document.querySelectorAll('.shop-filter-btn').forEach(b => b.classList.remove('font-bold', 'border-b-2', 'border-primary'));
        e.currentTarget.classList.add('font-bold', 'border-b-2', 'border-primary');
        renderCatalog();
      });
    });
  }

})();
