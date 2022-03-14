import React, {useEffect,useState} from 'react';
import DataTable from './DataTable'

function Datalist(props) {
    console.log("hi")
    const[userList,setUserList]= useState([]);

    const state = {
        userList
    }
    
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response=> response.json())
        .then(result => setUserList(result) )
        .catch(error => console.log(error))
    },[])
 
    console.log("printing userList");
    console.log(userList);
    return (
     

        <div>
            {(userList && userList.length) > 0 ?

            (
            <div>
                {/* <input
                value={props.searchValue}
                onChange={props.onChangeSearch}
                autoComplete={'off'}
                type="text"
                placeholder="Search ..."
            /> */}
              <DataTable
                ref={props.dataTableRef}
                data={userList}
                columns={props.columns}
                options={props.options}
            /> </div>)
            :'Loading'
            }
        </div>

    );
}

export default Datalist;