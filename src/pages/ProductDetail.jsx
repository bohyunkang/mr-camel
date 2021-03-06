import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProductImage from "components/productDetail/ProductImage";
import Button from "components/common/Button";
import getProductData from "utils/getProductDetailData";
import { getProducts, setProducts } from "utils/localStorage";
import history from "../history";
import close from "assets/svg/close.svg";
import refresh from "assets/svg/refresh.svg";

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.path = window.location.pathname.split("/");

    this.state = {
      product: getProductData(this.path),
      allProducts: this.props.location.state.allProducts || [],
    };
  }

  componentDidMount() {
    if (!getProducts()) setProducts([]);

    const products = getProducts();
    const currentItem = this.state.product;
    const isExist = products
      .map((product, index) => (product.id === currentItem?.id ? index : undefined))
      .filter((el) => (el !== undefined ? `${el}` : null));

    if (isExist.length > 0) products.splice(isExist[0], 1);
    const newData = products.concat(currentItem);
    setProducts(newData);
  }

  handleDisLikeClick = () => {
    const products = getProducts();
    const currentData = products[products.length - 1];
    currentData.disLike = true;
    products.splice(products.length - 1, 1, currentData);
    setProducts(products);

    this.handleRandomClick();
  };

  handleRandomClick = () => {
    const { allProducts, product } = this.state;
    const randomNum = Math.floor(Math.random() * (allProducts.length - 1));
    const { title, brand, price, disLike } = allProducts[randomNum];

    if (`prod${randomNum}` === product.id || disLike) return () => this.handleRandomClick();

    history.push({
      pathname: `/productdetail/prod${randomNum}/${title}/${brand}/${price}/${disLike}`,
      state: { allProducts },
    });

    const productData = getProductData(this.path);
    this.setState({
      product: productData,
    });
  };

  render() {
    const { title, brand, price } = this.state.product;

    return (
      <Wrapper>
        <h3>?????? ????????? ??????</h3>
        <ProductImage />

        <div className="product-info">
          <h4>{title}</h4>
          <div>
            <span>{brand}</span>
            <span>{price}</span>
          </div>
        </div>
        <div className="button-group">
          <Button
            svg={close}
            value="????????????"
            size="large"
            color="blue"
            onClick={this.handleDisLikeClick}
          />
          <Button
            svg={refresh}
            value="???????????? ??????"
            size="large"
            onClick={this.handleRandomClick}
          />
        </div>
        <Link to={`/recentlist`}>
          <h5 className="moveto-productlist">?????? ??? ?????? ????????? ???????????? ????</h5>
        </Link>
      </Wrapper>
    );
  }
}
const Wrapper = styled.div`
  h3 {
    padding: 10px 6px;
    font-weight: 600;
    font-size: 1.25rem;
  }

  .product-info {
    padding: 12px 12px 0 12px;

    h4 {
      font-weight: 600;
      margin-bottom: 6px;
      font-size: 1.25rem;
    }

    div {
      display: flex;
      justify-content: space-between;
    }

    &:after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      margin: 12px 0;
      border-top: 1px solid ${({ theme }) => theme.color.borderline};
    }
  }

  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;

    Button + Button {
      margin-left: 12px;
    }
  }

  .moveto-productlist {
    padding: 0 12px 12px 12px;
    text-align: center;

    &:before {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      margin: 12px 0;
      border-top: 1px solid ${({ theme }) => theme.color.borderline};
    }
  }
`;

export default ProductDetail;
