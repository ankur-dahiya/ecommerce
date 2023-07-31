// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users",{
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(userData)
    });
    const data = await response.json();
    // on server it will only return some info of user (not password)
    resolve({data:{id:data.id}});
  }
  );
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve,reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    // this query returns an array
    const response = await fetch("http://localhost:8080/users?email="+email);
    const data = await response.json();
    if(data.length){
      //TODO : send same error on frontend
      if(password===data[0].password){
        // resolve({data:data[0]});
        //sending only userid not all user info
        resolve({data:{id:data[0].id}});
      }
      else{
        reject({message : "wrong credentials"})
      }
    }
    else{
      reject({message : "user not found"});
    }
    
  }
  );
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    
    resolve({data:"success"});
  }
  );
}

