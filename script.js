/* =========================================================
   Arkadia Travel — Interactive Application Engine
   ========================================================= */

(function () {
    'use strict';

    const DATA = window.ARKADIA_DATA;
    const STORAGE_KEYS = {
        SAVED: 'arkadia_saved_destinations_v1',
        BOOKINGS: 'arkadia_bookings_v1',
        NEWSLETTER: 'arkadia_newsletter_v1'
    };

    // --- State Helpers ---
    const getSaved = () => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED)) || []; }
        catch { return []; }
    };

    const setSaved = (list) => {
        localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(list));
        updateTripsBadges();
    };

    const getBookings = () => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || []; }
        catch { return []; }
    };

    const saveBookingRecord = (booking) => {
        const list = getBookings();
        list.unshift(booking);
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
        updateTripsBadges();
    };

    const removeBookingRecord = (ref) => {
        const list = getBookings().filter(b => b.ref !== ref);
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
        updateTripsBadges();
    };

    const formatCurrency = (amount) => {
        return '$' + Math.round(Number(amount) || 0).toLocaleString('en-US');
    };

    // --- Toast System ---
    function showToast(message) {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.25s ease';
            setTimeout(() => toast.remove(), 260);
        }, 3400);
    }

    // --- Icons Helper ---
    const ICONS = {
        star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
        heart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
        heartFill: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
        pin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
        close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        chevron: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'
    };

    // --- Global Navigation, Mobile Drawer, Scroll Top ---
    function initGlobalChrome() {
        const header = document.querySelector('.main-header');
        const menuToggle = document.getElementById('menuToggle');
        const mobileDrawer = document.getElementById('mobileDrawer');
        const closeDrawer = document.getElementById('closeMobileDrawer');
        const backdrop = document.getElementById('navBackdrop');

        // Active Nav Highlight
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.main-nav a, .mobile-drawer-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentFile || (currentFile === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Header scroll effect + Scroll-to-top button
        let scrollBtn = document.getElementById('scrollTopBtn');
        if (!scrollBtn) {
            scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollTopBtn';
            scrollBtn.className = 'scroll-top-btn';
            scrollBtn.setAttribute('aria-label', 'Back to top');
            scrollBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="18 15 12 9 6 15"/></svg>';
            document.body.appendChild(scrollBtn);
            scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }

        const handleScroll = () => {
            if (header) header.classList.toggle('scrolled', window.scrollY > 18);
            scrollBtn.classList.toggle('visible', window.scrollY > 420);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        // Mobile Drawer
        const closeAllDrawers = () => {
            mobileDrawer?.classList.remove('open');
            document.getElementById('tripsDrawer')?.classList.remove('open');
            backdrop?.classList.remove('open');
            document.body.classList.remove('no-scroll');
        };

        menuToggle?.addEventListener('click', () => {
            mobileDrawer?.classList.add('open');
            backdrop?.classList.add('open');
            document.body.classList.add('no-scroll');
        });

        closeDrawer?.addEventListener('click', closeAllDrawers);
        backdrop?.addEventListener('click', closeAllDrawers);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllDrawers();
                closeActiveModal();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 860 && mobileDrawer?.classList.contains('open')) {
                closeAllDrawers();
            }
        });

        // Inject Global Modals & My Trips Drawer if not already in DOM
        injectGlobalOverlays(closeAllDrawers);

        // Open Trips Drawer Triggers
        document.querySelectorAll('[data-open-trips]').forEach(btn => {
            btn.addEventListener('click', () => {
                mobileDrawer?.classList.remove('open');
                openTripsDrawer();
            });
        });

        // Legal Footer Modal Triggers
        document.querySelectorAll('[data-legal]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openLegalModal(btn.getAttribute('data-legal'));
            });
        });

        // Newsletter Form (if present)
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                if (!email || !email.includes('@')) {
                    showToast('Please enter a valid email address.');
                    return;
                }
                localStorage.setItem(STORAGE_KEYS.NEWSLETTER, email);
                newsletterForm.reset();
                showToast('Welcome to Arkadia Insider! Check your inbox for 10% off (code: ARKADIA10).');
            });
        }

        // Scroll reveal observer
        const reveals = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window && reveals.length) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            reveals.forEach(el => obs.observe(el));
        } else {
            reveals.forEach(el => el.classList.add('is-visible'));
        }

        updateTripsBadges();
    }

    function injectGlobalOverlays(closeAllDrawers) {
        if (!document.getElementById('navBackdrop')) {
            const bd = document.createElement('div');
            bd.id = 'navBackdrop';
            bd.className = 'nav-backdrop';
            bd.addEventListener('click', closeAllDrawers);
            document.body.appendChild(bd);
        }

        if (!document.getElementById('tripsDrawer')) {
            const drawer = document.createElement('aside');
            drawer.id = 'tripsDrawer';
            drawer.className = 'trips-drawer';
            drawer.innerHTML = `
                <div class="trips-drawer-header">
                    <div>
                        <h3 style="font-size:21px;">My Trips & Saved</h3>
                        <p style="font-size:12.5px;color:var(--ink-500);">Your bookings and saved escapes</p>
                    </div>
                    <button type="button" class="icon-close-btn" id="closeTripsDrawer" aria-label="Close trips drawer">${ICONS.close}</button>
                </div>
                <div class="trips-drawer-tabs">
                    <button type="button" class="drawer-tab active" data-trips-tab="bookings">Booked Trips (<span id="tabBookingsCount">0</span>)</button>
                    <button type="button" class="drawer-tab" data-trips-tab="saved">Saved (<span id="tabSavedCount">0</span>)</button>
                </div>
                <div class="trips-drawer-body" id="tripsDrawerBody"></div>
            `;
            document.body.appendChild(drawer);

            drawer.querySelector('#closeTripsDrawer').addEventListener('click', closeAllDrawers);
            drawer.querySelectorAll('[data-trips-tab]').forEach(tab => {
                tab.addEventListener('click', () => {
                    drawer.querySelectorAll('[data-trips-tab]').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    renderTripsDrawer(tab.getAttribute('data-trips-tab'));
                });
            });
        }

        if (!document.getElementById('globalModal')) {
            const modal = document.createElement('div');
            modal.id = 'globalModal';
            modal.className = 'modal-overlay';
            modal.innerHTML = `<div class="modal-box" id="globalModalBox"></div>`;
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeActiveModal();
            });
            document.body.appendChild(modal);
        }
    }

    function updateTripsBadges() {
        const count = getBookings().length + getSaved().length;
        document.querySelectorAll('.trips-badge').forEach(badge => {
            badge.textContent = count;
            badge.classList.toggle('is-zero', count === 0);
        });
        const bc = document.getElementById('tabBookingsCount');
        const sc = document.getElementById('tabSavedCount');
        if (bc) bc.textContent = getBookings().length;
        if (sc) sc.textContent = getSaved().length;
    }

    function openTripsDrawer(initialTab) {
        const drawer = document.getElementById('tripsDrawer');
        const backdrop = document.getElementById('navBackdrop');
        if (!drawer) return;
        const tabToOpen = initialTab || (getBookings().length > 0 ? 'bookings' : 'saved');
        drawer.querySelectorAll('[data-trips-tab]').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-trips-tab') === tabToOpen);
        });
        renderTripsDrawer(tabToOpen);
        drawer.classList.add('open');
        backdrop?.classList.add('open');
        document.body.classList.add('no-scroll');
    }

    function renderTripsDrawer(tab) {
        const body = document.getElementById('tripsDrawerBody');
        if (!body) return;
        updateTripsBadges();

        if (tab === 'bookings') {
            const bookings = getBookings();
            if (!bookings.length) {
                body.innerHTML = `
                    <div class="empty-state" style="padding:36px 18px;">
                        <h3 style="font-size:20px;">No Booked Trips Yet</h3>
                        <p style="font-size:13.5px;">Once you complete a reservation, your itinerary and booking reference will appear right here.</p>
                        <a href="destinations.html" class="btn btn--primary btn--sm">Explore Destinations</a>
                    </div>
                `;
                return;
            }
            body.innerHTML = bookings.map(b => `
                <div class="trip-item-card">
                    <div class="trip-item-top">
                        <span class="trip-ref">${b.ref}</span>
                        <span class="trip-status">● Confirmed</span>
                    </div>
                    <h4 style="font-size:17px;margin-bottom:3px;">${b.destinationName}</h4>
                    <p style="font-size:13px;color:var(--ink-500);margin-bottom:10px;">${b.packageName} · ${b.durationLabel}</p>
                    <div style="font-size:13px;color:var(--ink-700);display:flex;justify-content:space-between;margin-bottom:12px;">
                        <span>Start: <strong>${b.startDate}</strong></span>
                        <span>Total: <strong>${formatCurrency(b.total)}</strong></span>
                    </div>
                    <div style="display:flex;gap:8px;">
                        <button type="button" class="btn btn--outline btn--sm" style="flex:1;" data-view-receipt="${b.ref}">View Receipt</button>
                        <button type="button" class="btn btn--outline btn--sm" style="color:var(--danger);border-color:#f3c6c6;" data-cancel-booking="${b.ref}">Cancel</button>
                    </div>
                </div>
            `).join('');

            body.querySelectorAll('[data-view-receipt]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const rec = getBookings().find(x => x.ref === btn.getAttribute('data-view-receipt'));
                    if (rec) openReceiptModal(rec);
                });
            });
            body.querySelectorAll('[data-cancel-booking]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const ref = btn.getAttribute('data-cancel-booking');
                    removeBookingRecord(ref);
                    renderTripsDrawer('bookings');
                    showToast(`Reservation ${ref} cancelled. Refund initiated.`);
                });
            });
        } else {
            const savedIds = getSaved();
            const items = DATA.destinations.filter(d => savedIds.includes(d.id));
            if (!items.length) {
                body.innerHTML = `
                    <div class="empty-state" style="padding:36px 18px;">
                        <h3 style="font-size:20px;">Your Wishlist is Empty</h3>
                        <p style="font-size:13.5px;">Tap the heart icon on any destination to save it for later comparison.</p>
                        <a href="destinations.html" class="btn btn--primary btn--sm">Browse Escapes</a>
                    </div>
                `;
                return;
            }
            body.innerHTML = items.map(d => `
                <div class="trip-item-card" style="display:flex;gap:12px;align-items:center;">
                    <img src="${d.image}" alt="${d.name}" style="width:74px;height:74px;border-radius:10px;object-fit:cover;flex-shrink:0;">
                    <div style="flex:1;min-width:0;">
                        <h4 style="font-size:16px;margin-bottom:2px;">${d.country} — ${d.name}</h4>
                        <p style="font-size:12.5px;color:var(--ink-500);margin-bottom:8px;">From ${formatCurrency(d.durations[0].price)} / person</p>
                        <div style="display:flex;gap:8px;">
                            <a href="booking.html?destination=${d.id}" class="btn btn--primary btn--sm" style="padding:6px 12px;font-size:12.5px;">Book</a>
                            <button type="button" class="btn btn--outline btn--sm" style="padding:6px 12px;font-size:12.5px;" data-remove-saved="${d.id}">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');

            body.querySelectorAll('[data-remove-saved]').forEach(btn => {
                btn.addEventListener('click', () => {
                    toggleWishlist(btn.getAttribute('data-remove-saved'));
                    renderTripsDrawer('saved');
                });
            });
        }
    }

    function openModal(html) {
        const modal = document.getElementById('globalModal');
        const box = document.getElementById('globalModalBox');
        if (!modal || !box) return;
        box.innerHTML = html;
        modal.classList.add('open');
        document.body.classList.add('no-scroll');
        box.querySelectorAll('[data-close-modal]').forEach(btn => {
            btn.addEventListener('click', closeActiveModal);
        });
    }

    function closeActiveModal() {
        const modal = document.getElementById('globalModal');
        if (modal) modal.classList.remove('open');
        const drawerOpen = document.getElementById('tripsDrawer')?.classList.contains('open') ||
            document.getElementById('mobileDrawer')?.classList.contains('open');
        if (!drawerOpen) document.body.classList.remove('no-scroll');
    }

    function openLegalModal(type) {
        const doc = DATA.legal[type];
        if (!doc) return;
        openModal(`
            <button type="button" class="modal-close-float" data-close-modal aria-label="Close">${ICONS.close}</button>
            <div class="modal-body">
                <span class="eyebrow">Arkadia Travel</span>
                <h2>${doc.title}</h2>
                <div style="margin-top:16px;">${doc.body}</div>
                <div style="margin-top:24px;text-align:right;">
                    <button type="button" class="btn btn--primary btn--sm" data-close-modal>Close</button>
                </div>
            </div>
        `);
    }

    function openDestinationModal(destId) {
        const d = DATA.destinations.find(item => item.id === destId);
        if (!d) return;
        let selectedDuration = d.durations[0].id;
        const isSaved = getSaved().includes(d.id);

        openModal(`
            <button type="button" class="modal-close-float" data-close-modal aria-label="Close">${ICONS.close}</button>
            <img class="modal-hero-img" src="${d.image}" alt="${d.name}">
            <div class="modal-body">
                <div class="dest-meta-row">
                    <span class="dest-category-tag">${d.categoryLabel} · Best: ${d.bestSeason}</span>
                    <span class="rating-pill">${ICONS.star} ${d.rating.toFixed(1)} (${d.reviews} reviews)</span>
                </div>
                <h2>${d.country} — ${d.name}</h2>
                <p class="dest-location">${ICONS.pin} ${d.location}</p>
                <p>${d.fullDesc}</p>

                <h4>Experience Highlights</h4>
                <ul class="modal-highlights">
                    ${d.highlights.map(h => `<li>${ICONS.check}<span>${h}</span></li>`).join('')}
                </ul>

                <h4>Select Your Preferred Stay</h4>
                <div class="duration-picker" id="modalDurationPicker">
                    ${d.durations.map((dur, idx) => `
                        <button type="button" class="duration-option ${idx === 0 ? 'active' : ''}" data-dur-id="${dur.id}">
                            <span>${dur.label}</span>
                            <strong>${formatCurrency(dur.price)} <small style="font-size:12px;font-weight:500;color:var(--ink-500);">/ guest</small></strong>
                        </button>
                    `).join('')}
                </div>

                <div style="display:flex;gap:12px;flex-wrap:wrap;">
                    <a id="modalBookLink" href="booking.html?destination=${d.id}&duration=${selectedDuration}" class="btn btn--primary" style="flex:1;">Book This Escape</a>
                    <button type="button" class="btn btn--outline" id="modalSaveBtn">${isSaved ? 'Saved in Wishlist ♥' : 'Save to Wishlist'}</button>
                </div>
            </div>
        `);

        const picker = document.getElementById('modalDurationPicker');
        const bookLink = document.getElementById('modalBookLink');
        picker?.querySelectorAll('.duration-option').forEach(btn => {
            btn.addEventListener('click', () => {
                picker.querySelectorAll('.duration-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedDuration = btn.getAttribute('data-dur-id');
                bookLink.href = `booking.html?destination=${d.id}&duration=${selectedDuration}`;
            });
        });

        const saveBtn = document.getElementById('modalSaveBtn');
        saveBtn?.addEventListener('click', () => {
            const nowSaved = toggleWishlist(d.id);
            saveBtn.textContent = nowSaved ? 'Saved in Wishlist ♥' : 'Save to Wishlist';
        });
    }

    function openReceiptModal(booking) {
        openModal(`
            <button type="button" class="modal-close-float no-print" data-close-modal aria-label="Close">${ICONS.close}</button>
            <div class="modal-body" style="text-align:center;">
                <div class="success-icon-circle">${ICONS.check}</div>
                <span class="eyebrow">Booking Confirmed</span>
                <h2>Your Journey Awaits, ${booking.travelerName.split(' ')[0]}!</h2>
                <p>Confirmation details have been sent to <strong>${booking.email}</strong>.</p>
                <div class="receipt-box">
                    <div class="receipt-row"><span>Booking Reference</span><strong>${booking.ref}</strong></div>
                    <div class="receipt-row"><span>Destination</span><span>${booking.destinationName}</span></div>
                    <div class="receipt-row"><span>Package Tier</span><span>${booking.packageName}</span></div>
                    <div class="receipt-row"><span>Duration</span><span>${booking.durationLabel}</span></div>
                    <div class="receipt-row"><span>Departure Date</span><span>${booking.startDate}</span></div>
                    <div class="receipt-row"><span>Travelers</span><span>${booking.adults} Adult(s)${booking.children > 0 ? `, ${booking.children} Child(ren)` : ''}</span></div>
                    <div class="receipt-row"><span>Payment Method</span><span style="text-transform:capitalize;">${booking.paymentMethod.replace('_', ' ')}</span></div>
                    ${booking.promoCode ? `<div class="receipt-row"><span>Promo Applied (${booking.promoCode})</span><span style="color:var(--success);">-${formatCurrency(booking.discount)}</span></div>` : ''}
                    <div class="receipt-row"><span>Total Paid</span><span>${formatCurrency(booking.total)}</span></div>
                </div>
                <div class="no-print" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:20px;">
                    <button type="button" class="btn btn--outline" onclick="window.print()">Print / Save PDF</button>
                    <button type="button" class="btn btn--primary" id="receiptViewTripsBtn">View in My Trips</button>
                </div>
            </div>
        `);

        document.getElementById('receiptViewTripsBtn')?.addEventListener('click', () => {
            closeActiveModal();
            openTripsDrawer('bookings');
        });
    }

    function toggleWishlist(destId) {
        const saved = getSaved();
        const exists = saved.includes(destId);
        const next = exists ? saved.filter(id => id !== destId) : [...saved, destId];
        setSaved(next);

        document.querySelectorAll(`[data-wishlist="${destId}"]`).forEach(btn => {
            btn.classList.toggle('saved', !exists);
            btn.innerHTML = !exists ? ICONS.heartFill : ICONS.heart;
        });

        const dest = DATA.destinations.find(d => d.id === destId);
        if (dest) {
            showToast(!exists ? `Saved ${dest.country} — ${dest.name} to your wishlist.` : `Removed ${dest.name} from wishlist.`);
        }
        return !exists;
    }

    // --- Reusable Destination Card Renderer ---
    function createDestinationCardHTML(d) {
        const isSaved = getSaved().includes(d.id);
        return `
            <article class="dest-card">
                <div class="dest-card-media">
                    <img src="${d.image}" alt="${d.country} - ${d.name}" loading="lazy">
                    <span class="dest-badge">${d.badge}</span>
                    <button type="button" class="wishlist-btn ${isSaved ? 'saved' : ''}" data-wishlist="${d.id}" aria-label="Save ${d.name}">
                        ${isSaved ? ICONS.heartFill : ICONS.heart}
                    </button>
                </div>
                <div class="dest-card-body">
                    <div class="dest-meta-row">
                        <span class="dest-category-tag">${d.categoryLabel}</span>
                        <span class="rating-pill">${ICONS.star} ${d.rating.toFixed(1)} (${d.reviews})</span>
                    </div>
                    <h3>${d.country} — ${d.name}</h3>
                    <div class="dest-location">${ICONS.pin} ${d.location}</div>
                    <p class="dest-desc">${d.shortDesc}</p>
                    <div class="dest-durations">
                        ${d.durations.map(dur => `
                            <div class="duration-row">
                                <span>${dur.label}</span>
                                <strong>${formatCurrency(dur.price)}</strong>
                            </div>
                        `).join('')}
                    </div>
                    <div class="dest-card-actions">
                        <button type="button" class="btn btn--outline btn--sm" data-open-dest="${d.id}">View Details</button>
                        <a href="booking.html?destination=${d.id}" class="btn btn--primary btn--sm">Book Now</a>
                    </div>
                </div>
            </article>
        `;
    }

    function bindDestinationCardEvents(container) {
        container.querySelectorAll('[data-wishlist]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleWishlist(btn.getAttribute('data-wishlist'));
            });
        });
        container.querySelectorAll('[data-open-dest]').forEach(btn => {
            btn.addEventListener('click', () => openDestinationModal(btn.getAttribute('data-open-dest')));
        });
    }

    // --- FAQ Accordion Helper ---
    function renderFAQs(containerId) {
        const el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = DATA.faqs.map((item, idx) => `
            <div class="faq-item ${idx === 0 ? 'open' : ''}">
                <button type="button" class="faq-trigger" aria-expanded="${idx === 0 ? 'true' : 'false'}">
                    <span>${item.q}</span>
                    ${ICONS.chevron}
                </button>
                <div class="faq-answer" style="${idx === 0 ? 'max-height: 240px;' : ''}">
                    <div class="faq-answer-inner">${item.a}</div>
                </div>
            </div>
        `).join('');

        el.querySelectorAll('.faq-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const parent = trigger.closest('.faq-item');
                const answer = parent.querySelector('.faq-answer');
                const isOpen = parent.classList.contains('open');

                el.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('open');
                    item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                });

                if (!isOpen) {
                    parent.classList.add('open');
                    trigger.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // =========================================================
    // PAGE 1: HOME PAGE
    // =========================================================
    function initHomePage() {
        const featuredEl = document.getElementById('homeFeaturedGrid');
        if (featuredEl) {
            const featured = DATA.destinations.slice(0, 6);
            featuredEl.innerHTML = featured.map(createDestinationCardHTML).join('');
            bindDestinationCardEvents(featuredEl);
        }

        const testEl = document.getElementById('testimonialsGrid');
        if (testEl) {
            testEl.innerHTML = DATA.testimonials.map(t => `
                <article class="testimonial-card">
                    <div class="stars">${ICONS.star.repeat(t.rating)}</div>
                    <p class="testimonial-quote">"${t.quote}"</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">${t.initials}</div>
                        <div class="author-info">
                            <strong>${t.name}</strong>
                            <span>${t.role} · ${t.trip}</span>
                        </div>
                    </div>
                </article>
            `).join('');
        }

        const heroForm = document.getElementById('heroSearchForm');
        if (heroForm) {
            heroForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const q = document.getElementById('heroQuery')?.value.trim() || '';
                const cat = document.getElementById('heroCategory')?.value || 'all';
                const guests = document.getElementById('heroGuests')?.value || '2';
                const params = new URLSearchParams();
                if (q) params.set('q', q);
                if (cat && cat !== 'all') params.set('category', cat);
                if (guests) params.set('travelers', guests);
                window.location.href = `destinations.html?${params.toString()}`;
            });
        }
    }

    // =========================================================
    // PAGE 2: DESTINATIONS EXPLORER
    // =========================================================
    function initDestinationsPage() {
        const grid = document.getElementById('destinationsGrid');
        if (!grid) return;

        const searchInput = document.getElementById('destSearchInput');
        const sortSelect = document.getElementById('destSortSelect');
        const pillContainer = document.getElementById('categoryPills');
        const resultsCount = document.getElementById('resultsCount');

        const urlParams = new URLSearchParams(window.location.search);
        let state = {
            query: urlParams.get('q') || '',
            category: urlParams.get('category') || 'all',
            sort: 'featured'
        };

        if (searchInput && state.query) searchInput.value = state.query;

        const setActivePill = () => {
            pillContainer?.querySelectorAll('.filter-pill').forEach(p => {
                p.classList.toggle('active', p.getAttribute('data-cat') === state.category);
            });
        };
        setActivePill();

        function render() {
            let list = [...DATA.destinations];

            if (state.category !== 'all') {
                list = list.filter(d => d.category === state.category);
            }

            if (state.query.trim()) {
                const q = state.query.trim().toLowerCase();
                list = list.filter(d =>
                    d.name.toLowerCase().includes(q) ||
                    d.country.toLowerCase().includes(q) ||
                    d.location.toLowerCase().includes(q) ||
                    d.categoryLabel.toLowerCase().includes(q) ||
                    d.shortDesc.toLowerCase().includes(q)
                );
            }

            if (state.sort === 'price-asc') {
                list.sort((a, b) => a.durations[0].price - b.durations[0].price);
            } else if (state.sort === 'price-desc') {
                list.sort((a, b) => b.durations[0].price - a.durations[0].price);
            } else if (state.sort === 'rating') {
                list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
            }

            if (resultsCount) {
                resultsCount.textContent = `Showing ${list.length} of ${DATA.destinations.length} curated escapes`;
            }

            if (!list.length) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column:1 / -1;">
                        <h3>No destinations match "${state.query}"</h3>
                        <p>Try clearing your search or exploring another travel style.</p>
                        <button type="button" class="btn btn--primary btn--sm" id="resetFiltersBtn">Reset All Filters</button>
                    </div>
                `;
                document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
                    state = { query: '', category: 'all', sort: 'featured' };
                    if (searchInput) searchInput.value = '';
                    if (sortSelect) sortSelect.value = 'featured';
                    setActivePill();
                    render();
                });
                return;
            }

            grid.innerHTML = list.map(createDestinationCardHTML).join('');
            bindDestinationCardEvents(grid);
        }

        searchInput?.addEventListener('input', (e) => {
            state.query = e.target.value;
            render();
        });

        sortSelect?.addEventListener('change', (e) => {
            state.sort = e.target.value;
            render();
        });

        pillContainer?.querySelectorAll('.filter-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                state.category = pill.getAttribute('data-cat');
                setActivePill();
                render();
            });
        });

        render();
    }

    // =========================================================
    // PAGE 3: PACKAGES PAGE
    // =========================================================
    function initPackagesPage() {
        const pkgGrid = document.getElementById('packagesGrid');
        if (!pkgGrid) return;

        let guestsMultiplier = 1;
        let selectedAddons = [];

        function renderPackages() {
            const label = guestsMultiplier === 1 ? '/ per guest' : `for ${guestsMultiplier} guests`;
            pkgGrid.innerHTML = DATA.packages.map(pkg => {
                const displayTotal = pkg.displayBasePrice * guestsMultiplier;
                const addonsQuery = selectedAddons.length ? `&addons=${selectedAddons.join(',')}` : '';
                return `
                    <article class="package-card ${pkg.featured ? 'featured' : ''}">
                        <span class="package-badge">${pkg.badge}</span>
                        <h3>${pkg.name}</h3>
                        <p class="package-subtitle">${pkg.subtitle}</p>
                        <div class="package-price">
                            <strong>${formatCurrency(displayTotal)}</strong>
                            <span> ${label} · ${pkg.nights}</span>
                        </div>
                        <ul class="package-features">
                            ${pkg.features.map(f => `<li>${ICONS.check}<span>${f}</span></li>`).join('')}
                        </ul>
                        <a href="booking.html?package=${pkg.id}&travelers=${guestsMultiplier}${addonsQuery}" class="btn ${pkg.featured ? 'btn--primary' : 'btn--outline'} btn--block">
                            Select ${pkg.name.replace('The ', '')}
                        </a>
                    </article>
                `;
            }).join('');
        }

        document.querySelectorAll('[data-guest-toggle]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-guest-toggle]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                guestsMultiplier = Number(btn.getAttribute('data-guest-toggle')) || 1;
                renderPackages();
            });
        });

        const addonsEl = document.getElementById('packagesAddonsGrid');
        if (addonsEl) {
            addonsEl.innerHTML = DATA.addons.map(a => `
                <label class="addon-card" data-pkg-addon="${a.id}">
                    <input type="checkbox" value="${a.id}">
                    <div class="addon-info">
                        <strong>${a.name}</strong>
                        <p>${a.desc}</p>
                    </div>
                    <span class="addon-price">+${formatCurrency(a.price)}${a.perPerson ? '/pp' : ''}</span>
                </label>
            `).join('');

            addonsEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.addEventListener('change', () => {
                    const card = cb.closest('.addon-card');
                    card.classList.toggle('selected', cb.checked);
                    selectedAddons = Array.from(addonsEl.querySelectorAll('input:checked')).map(i => i.value);
                    renderPackages();
                });
            });
        }

        renderPackages();
        renderFAQs('packagesFaqList');
    }

    // =========================================================
    // PAGE 4: INTERACTIVE BOOKING & CHECKOUT ENGINE
    // =========================================================
    function initBookingPage() {
        const form = document.getElementById('bookingForm');
        if (!form) return;

        const params = new URLSearchParams(window.location.search);
        const destSelect = document.getElementById('destinationSelect');
        const durSelect = document.getElementById('durationSelect');
        const pkgSelect = document.getElementById('packageSelect');
        const adultsInput = document.getElementById('adultsInput');
        const childrenInput = document.getElementById('childrenInput');
        const startDateInput = document.getElementById('startDateInput');
        const addonsContainer = document.getElementById('bookingAddonsGrid');
        const promoInput = document.getElementById('promoCodeInput');
        const applyPromoBtn = document.getElementById('applyPromoBtn');
        const promoFeedback = document.getElementById('promoFeedback');

        // Set minimum date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 2);
        const minDateStr = tomorrow.toISOString().split('T')[0];
        if (startDateInput) {
            startDateInput.min = minDateStr;
            const defaultDate = new Date();
            defaultDate.setDate(defaultDate.getDate() + 14);
            startDateInput.value = defaultDate.toISOString().split('T')[0];
        }

        // Populate Destinations Dropdown
        destSelect.innerHTML = DATA.destinations.map(d =>
            `<option value="${d.id}">${d.country} — ${d.name} (from ${formatCurrency(d.durations[0].price)})</option>`
        ).join('');

        // Populate Packages Dropdown
        pkgSelect.innerHTML = DATA.packages.map(p =>
            `<option value="${p.id}">${p.name} ${p.upgradePrice > 0 ? `(+${formatCurrency(p.upgradePrice)}/guest)` : '(Included Base)'}</option>`
        ).join('');

        // Apply URL pre-selections
        const preDest = params.get('destination');
        if (preDest && DATA.destinations.some(d => d.id === preDest)) {
            destSelect.value = preDest;
        }

        const prePkg = params.get('package');
        if (prePkg && DATA.packages.some(p => p.id === prePkg)) {
            pkgSelect.value = prePkg;
        }

        const preTravelers = Number(params.get('travelers'));
        if (preTravelers >= 1 && preTravelers <= 12) {
            adultsInput.value = preTravelers;
        }

        const preAddons = (params.get('addons') || '').split(',').filter(Boolean);

        // Populate Addons
        if (addonsContainer) {
            addonsContainer.innerHTML = DATA.addons.map(a => {
                const checked = preAddons.includes(a.id);
                return `
                    <label class="addon-card ${checked ? 'selected' : ''}">
                        <input type="checkbox" name="addons" value="${a.id}" ${checked ? 'checked' : ''}>
                        <div class="addon-info">
                            <strong>${a.name}</strong>
                            <p>${a.desc}</p>
                        </div>
                        <span class="addon-price">+${formatCurrency(a.price)}${a.perPerson ? '/pp' : ''}</span>
                    </label>
                `;
            }).join('');

            addonsContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.addEventListener('change', () => {
                    cb.closest('.addon-card').classList.toggle('selected', cb.checked);
                    updateSummary();
                });
            });
        }

        function populateDurations(preferredDurId) {
            const dest = DATA.destinations.find(d => d.id === destSelect.value) || DATA.destinations[0];
            durSelect.innerHTML = dest.durations.map(dur =>
                `<option value="${dur.id}">${dur.label} — ${formatCurrency(dur.price)} / adult</option>`
            ).join('');
            if (preferredDurId && dest.durations.some(d => d.id === preferredDurId)) {
                durSelect.value = preferredDurId;
            }
        }
        populateDurations(params.get('duration'));

        let appliedPromo = null;

        function computeTotals() {
            const dest = DATA.destinations.find(d => d.id === destSelect.value) || DATA.destinations[0];
            const dur = dest.durations.find(x => x.id === durSelect.value) || dest.durations[0];
            const pkg = DATA.packages.find(p => p.id === pkgSelect.value) || DATA.packages[0];
            const adults = Math.max(1, Math.min(12, Number(adultsInput.value) || 1));
            const children = Math.max(0, Math.min(8, Number(childrenInput.value) || 0));
            const totalGuests = adults + children;

            const adultTripBase = (dur.price + pkg.upgradePrice) * adults;
            const childTripBase = Math.round((dur.price + pkg.upgradePrice) * 0.7) * children;
            const tripSubtotal = adultTripBase + childTripBase;

            let addonsTotal = 0;
            const checkedAddons = Array.from(form.querySelectorAll('input[name="addons"]:checked')).map(i => i.value);
            checkedAddons.forEach(id => {
                const a = DATA.addons.find(item => item.id === id);
                if (a) addonsTotal += a.perPerson ? a.price * totalGuests : a.price;
            });

            const subtotal = tripSubtotal + addonsTotal;
            let discount = 0;
            if (appliedPromo) {
                discount = appliedPromo.type === 'percent'
                    ? Math.round(subtotal * (appliedPromo.value / 100))
                    : Math.min(subtotal, appliedPromo.value);
            }

            const taxes = Math.round((subtotal - discount) * 0.05);
            const total = Math.max(0, subtotal - discount + taxes);

            return { dest, dur, pkg, adults, children, totalGuests, tripSubtotal, addonsTotal, discount, taxes, total, checkedAddons };
        }

        function updateSummary() {
            const c = computeTotals();
            const img = document.getElementById('summaryDestImg');
            const title = document.getElementById('summaryDestTitle');
            const sub = document.getElementById('summaryDestSub');
            const lines = document.getElementById('summaryLines');
            const totalEl = document.getElementById('summaryGrandTotal');
            const payBtnAmount = document.getElementById('payBtnAmount');

            if (img) { img.src = c.dest.image; img.alt = c.dest.name; }
            if (title) title.textContent = `${c.dest.country} — ${c.dest.name}`;
            if (sub) sub.textContent = `${c.pkg.name} · ${c.dur.label}`;

            if (lines) {
                lines.innerHTML = `
                    <div class="summary-line">
                        <span>Escape (${c.adults} adult${c.adults > 1 ? 's' : ''}${c.children > 0 ? `, ${c.children} child` : ''})</span>
                        <strong>${formatCurrency(c.tripSubtotal)}</strong>
                    </div>
                    ${c.addonsTotal > 0 ? `
                        <div class="summary-line">
                            <span>Selected Add-Ons (${c.checkedAddons.length})</span>
                            <strong>${formatCurrency(c.addonsTotal)}</strong>
                        </div>
                    ` : ''}
                    ${c.discount > 0 ? `
                        <div class="summary-line discount">
                            <span>Promo (${appliedPromo.code})</span>
                            <span>-${formatCurrency(c.discount)}</span>
                        </div>
                    ` : ''}
                    <div class="summary-line">
                        <span>Concierge & Eco Taxes (5%)</span>
                        <span>${formatCurrency(c.taxes)}</span>
                    </div>
                `;
            }

            if (totalEl) totalEl.textContent = formatCurrency(c.total);
            if (payBtnAmount) payBtnAmount.textContent = formatCurrency(c.total);
        }

        destSelect.addEventListener('change', () => {
            populateDurations();
            updateSummary();
        });
        [durSelect, pkgSelect, adultsInput, childrenInput].forEach(el => {
            el?.addEventListener('change', updateSummary);
            el?.addEventListener('input', updateSummary);
        });

        // Promo Code Logic
        function applyCode(rawCode) {
            const code = (rawCode || '').trim().toUpperCase();
            if (!code) {
                appliedPromo = null;
                if (promoFeedback) promoFeedback.textContent = '';
                updateSummary();
                return;
            }
            const found = DATA.promoCodes[code];
            if (found) {
                appliedPromo = { ...found, code };
                if (promoFeedback) {
                    promoFeedback.style.color = 'var(--success)';
                    promoFeedback.textContent = `✓ Applied: ${found.label}`;
                }
                showToast(`Promo code ${code} applied!`);
            } else {
                appliedPromo = null;
                if (promoFeedback) {
                    promoFeedback.style.color = 'var(--danger)';
                    promoFeedback.textContent = 'Invalid code. Try ARKADIA10 or WELCOME50.';
                }
            }
            updateSummary();
        }

        applyPromoBtn?.addEventListener('click', () => applyCode(promoInput?.value));
        document.getElementById('quickPromoChip')?.addEventListener('click', () => {
            if (promoInput) promoInput.value = 'ARKADIA10';
            applyCode('ARKADIA10');
        });

        // Payment Method Switcher
        const cardFields = document.getElementById('cardPaymentPanel');
        const paypalPanel = document.getElementById('paypalPaymentPanel');
        const bankPanel = document.getElementById('bankPaymentPanel');

        form.querySelectorAll('input[name="payment_method"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const val = radio.value;
                if (cardFields) cardFields.style.display = val === 'card' ? 'block' : 'none';
                if (paypalPanel) paypalPanel.style.display = val === 'paypal' ? 'block' : 'none';
                if (bankPanel) bankPanel.style.display = val === 'bank_transfer' ? 'block' : 'none';
            });
        });

        // Card Input Formatting
        const cardNumInput = document.getElementById('cardNumber');
        cardNumInput?.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 16);
            e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
        });

        const cardExpInput = document.getElementById('cardExpiry');
        cardExpInput?.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 4);
            if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
            e.target.value = v;
        });

        const cardCvvInput = document.getElementById('cardCvv');
        cardCvvInput?.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });

        // Form Validation & Submission
        const setFieldError = (inputId, msg) => {
            const input = document.getElementById(inputId);
            const errEl = document.getElementById(inputId + 'Error');
            if (input) input.classList.toggle('error', Boolean(msg));
            if (errEl) {
                errEl.textContent = msg || '';
                errEl.classList.toggle('visible', Boolean(msg));
            }
            return !msg;
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            const name = document.getElementById('travelerName').value.trim();
            const email = document.getElementById('travelerEmail').value.trim();
            const phone = document.getElementById('travelerPhone').value.trim();
            const startDate = startDateInput.value;
            const termsChecked = document.getElementById('termsCheck').checked;
            const paymentMethod = form.querySelector('input[name="payment_method"]:checked')?.value || 'card';

            if (!setFieldError('travelerName', name.length < 2 ? 'Please enter your full name.' : '')) valid = false;
            if (!setFieldError('travelerEmail', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Please enter a valid email address.' : '')) valid = false;
            if (!setFieldError('travelerPhone', phone.length < 7 ? 'Please enter a valid phone number.' : '')) valid = false;
            if (!setFieldError('startDateInput', !startDate ? 'Please select your start date.' : '')) valid = false;

            if (paymentMethod === 'card') {
                const digits = (cardNumInput?.value || '').replace(/\D/g, '');
                const exp = cardExpInput?.value || '';
                const cvv = cardCvvInput?.value || '';
                if (!setFieldError('cardNumber', digits.length < 13 ? 'Enter a valid 16-digit card number (demo accepted).' : '')) valid = false;
                if (!setFieldError('cardExpiry', !/^\d{2}\/\d{2}$/.test(exp) ? 'Use MM/YY format.' : '')) valid = false;
                if (!setFieldError('cardCvv', cvv.length < 3 ? 'Enter 3–4 digit CVV.' : '')) valid = false;
            }

            const termsErr = document.getElementById('termsCheckError');
            if (!termsChecked) {
                if (termsErr) { termsErr.textContent = 'You must agree to the Terms & Conditions to proceed.'; termsErr.classList.add('visible'); }
                valid = false;
            } else if (termsErr) {
                termsErr.classList.remove('visible');
            }

            if (!valid) {
                showToast('Please review the highlighted fields before continuing.');
                form.querySelector('.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            const submitBtn = document.getElementById('confirmBookingBtn');
            const origHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Securing Your Reservation...';

            setTimeout(() => {
                const c = computeTotals();
                const ref = 'ARK-2026-' + Math.floor(1000 + Math.random() * 9000);
                const record = {
                    ref,
                    createdAt: new Date().toISOString(),
                    travelerName: name,
                    email,
                    phone,
                    destinationId: c.dest.id,
                    destinationName: `${c.dest.country} — ${c.dest.name}`,
                    packageName: c.pkg.name,
                    durationLabel: c.dur.label,
                    startDate,
                    adults: c.adults,
                    children: c.children,
                    addons: c.checkedAddons,
                    paymentMethod,
                    promoCode: appliedPromo?.code || null,
                    discount: c.discount,
                    total: c.total
                };

                saveBookingRecord(record);
                submitBtn.disabled = false;
                submitBtn.innerHTML = origHTML;
                openReceiptModal(record);
                showToast(`Booking ${ref} confirmed!`);
            }, 1050);
        });

        updateSummary();
    }

    // =========================================================
    // PAGE 5: CONTACT PAGE
    // =========================================================
    function initContactPage() {
        renderFAQs('contactFaqList');

        const form = document.getElementById('contactForm');
        if (!form) return;

        const formCard = document.getElementById('contactFormWrap');
        const successCard = document.getElementById('contactSuccessCard');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            let ok = true;
            const check = (id, cond, msg) => {
                const inp = document.getElementById(id);
                const err = document.getElementById(id + 'Error');
                inp?.classList.toggle('error', cond);
                if (err) { err.textContent = cond ? msg : ''; err.classList.toggle('visible', cond); }
                if (cond) ok = false;
            };

            check('contactName', name.length < 2, 'Please enter your name.');
            check('contactEmail', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'Please enter a valid email.');
            check('contactMessage', message.length < 10, 'Please share a few details (at least 10 characters).');

            if (!ok) {
                showToast('Please complete the required fields.');
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner"></span> Sending Inquiry...';

            setTimeout(() => {
                const ticket = 'INQ-' + Math.floor(10000 + Math.random() * 90000);
                document.getElementById('inquiryTicketId').textContent = ticket;
                document.getElementById('inquirySenderName').textContent = name;
                formCard.style.display = 'none';
                successCard.style.display = 'block';
                btn.disabled = false;
                btn.innerHTML = orig;
                form.reset();
                showToast(`Message received! Ticket ${ticket}`);
            }, 800);
        });

        document.getElementById('sendAnotherBtn')?.addEventListener('click', () => {
            successCard.style.display = 'none';
            formCard.style.display = 'block';
        });
    }

    // --- Boot ---
    document.addEventListener('DOMContentLoaded', () => {
        initGlobalChrome();
        initHomePage();
        initDestinationsPage();
        initPackagesPage();
        initBookingPage();
        initContactPage();
    });
})();
