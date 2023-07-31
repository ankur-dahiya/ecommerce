// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/?user.id="+userId);
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/"+userId);
    const data = await response.json();
    resolve({data});
  }
  );
}

export function updateUser(updateData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/"+updateData.id,{
      method : "PATCH",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(updateData)
    });
    const data = await response.json();
    // on server it will only return some info of user (not password)
    resolve({data});
  }
  );
}
