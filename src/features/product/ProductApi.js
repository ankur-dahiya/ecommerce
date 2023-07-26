// A mock function to mimic making an async request for data
export function fecthAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({data});
  }
  );
}
export function fecthAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({data});
  }
  );
}
export function fecthAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fecthProductsByFilters({filter,sort,pagination}) {
  // filter = {"category" : ["laptop","smartphone"]}
  // sort = {_sort:"price",_order:"desc"}
  // pagination = {_page=1,_limit=10}
  // todo : on server we will support multiple values
  let queryString = "";
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length > 0){
      const lastCategoryValue = categoryValues[categoryValues.length-1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/?${queryString}`);
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    resolve({data:{products : data,totalItems:+totalItems}});
  }
  );
}
