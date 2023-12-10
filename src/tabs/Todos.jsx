import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };
  addTodo = text => {
    this.setState(prev => {
      return { todos: [...prev.todos, { text, id: nanoid() }] };
    });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.addTodo} />
        <Grid>
          {this.state.todos.map(({ text, id }, idx) => {
            return (
              <GridItem key={id}>
                <Todo text={text} count={idx + 1} />
              </GridItem>
            );
          })}
        </Grid>
      </>
    );
  }
}
