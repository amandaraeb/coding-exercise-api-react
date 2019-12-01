import React, { Component } from 'react'
import ReactFileReader from 'react-file-reader';
import ResultsList from "./ResultsList";

class GroupInputFileReader extends Component {
    
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
                var group_name = split_line[indexes['group_name']];
                xhr.open("POST", "http://localhost:8000/api/groups", false);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({'group_name': group_name}));
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

export default GroupInputFileReader
