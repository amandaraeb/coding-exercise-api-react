import React, { Component } from 'react'
import ReactFileReader from 'react-file-reader';
import { Table } from 'semantic-ui-react'

class GroupsList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/groups")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
    }

    onChangeFile = (file) => {

      console.log(file)
        var reader = new FileReader();
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
                var group_name = split_line[indexes['group_name']];
                fetch("http://localhost:8000/api/groups", {
                  method: "POST",
                  headers: { "Content-Type": "application/json"},
                  body: JSON.stringify({"group_name": group_name}),})
                .then(function() {
                    return fetch("http://localhost:8000/api/groups")
                })
                .then(response => response.json())
                .then(data => self.setState({data: data.data }));
            }
        };

        reader.readAsText(file);

    }

    render() {
        var data = this.state.data || [];

        return (
           <div>
            <h3>Upload Groups</h3>
            <input type="file"
            accept=".csv"
            onChange={e => this.onChangeFile(e.target.files[0])}/>
           <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Group Name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

              {
                  data.map((group, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell singleLine>{ group.group_name }</Table.Cell>
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

export default GroupsList
