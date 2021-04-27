import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Header from './components/common/Header';
import ClassesList from './components/classes/ClassesList';
import ClassManagement from './components/classes/ClassMangaement';
import StudentAdd from './components/students/StudentAdd';


function App({ match }) {
  return (
    <div>
      <Header />
      <Switch>       
          <Route exact path="/" component={ClassesList} />     
          <Route path="/ClassManagement/:id" render={
            ({ match }) => <ClassManagement match={match} />
          } />
          <Route path="/ClassManagement" component={ClassManagement} />
          <Route path="/StudentAdd/:id" render={
            ({ match }) => <StudentAdd match={match} />
          } />
          
          <Route path="/StudentAdd" component={StudentAdd} />     
      </Switch>
    </div>
  );
}

export default App;
