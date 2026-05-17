import { uid, escapeHtml, showToast } from '../utils.js';
import { renderStarDisplay } from './productCard.js';
import { saveProducts } from '../data/products.js';

export function renderReviewSection(container, product, onSubmitSuccess) {
  // Use the product's actual reviews array for persistence within the session
  const reviews = product.reviews;

  function render() {
    container.innerHTML = `
      <div class="border-t border-[#F5F5F5] pt-8">
        <h3 class="text-[11px] font-semibold uppercase tracking-widest mb-6">
          Reviews
        </h3>

        <!-- Write a review -->
        <div class="mb-8 pb-8 border-b border-[#F5F5F5]">
          <h4 class="text-xs font-medium mb-4">Write a Review</h4>

          <!-- Star input -->
          <div class="flex items-center gap-2 mb-4">
            <div class="star-rating" id="star-input" role="group" aria-label="Rating">
              ${[1,2,3,4,5].map(n => `
                <button class="star text-2xl" data-star="${n}" aria-label="${n} star">★</button>
              `).join('')}
            </div>
            <span id="rating-label" class="text-[11px] text-gray-400">Select rating</span>
          </div>

          <!-- Author -->
          <div class="mb-3">
            <input type="text" id="review-author" class="input-minimal" placeholder="Your name" maxlength="40" />
          </div>

          <!-- Text -->
          <div class="mb-4">
            <textarea
              id="review-text"
              rows="3"
              class="w-full border-b border-black bg-transparent resize-none outline-none text-sm py-2 placeholder:text-gray-400 placeholder:font-light"
              placeholder="Share your experience with this product…"
              maxlength="400"
            ></textarea>
          </div>

          <div id="review-error" class="text-xs text-red-500 mb-3 hidden">Please provide a rating, name, and review.</div>

          <button id="submit-review" class="btn-primary">Submit Review</button>
        </div>

        <!-- Review list -->
        <div id="review-list" class="space-y-6">
          ${reviews.length === 0
            ? `<p class="text-sm text-gray-400">Be the first to review this product.</p>`
            : reviews.map(r => renderReviewItem(r)).join('')
          }
        </div>
      </div>
    `;

    // Star rating interaction
    let selectedRating = 0;
    const stars = container.querySelectorAll('.star');
    const ratingLabel = container.querySelector('#rating-label');
    const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

    function updateStars(n) {
      stars.forEach((s, i) => {
        s.style.color = i < n ? '#000' : '#E0E0E0';
      });
    }

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => updateStars(+star.dataset.star));
      star.addEventListener('mouseleave', () => updateStars(selectedRating));
      star.addEventListener('click', () => {
        selectedRating = +star.dataset.star;
        updateStars(selectedRating);
        ratingLabel.textContent = labels[selectedRating];
      });
    });
    updateStars(0);

    // Submit
    container.querySelector('#submit-review').addEventListener('click', () => {
      const author = container.querySelector('#review-author').value.trim();
      const text = container.querySelector('#review-text').value.trim();
      const errEl = container.querySelector('#review-error');

      if (!selectedRating || !author || !text) {
        errEl.classList.remove('hidden');
        return;
      }
      errEl.classList.add('hidden');

      const newReview = {
        id: uid(),
        author,
        rating: selectedRating,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        text,
      };

      reviews.unshift(newReview);
      saveProducts();
      render();

      if (onSubmitSuccess) onSubmitSuccess();

      // Scroll to review list
      container.querySelector('#review-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  render();
}

function renderReviewItem(review) {
  return `
    <div class="review-card">
      <div class="flex items-start justify-between gap-4 mb-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold uppercase flex-shrink-0">${review.author.charAt(0)}</div>
          <div>
            <span class="text-sm font-semibold block leading-tight">${escapeHtml(review.author)}</span>
            <span class="text-[10px] text-gray-400">${review.date}</span>
          </div>
        </div>
        <div class="flex gap-0.5 flex-shrink-0">${renderStarDisplay(review.rating)}</div>
      </div>
      <p class="text-sm text-gray-600 leading-relaxed pl-11">${escapeHtml(review.text)}</p>
    </div>
  `;
}
