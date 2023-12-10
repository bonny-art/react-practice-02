import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    search: '',
    error: null,
    page: 1,
    buttonShow: false,
  };

  searchImages = search => {
    this.setState({ search, images: [], page: 1, error: null });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { search, page } = this.state;
    try {
      const searchResult = await ImageService.getImages(search, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...searchResult.photos],
        buttonShow:
          searchResult.page <
          Math.ceil(searchResult.total_results / searchResult.per_page),
      }));
    } catch (error) {
      this.setState({ error });
    }
  };

  nextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
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
        {this.state.buttonShow && (
          <Button type="button" onClick={this.nextPage}>
            Load more
          </Button>
        )}
      </>
    );
  }
}
