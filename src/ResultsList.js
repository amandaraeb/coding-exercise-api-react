import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/people")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
    }
    onChangeFile = (file) => {
        console.log(file)
        var reader = new FileReader();
        var xhr = new XMLHttpRequest();
        var results = [];
        var self = this;
        reader.onload = function(evt) {
            var lines = evt.target.result.split("\n");
            var indexes = {}
            var headers = lines[0].split(",");
            headers.forEach(function(header, index){
                indexes[header] = index
            });
            console.log(indexes);
            console.log(lines);
            for (var i = 1; i < lines.length-1; i++) {
                var split_line = lines[i].split(",");
                var first_name = split_line[indexes['first_name']];
                var last_name = split_line[indexes['last_name']];
                var email_address = split_line[indexes['email_address']];
                var status = split_line[indexes['status']];
                console.log('first name: ' + first_name);
                console.log('last_name: ' + last_name);
                console.log('email: ' + email_address);
                console.log('status: ' + status);
                fetch("http://localhost:8000/api/people", {
                  method: "POST",
                  headers: { "Content-Type": "application/json"},
                  body: JSON.stringify({"first_name": first_name,
                                        "last_name": last_name,
                                        "email_address": email_address,
                                        "status": status}),})
                .then(function() { return fetch("http://localhost:8000/api/people") })
                .then(response => response.json())
                .then(data => self.setState({data: data.data }));
            }
        };
      reader.readAsText(file);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
         fetch("http://localhost:8000/api/people")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
        }
    }          

    render() {
       var data = this.state.data || [];

        return (
         <div>
        <h3> Upload People </h3>
        <input type="file" accept=".csv" onChange={e => this.onChangeFile(e.target.files[0])}/>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

              {
                  data.map((person, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                              <Table.Cell singleLine>{ person.status }</Table.Cell>
                          </Table.Row>
                      );
                    })
              }

              </Table.Body>
            </Table>
          </div>
    );
}

}

export default ResultsList
