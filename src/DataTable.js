import React from 'react';
// import $ from 'jquery';
// import 'datatables.net-dt/css/jquery.dataTables.css';
// require('datatables.net');

import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'pdfmake';
import 'datatables.net-fixedheader-dt';
import 'datatables.net-rowgroup-dt';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


require('datatables.net');

require( 'datatables.net-buttons/js/dataTables.buttons.min' );
const jzip = require( 'jzip');
require( 'datatables.net-buttons/js/buttons.html5.min' );

window.JSZip = jzip;


export default class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.datatable = null;
    }
    componentDidMount() {
        this.$el = $(this.el);
        this.dataTable = this.$el.DataTable({
            data: this.props.data,
            columns: this.props.columns,
            ...this.props.options
        });
    }

    componentWillUnmount() {
        this.dataTable.destroy(true);
    }

    // connecting search to an external component, optional but shows how to access the API
    search = (value) => {
        this.dataTable.search(value).draw();
    };

    render() {
        return <table ref={(el) => (this.el = el)} />;
    }
}