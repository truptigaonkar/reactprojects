import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Style from './Productsearch.module.css';
import { PRISJAKTPRODUCT_URL } from '../config';
import Productlist from './Productlist';
import Footer from '../Footer';
import Alert from '../Alert';

class Productsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      products: [],
      alertShow: false,
    };
  }

  getProduct = (e) => {
    e.preventDefault();
    const productToSearch = e.target.elements.product.value;
    axios
      .post(`${PRISJAKTPRODUCT_URL}?q=product.name:${productToSearch}`)
      .then((res) => {
        console.log(res.status);
        this.setState({
          products: res.data.hits.hits,
          alertShow: false,
        });
        if (res.status === 200) {
          this.setState({ errorMessage: 'Empty array' });
        }
      })
      .catch((error) => {
        console.log('new', error);
        if (error.response.status === 400) {
          this.setState({
            errorMessage: 'Please fill in the Product Name',
            alertShow: true,
          });
        } else {
          this.setState({
            errorMessage: 'Something went wrong',
            alertShow: true,
          });
        }
      });
    e.target.reset(); // making input empty
  };

  render() {
    const { alertShow } = this.state;
    const { errorMessage } = this.state;
    const { products } = this.state;
    if (products === null) {
      return <p>Fetching product...</p>;
    }
    return (
      <div>
        <Helmet>
          <title>Product Search</title>
        </Helmet>
        <Alert alertShow={alertShow} errorMessage={errorMessage} />
        <div className={Style.form}>
          <form onSubmit={this.getProduct}>
            <input
              type="text"
              id="product"
              className={Style.form__field}
              placeholder="Search product here...."
            />
            <label htmlFor="product" className={Style.form__label}>
              Search product here....
            </label>
          </form>
        </div>
        <Productlist products={products} />
        <Footer href="https://dev.prisjakt.nu/doc/api/v1/" title="Prisjakt API" />
      </div>
    );
  }
}

export default Productsearch;
