import React from 'react';
// import axios from 'axios';
// import Loading from './Loading';
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'

const App = () => (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
);
// class App extends Component{
//   constructor(props) {
//       super(props);
//       this.state = {
//         users: [],
//         loading: false
//       };
//       //blind
//       this.handleSubmit = this.handleSubmit.bind(this); 
//     }

//     getUsers(){
//       this.setState({
//         loading: true
//       })
//       axios('https://api.randomuser.me/?nat=US&results=5').then(response => 
//       this.setState({
//         users: [...this.state.users, ...response.data.results],
//         loading: false
//       })
//       );
//     }

//     handleSubmit(e){
//       e.preventDefault();
//       this.getUsers();
//       console.log('more user loaded');
      
//     }
//     componentWillMount(){
//       this.getUsers()
//     }

  

//   render(){
//     const {loading, users} = this.state
//     return (
//     <div className="container"> 
//     <form onSubmit={this.handleSubmit}>
//       <input type="submit" value="load users"></input>
//     </form>
//       {!loading ? users.map(user => 
//       <div key={user.id.value}>
//       <h3 style={{color:'red'}}>{user.name.first}</h3>
//       <p>{user.email}</p>
//       <hr></hr>
//       </div>) : <Loading message = "Loaded"/>}
//     </div>);
//   }
// }

export default App;
