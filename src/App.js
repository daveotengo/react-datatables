import React from 'react';
import './App.css';
//import DataTable from './DataTable'
import data from './data'
import Datalist from './Datalist'
import Select from 'react-select'
import axios from 'axios'

export default class App extends React.Component{

    componentDidMount(){
        console.log("component did mount");
        this.getOptions();
    }

    constructor(props) {
        super(props);
        this.state = {
            columns: [
            //   { title: "name", data: "name" },
            //   { title: "position", data: "position" },
            //   { title: "salary", data: "salary" },
            //   { title: "start_date", data: "start_date" },
            //   { title: "office", data: "office" },
            //   { title: "extn", data: "extn" }
            { title: "userId", data: "userId" },
            { title: "id", data: "id" },
            { title: "title", data: "title" },
            { title: "completed", data: "completed" },

            ],
            searchValue: '',
            options: {
                dom: 'lBfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ], 
                stripeClasses: [ 'stripe1', 'stripe2' ],
                orderClasses: false,


                // paging: false,
                // scrollX: true,
                // scrollY: '100%',
                // scrollCollapse: false,
                // autoWidth: false,
                // info: false,
            },

            selectOptions : [],
            id: "",
            name: '',
            criteria:'',
            //selected:false,
        };
        this.dataTableRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);

    }

    onChangeSearch = (e) => {
        const { value } = e.target;
        const searchValue = value;
        this.setState({ searchValue });
        this.dataTableRef.current.search(searchValue);
    };

    async getOptions(){
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
        const data = res.data
    
        const options = data.map(d => ({
          "value" : d.id,
          "label" : d.title
        }))
        this.setState({selectOptions: options})
      }

      handleChange(selectedOption) {
          console.log("press");
          console.log(selectedOption);
          console.log(selectedOption.value);
            //this.setState({clicked:true})
            //this.setState({selectedVal:selectedOption.value})
        //this.setState({criteria: selectedOption});
        this.getOptionById(selectedOption.value);
      }

      async getOptionById(id){
          console.log(id);
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos/'+id)
        const data = res.data
    
        // const options = data.map(d => ({
        //   "value" : d.id,
        //   "label" : d.title
        // }))
        console.log(data.id);
        console.log(data.title);
        //this.setState({selectOptions: options})
      }

     

    //   handleChange(selectedOption) {
    //       console.log("press");
    //       console.log(selectedOption)
    //     this.setState({criteria: selectedOption});
    //   }

    render() {

        // if(this.state.selected==true){
        //     const val =this.state.selectedVal
        //     this.getOptionById(val);
        // }

        
        const {
            columns,
            options,
            searchValue
        } = this.state;
        return (
          <div>
              <Select options={this.state.selectOptions} onChange={this.handleChange} />
           
              <Datalist  dataTableRef={this.dataTableRef}
                data={data}
                columns={columns}
                options={options}
                
                value={searchValue}
                onChange={this.onChangeSearch}
                />
            {/* <input
                value={searchValue}
                onChange={this.onChangeSearch}
                autoComplete={'off'}
                type="text"
                placeholder="Search ..."
            />
            <DataTable
                ref={this.dataTableRef}
                data={data}
                columns={columns}
                options={options}
            /> */}
          </div>
        );
    }
}

