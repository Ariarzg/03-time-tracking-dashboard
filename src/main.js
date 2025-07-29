import './style.css';

import { loadCategories, categories } from './data.js';

renderLayout();

let timePeriod = 'daily';

async function renderLayout() {
  await loadCategories();

  let pageHTML = renderHeader() + renderCategories();

  document.getElementById('app').innerHTML = pageHTML;

  document.getElementById('daily').addEventListener('click', (e) => {
    e.preventDefault();
    timePeriod = 'daily';
    renderLayout();
  });
  document.getElementById('weekly').addEventListener('click', (e) => {
    e.preventDefault();
    timePeriod = 'weekly';
    renderLayout();
  });
  document.getElementById('monthly').addEventListener('click', (e) => {
    e.preventDefault();
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
          class="absolute right-4 -top-2 z-10"
        />
        <div
          class="p-6 mt-10 h-full bg-navy-900 hover:bg-navy-900/95 cursor-pointer rounded-2xl grid grid-cols-1 gap-2 relative z-20"
        >
          <div class="flex items-center">
            <h3 class="text-titles font-medium">${title}</h3>
            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg" class="ml-auto sm:row-span-3 cursor-pointer hover:[&>path]:fill-white"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
          </div>
          <div class="flex items-center sm:items-start sm:flex-col sm:mb-4">
            <p class="text-fluid-hours sm:text-[3.25rem] font-light">${currentHours}hrs</p>
            <p class="text-navy-200 font-light text-fluid-last text-end ml-auto sm:ml-0">Last ${timePeriodFormatted} - ${previousHours}hrs</p>
          </div>
          
        </div>
      </section>
    `;
  });
  return html;
}

function renderHeader() {
  return `
    <section class="bg-navy-900 rounded-2xl overflow-hidden sm:row-span-2 grid grid-cols-3 sm:grid-cols-1">
      <div class="bg-accent rounded-2xl w-full col-span-3 sm:col-span-1">
        <div class="flex px-6 py-7 sm:pb-18 gap-4 sm:gap-8 items-center sm:flex-col sm:items-start">
          <img
            src="/images/image-jeremy.png"
            alt="Jeremy Robson"
            class="w-16 sm:w-20 border-3 border-white rounded-full"
          />
          <div class="">
            <p class="text-navy-200 text-sm">Report for</p>
            <h2 class="text-white text-fluid-name sm:text-4xl font-light">Jeremy Robson</h2>
          </div>
        </div>
      </div>
      <a class="inline text-fluid-paragraph text-center sm:text-start sm:h-min p-4 sm:px-6 sm:py-2 sm:mt-4 ${
        timePeriod === 'daily' ? '' : 'text-navy-500'
      } cursor-pointer hover:text-white" id="daily">Daily</a>
      <a class="inline text-fluid-paragraph text-center sm:text-start sm:h-min p-4 sm:px-6 sm:py-2 ${
        timePeriod === 'weekly' ? '' : 'text-navy-500'
      } cursor-pointer  hover:text-white" id="weekly">Weekly</a>
      <a class="inline text-fluid-paragraph text-center sm:text-start sm:h-min p-4 sm:px-6 sm:py-2 sm:mb-4 ${
        timePeriod === 'monthly' ? '' : 'text-navy-500'
      } cursor-pointer  hover:text-white" id="monthly">Monthly</a>
    </section>
  `;
}
