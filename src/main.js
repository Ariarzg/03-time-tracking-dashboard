import './style.css';

import { loadCategories, categories } from './data.js';

renderLayout();

let timePeriod = 'monthly';

async function renderLayout() {
  await loadCategories();

  // renderCategories();

  let pageHTML = renderHeader() + renderCategories();

  document.getElementById('app').innerHTML = pageHTML;

  document.getElementById('daily').addEventListener('click', () => {
    timePeriod = 'daily';
    renderLayout();
  });
  document.getElementById('weekly').addEventListener('click', () => {
    timePeriod = 'weekly';
    renderLayout();
  });
  document.getElementById('monthly').addEventListener('click', () => {
    timePeriod = 'monthly';
    renderLayout();
  });
}

function renderCategories() {
  let html = '';
  categories.forEach((category) => {
    console.log(category);

    const title = category.title;
    let titleFormatted = title.toLowerCase().replace(' ', '-');

    // console.log(category.timeframes.daily.current);
    const timeframes = category.timeframes;

    const currentHours =
      timePeriod === 'daily'
        ? timeframes.daily.current
        : timePeriod === 'weekly'
        ? timeframes.weekly.current
        : timePeriod === 'monthly'
        ? timeframes.monthly.current
        : 0;

    const previousHours =
      timePeriod === 'daily'
        ? timeframes.daily.previous
        : timePeriod === 'weekly'
        ? timeframes.weekly.previous
        : timePeriod === 'monthly'
        ? timeframes.monthly.previous
        : 0;

    const timePeriodFormatted =
      timePeriod === 'daily'
        ? 'Day'
        : timePeriod === 'weekly'
        ? 'Week'
        : timePeriod === 'monthly'
        ? 'Month'
        : '';

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
          <h3 class="text-titles font-medium">${title}</h3>
          <img
            src="/images/icon-ellipsis.svg"
            alt="Ellipsis Icon"
            class="ml-auto"
          />
          <p class="text-fluid-hours font-light">${currentHours}hrs</p>

          <p class="text-navy-200 font-light text-fluid-last text-end">Last ${timePeriodFormatted} - ${previousHours}hrs</p>
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
            <p class="text-navy-200 text-sm">Report for</p>
            <h2 class="text-white text-fluid-name font-light">Jeremy Robson</h2>
          </div>
        </div>
      </div>
      <a class="inline text-fluid-paragraph text-center p-4 ${
        timePeriod === 'daily' ? '' : 'text-navy-500'
      } cursor-pointer hover:text-white" id="daily">Daily</a>
      <a class="inline text-fluid-paragraph text-center p-4 ${
        timePeriod === 'weekly' ? '' : 'text-navy-500'
      } cursor-pointer  hover:text-white" id="weekly">Weekly</a>
      <a class="inline text-fluid-paragraph text-center p-4 ${
        timePeriod === 'monthly' ? '' : 'text-navy-500'
      } cursor-pointer  hover:text-white" id="monthly">Monthly</a>
    </section>
  `;
}
