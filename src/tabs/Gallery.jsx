import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    search: '',
    error: null,
    page: 1,
  };

  searchImages = search => {
    this.setState({ search });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { search, page } = this.state;
    try {
      const searchResult = await ImageService.getImages(search, page);
      this.setState({ images: searchResult.photos });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    return (
      <>
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
        <SearchForm onSubmit={this.searchImages} />

        <Grid>
          {this.state.images.map(({ id, avg_color, alt, src: { large } }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
