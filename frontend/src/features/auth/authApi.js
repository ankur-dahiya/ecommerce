// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup",{
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(userData)
    });
    const data = await response.json();
    // on server it will only return some info of user (not password)
    // resolve({data:{id:data.id}});
    resolve({data});
  }
  );
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve,reject) => {
    try{
    const response = await fetch("http://localhost:8080/auth/login",{
      method:"POST",
      body : JSON.stringify(loginInfo),
      headers : {"Content-Type" : "application/json"},
    });
    if(response.ok){
      const data = await response.json();
      resolve({data});
    }
    else{
      const data = await response.text();
      reject(data);
    }
  }
  catch(err){
    reject(err);
  } 

}
  );
}
export function checkAuth() {
  return new Promise(async (resolve,reject) => {
    try{
    const response = await fetch("http://localhost:8080/auth/check");
    if(response.ok){
      const data = await response.json();
      resolve({data});
    }
    else{
      const data = await response.text();
      reject(data);
    }
  }
  catch(err){
    reject(err);
  } 

}
  );
}

export function signOut() {
  return new Promise(async (resolve) => {
    
    resolve({data:"success"});
  }
  );
}

