import Button from '@restart/ui/esm/Button';
import React from 'react';
import {  Row, Col } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, 
    PaginationListStandalone, 
    SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { request } from '../helper/helper';
import Loading  from '../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { isUndefined } from 'util';

const { SearchBar } = Search;
export default class Datagrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false, 
            rows: []
        };
        if(this.props.showEditButton && !this.existsColumn('editar'))
        this.props.columns.push(this.getEditButton());
    }
componentDidMount(){
    this.getData();
}
getData() {
    this.setState({ loading: true });
    request
        .get(this.props.url)
        .then((response) => {
            this.setState({ 
                rows: response.data,
                loading: false,
            });
        })
        .catch((err) => {
            this.setState({ loading: false });
            console.error(err);
           
        });
    }
    existsColumn(colText){
        let col = this.props.columns.find((columns) => columns.text === colText);
        return !isUndefined(col);
    }
    getEditButton(){
        return{
            text: "editar",
            formatter: (cell, row) => {
               //console.log(row);
               return <Button onClick = {() => console.log(row)} >
                 <FontAwesomeIcon icon= {faEdit} />  
               </Button>;               
            },
        };
    }
    render() { 
        const options = {
            custom: true,
            totalSize: this.state.rows.length,
            }; 

        return (
            <>
            <Loading show={this.state.Loading} />  
            <ToolkitProvider
            keyField="tp"
            data={ this.state.rows }
            columns={ this.props.columns }
            search
            >
            {
                props => (
                <>
                    <Loading show={this.state.loading} />             
                    
                    <PaginationProvider pagination={ paginationFactory(options) }>
                        {({paginationProps,
                            paginationTableProps
                            }) => (
                            <>
                            <Row>
                                <Col>
                                <SizePerPageDropdownStandalone { ...paginationProps }/>
                                </Col>
                                <Col>
                                <SearchBar { ...props.searchProps } />
                                </Col>
                                </Row>
                                <BootstrapTable
                                keyField="bt"
                                data={ this.state.rows }
                                columns={ this.props.columns }
                                { ...paginationTableProps }
                                { ...props.baseProps }
                                />
                                <PaginationListStandalone{ ...paginationProps } />
                            </>
                            )
                        }
                        </PaginationProvider>
                    
                </>
                )
            }
            </ToolkitProvider>
            </>          
        );
    }
}
 
