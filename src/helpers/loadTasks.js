import { db } from "../firebase/firebase-config";


const loadTasks = async( uid, flag = true) => {
   
   const data = [];
   let dataSnap;

   if( flag ){
      dataSnap = await db.collection( `${ uid }/todo-list/tasks` ).get();
   }else{
      dataSnap = await db.collection( `${ uid }/todo-list/profileImage` ).get();
   }
  

  dataSnap.forEach( snapHijo => { 

        data.push( { ...snapHijo.data(), id: snapHijo.id } )

   })
  
   return data;
}

export default loadTasks;
