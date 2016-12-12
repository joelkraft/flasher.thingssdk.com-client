import React, { Component } from 'react';
import axios from 'axios';

export default class DashboardMain extends Component {
    constructor() {
        super();
        this.state = {
            manifests: [],
            manifest: {}
        };
    }

    retrieveManifest(event) {
        axios.get(event.target.parentNode.getAttribute('data-url').replace('3000', '3001'))
            .then(manifest => {
                this.setState({ manifest: manifest.data });
                console.log(this.state)
            });
    }

    componentWillMount() {
        axios.get('http://localhost:3001/v2')
            .then(manifests => { 
                this.setState({manifests: manifests.data.options});
            });
    }

    render () {
        return (
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <h1 className="page-header">Dashboard</h1>
                <h2 className="sub-header">Manifests</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Version</th>
                                <th>Board</th>
                                <th>Revision</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.manifests.reduce((arr, man) => {
                                const jsxArray = man.versions.map(v => {
                                    return (
                                        <tr 
                                          key={v.manifest}
                                          data-url={v.manifest}
                                          onClick={this.retrieveManifest.bind(this)}>
                                            <td>{man.name}</td>
                                            <td>{v.version}</td>
                                            <td>{v.board}</td>
                                            <td>{v.revision}</td>
                                        </tr>
                                    );
                                });
                                return arr.concat(jsxArray);
                            }, [])}
                        </tbody>
                    </table>
                </div>
            </div>
      );
  }
}