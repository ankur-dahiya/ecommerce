// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(item)
    });
    const data = await response.json();
    resolve({data});
  }
  );
}

//update will contain update item
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/"+update.id,{
      method : "PATCH",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(update)
    });
    const data = await response.json();
    resolve({data});
  }
  );
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/"+itemId,{
      method : "DELETE"
    });
    const data = await response.json();
    resolve({data:{id:itemId}});
  }
  );
}

export function fetchItemsById(userId){
  return new Promise(async(resolve)=>{
    const response = await fetch("http://localhost:8080/cart?user="+userId);
    const data = await response.json();
    resolve({data});
  })
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsById(userId);
    const data = response.data;
    for(const item of data){
      await deleteItemFromCart(item.id);
    }
    resolve({data : {status : "success"}});
  }
  );
}