// Image lightbox modal.
// Any <img class="modal-image"> becomes click-to-enlarge in a modal overlay.
(function () {

	function openModal(modalId) {
		const modal = document.getElementById(modalId);
		if (!modal) return;
		modal.removeAttribute('hidden');
		document.body.style.overflow = 'hidden';
		const closeBtn = modal.querySelector('.modal-close');
		if (closeBtn) closeBtn.focus();
	}

	function closeModal(modal) {
		modal.setAttribute('hidden', '');
		document.body.style.overflow = '';
	}

	document.addEventListener('click', function (e) {
		const closeEl = e.target.closest('[data-modal-close]');
		if (closeEl) {
			const modal = closeEl.closest('.modal');
			if (modal) closeModal(modal);
		}
	});

	document.addEventListener('keydown', function (e) {
		if (e.key !== 'Escape') return;
		const open = document.querySelector('.modal:not([hidden])');
		if (open) closeModal(open);
	});

	// Trap Tab inside an open modal.
	document.addEventListener('keydown', function (e) {
		const open = document.querySelector('.modal:not([hidden])');
		if (!open || e.key !== 'Tab') return;
		const focusable = open.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
		if (focusable.length === 0) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	});

	function initImageModals() {
		const images = document.querySelectorAll('img.modal-image:not([data-modal-initialized])');
		images.forEach(function (img, index) {
			img.setAttribute('data-modal-initialized', 'true');

			const modalId = `image-modal-${Date.now()}-${index}`;
			const title = img.dataset.modalTitle || img.alt || '';
			const fullSrc = img.dataset.modalSrc || img.src;

			img.setAttribute('tabindex', '0');
			img.setAttribute('role', 'button');
			img.setAttribute('aria-label', `View larger: ${title}`);

			const modalHTML = `
				<div id="${modalId}" class="modal" role="dialog" aria-modal="true" aria-label="${title}" hidden>
					<div class="modal-backdrop" data-modal-close></div>
					<div class="modal-container modal-image-container">
						<button class="modal-close" data-modal-close aria-label="Close">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M18 6 6 18"/><path d="m6 6 12 12"/>
							</svg>
						</button>
						<img src="${fullSrc}" alt="${title}" class="modal-image-full">
						${title ? `<p class="modal-image-caption">${title}</p>` : ''}
					</div>
				</div>
			`;
			document.body.insertAdjacentHTML('beforeend', modalHTML);

			img.addEventListener('click', function () { openModal(modalId); });
			img.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					openModal(modalId);
				}
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initImageModals);
	} else {
		initImageModals();
	}
})();
