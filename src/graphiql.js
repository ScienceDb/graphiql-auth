import React from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import './graphiql.css';


class MyGraphiQL extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: true
    }
    this.server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/graphql';
  }


  checkLoggin = () =>{

    let expires = new Date(localStorage.getItem('expirationDate')) < new Date();
    return (!!localStorage.getItem('token') &&  !expires);
  }

  graphQLFetcher = (graphQLParams)=> {
    let headers = { 'Content-Type': 'application/json' };

    if(this.checkLoggin()){
      headers['Authorization'] = 'Bearer '+ localStorage.getItem('token');
    }else{
      this.props.loginHandler(false);
      return;
    }

   return fetch(this.server_url, {
     method: 'post',
     headers: headers,
     body: JSON.stringify(graphQLParams),
   }).then(response => response.json(), error => {
     console.log("ERROR:", error);
   });
  }

  render() {
      return(
       <GraphiQL fetcher={this.graphQLFetcher} />
      );


  }

}

export default MyGraphiQL;
