//Local Storage 

export const setAuthUser=(data)=>{
    //save object to the local storage
    //strigfy objecr to text 
    localStorage.setItem("user",JSON.stringify(data));
};

export const getAuthUser=(data)=>{
    //get to the object from local storage
    //parse objecr to text 
    if (localStorage.get("user")) {
         return JSON.parse(localStorage.getItem("user"));   
    }
};

export const removeAuthUser = ()=>{
    if (localStorage.get("user")) {
          localStorage.removeItem("user");
    }
  
}