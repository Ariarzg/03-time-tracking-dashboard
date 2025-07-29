class Category {
  title;
  timeframes;

  constructor(categoryDetails) {
    this.title = categoryDetails.title;
    this.timeframes = categoryDetails.timeframes;
  }
}

export let categories = [];

export const loadCategories = async () => {
  let response;
  let categoriesData;

  try {
    response = await fetch('/data.json');
    categoriesData = await response.json();
  } catch (error) {
    return console.error('Unexpected Error. Try Again Later : ' + error);
  }

  categories = categoriesData.map(
    (categoryDetails) => new Category(categoryDetails)
  );
};
