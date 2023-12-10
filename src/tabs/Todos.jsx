import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('value', JSON.stringify(this.state.todos));
    }
  }

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('value'));
    if (todos) {
      this.setState({ todos });
    }
  }

  addTodo = text => {
    this.setState(prev => {
      return { todos: [...prev.todos, { text, id: nanoid() }] };
    });
  };

  removeTodo = id => {
    this.setState(prev => {
      return {
        todos: prev.todos.filter(todo => {
          return todo.id !== id;
        }),
      };
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
                <Todo
                  text={text}
                  count={idx + 1}
                  removeTodo={this.removeTodo}
                  id={id}
                />
              </GridItem>
            );
          })}
        </Grid>
      </>
    );
  }
}
