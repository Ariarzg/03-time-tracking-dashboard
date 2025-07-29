import './style.css';

import { loadCategories, categories } from './data.js';

renderLayout();

let timePeriod = 'weekly';

async function renderLayout() {
  await loadCategories();

  // renderCategories();

  let pageHTML = renderHeader() + renderCategories();

  document.getElementById('app').innerHTML = pageHTML;
}

function renderCategories() {
  let html = '';
  categories.forEach((category) => {
    console.log(category);

    let titleFormatted = category.title.toLowerCase().replace(' ', '-');

    html += `
      <section class="bg-${titleFormatted} rounded-2xl overflow-hidden relative">
        <img
          src="/images/icon-${titleFormatted}.svg"
          alt="Work Icon"
          class="absolute right-4 -top-4 z-10"
        />
        <div
          class="p-6 mt-10 bg-navy-900 rounded-2xl grid grid-cols-2 justify-between items-center gap-2 relative z-20"
        >
          <h3 class="text-titles font-medium">Work</h3>
          <img
            src="/images/icon-ellipsis.svg"
            alt="Ellipsis Icon"
            class="ml-auto"
          />
          <p class="text-3xl font-light">32hrs</p>

          <p class="text-navy-200">Last Week - 36hrs</p>
        </div>
      </section>
    `;
  });
  return html;
}

function renderHeader() {
  return `
    <section class="bg-navy-900 rounded-2xl overflow-hidden grid grid-cols-3">
      <div class="bg-accent rounded-2xl w-full col-span-3">
        <div class="flex px-6 py-7 gap-4 items-center">
          <img
            src="/images/image-jeremy.png"
            alt="Jeremy Robson"
            class="w-16 border-3 border-white rounded-full"
          />
          <div class="">
            <p class="text-navy-200 text-xs">Report for</p>
            <h2 class="text-white text-titles">Jeremy Robson</h2>
          </div>
        </div>
      </div>
      <a class="inline text-center p-4 text-navy-500">Daily</a>
      <a class="inline text-center p-4">Weekly</a>
      <a class="inline text-center p-4 text-navy-500">Monthly</a>
    </section>
  `;
}
