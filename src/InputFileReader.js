import React, { Component } from 'react'
import ReactFileReader from 'react-file-reader';
import ResultsList from "./ResultsList";

class InputFileReader extends Component {
    
    onChangeFile = (file) => {
        console.log(file)
        var reader = new FileReader();
        var xhr = new XMLHttpRequest();
        var results = [];
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
                xhr.open("POST", "http://localhost:8000/api/people", false);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({'first_name': first_name,
                                         'last_name': last_name,
                                         'email_address': email_address,
                                         'status': status}));
            }

            
        };

        reader.readAsText(file);

    }
    
    render() {
      return (
        <input type="file"
        accept=".csv"
        onChange={e => this.onChangeFile(e.target.files[0])} />
      )
    }
}

export default InputFileReader
