// [x] Loader
// [x] Filter by price
// [x] Sort functionality
// [x] Filter responsive
// TODO Code cleanup

import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import { useDispatch } from 'react-redux';

import ProductSearch from '../../component/ProductSearch/ProductSearch';
import { Redirect } from 'react-router-dom';
import { axiosErrorHandler } from '../../utils/errorHandlers';
import axios from 'axios';
import LoadingPage from '../Loading/LoadingPage';
import { sortByFrequencyAndRemoveDuplicates } from '../../utils/arrayHelpers';

import ComputerImage from '../../assests/images/computer.png';
import { activateAlert } from '../../component/Alert/alertSlice';
import Loader from '../../component/Loader/Loader';

const SearchPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [axiosLoading, setAxiosLoading] = useState(false);

  const [productsCount, setProductsCount] = useState(-1);
  const [searchInput, setSearchInput] = useState(match.params.query || '');
  const [sortInput, setSortInput] = useState('');

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filterObject, setFilterObject] = useState({});
  const [searchFilterObject, setSearchFilterObject] = useState({
    price: {},
    filter: {},
  });

  useEffect(() => {
    getSearchProducts();
  }, []);

  useEffect(() => {
    setFilter();
  }, [products]);

  useEffect(() => {
    onSearchFilterObjectChange();
  }, [searchFilterObject]);

  // if (!match.params.query) return <Redirect to='/home' />;

  // Get Products from Backend
  const getSearchProducts = async () => {
    setSearchFilterObject({ ...searchFilterObject, filter: {} });
    setFilterObject({});

    if (!match.params.query) {
      setProductsCount(0);
      return;
    }

    setAxiosLoading(true);
    setProductsCount(0);
    try {
      const res = await axios.get(
        `/api/v1/products/search/${searchInput || match.params.query}`
      );
      setAxiosLoading(false);
      setProducts(res.data.data.products);
      setProductsCount(res.data.result);
    } catch (error) {
      setAxiosLoading(false);
      axiosErrorHandler(error, dispatch);
    }
  };

  // SET FILTER OBJECT
  const setFilter = () => {
    let tempArray = [];
    let obj = {};

    const priceArray = products.map((cur) => cur.price);

    // Set min, max price
    setSearchFilterObject({
      ...searchFilterObject,
      price: { min: Math.min(...priceArray), max: Math.max(...priceArray) },
    });

    // 1. Get all property names
    products.forEach((cur) => {
      tempArray = [...tempArray, ...Object.keys(cur.properties)];
    });

    // 2. Get each property name value
    sortByFrequencyAndRemoveDuplicates(tempArray).forEach((prop) => {
      obj[prop] = [];
      products.forEach((cur) => {
        if (cur.properties.hasOwnProperty(prop))
          obj[prop] = [...obj[prop], ...cur.properties[prop]];
      });
      obj[prop] = sortByFrequencyAndRemoveDuplicates(obj[prop]);
    });

    // 3. Set filterObject
    setFilterObject(obj);
  };

  // HANDLE SEARCH FILTER OBJECT
  const onSearchFilterObjectChange = () => {
    if (products.length === 0) return;
    const tempArray = [];
    const filterArray = products.map(
      (
        product // Filter by price
      ) => {
        if (
          product.price < searchFilterObject.price.min ||
          product.price > searchFilterObject.price.max
        ) {
          return 0;
        } else {
          return 1;
        }
      }
    );
    const keys = Object.keys(searchFilterObject.filter);

    // If searchFilterObject is empty, return
    // if (keys.length === 0) {
    //   setProductsCount(products.length);
    //   return;
    // }

    // Loop over products
    products.forEach((product, index) => {
      keys.forEach((key) => {
        if (filterArray[index] === 0) return;

        if (product.properties.hasOwnProperty(key)) {
          const filteredArray = searchFilterObject.filter[key].filter((value) =>
            product.properties[key].includes(value)
          );

          filterArray[index] = filteredArray.length > 0 ? 1 : 0;
        } else {
          filterArray[index] = 0;
          return;
        }
      });
    });
    filterArray.forEach(
      (cur, index) => cur === 1 && tempArray.push(products[index])
    );

    setFilteredProducts(tempArray);
    setProductsCount(tempArray.length);
  };

  // HANDLE CHECKBOX ONCHANGE
  const handleCheckbox = (e, key, value) => {
    let temp = searchFilterObject.filter[key] || [];
    if (e.target.checked) temp.push(value);
    else {
      const index = temp.indexOf(value);
      temp.splice(index, 1);
    }
    if (temp.length === 0) {
      const obj = searchFilterObject.filter;
      delete searchFilterObject.filter[key];
      setSearchFilterObject({ ...searchFilterObject, filter: { ...obj } });
    } else
      setSearchFilterObject({
        ...searchFilterObject,
        filter: { ...searchFilterObject.filter, [key]: temp },
      });

    console.log(searchFilterObject);
  };

  // Handle Search Button
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.length === 0) {
      dispatch(activateAlert('Enter something to search'));
      return;
    }
    history.push(searchInput.split(' ').join('-').toLowerCase());
    getSearchProducts();
  };

  const handleSortChange = (e) => {
    setSortInput(e.target.value);
  };

  return (
    <>
      {productsCount !== -1 ? (
        <div className='search container'>
          {products.length > 0 && !axiosLoading && (
            <div className={`search-filter ${showFilter && 'search-show'}`}>
              <div
                className='search-text-filter u-mb-small'
                onClick={() => setShowFilter(!showFilter)}
              >
                Apply
              </div>
              <h1 className='search-heading'>Price</h1>
              <div className='search-price-container'>
                <input
                  type='text'
                  className='search-price-input'
                  value={searchFilterObject.price.min}
                  onChange={(e) =>
                    setSearchFilterObject({
                      ...searchFilterObject,
                      price: {
                        ...searchFilterObject.price,
                        min: e.target.value.replace(/\D/, ''),
                      },
                    })
                  }
                />
                <p className='search-text search-text-to'>to</p>
                <input
                  type='text'
                  className='search-price-input'
                  value={searchFilterObject.price.max}
                  onChange={(e) =>
                    setSearchFilterObject({
                      ...searchFilterObject,
                      price: {
                        ...searchFilterObject.price,
                        max: e.target.value.replace(/\D/, ''),
                      },
                    })
                  }
                />
              </div>

              {Object.keys(filterObject).map((key) => (
                <div className='search-filter-container'>
                  <h1 className='search-heading'>
                    {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </h1>
                  {filterObject[key].map((values) => (
                    <div className='search-checkbox-container'>
                      <input
                        type='checkbox'
                        id={values}
                        className='search-checkbox'
                        onChange={(e) => handleCheckbox(e, key, values)}
                      />
                      <label
                        htmlFor={values}
                        className='search-checkbox-label noselect'
                      >
                        {values}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className={`search-body ${showFilter && 'search-hide'}`}>
            <form className='search-input-container'>
              <input
                type='text'
                className='search-input'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className='search-button'
                onClick={(e) => handleSearch(e)}
              >
                Search
              </button>
            </form>
            {axiosLoading ? (
              <Loader classes='loader-center' />
            ) : (
              <>
                {products.length > 0 && (
                  <>
                    <div className='search-header'>
                      <p className='search-text'>
                        {productsCount} total results found
                      </p>
                      <div className='search-header-container'>
                        <p
                          className='search-text search-text-filter'
                          onClick={() => setShowFilter(!showFilter)}
                        >
                          Apply Filters
                        </p>
                        <div className='search-select-container'>
                          <p className='search-text'>Sort by:</p>
                          <select onChange={handleSortChange} value={sortInput}>
                            <option value='relevance'>Relevance</option>
                            <option value='price-low'>Price Low to High</option>
                            <option value='price-high'>
                              Price High to Low
                            </option>
                            <option value='rating-low'>
                              Rating Low to High
                            </option>
                            <option value='rating-high'>
                              Rating High to Low
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className='search-prod-container'>
                  {products.length === 0 ? (
                    <div className='search-product-error'>
                      <img
                        src={ComputerImage}
                        alt='computer'
                        className='search-computer-image'
                      />
                      <p className='search-computer-message'>
                        Sorry, nothing match your search, Please try some other
                        keywords
                      </p>
                    </div>
                  ) : Object.keys(searchFilterObject.filter).length !== 0 &&
                    filteredProducts.length === 0 ? (
                    <div className='search-filter-error'>
                      <img
                        src={ComputerImage}
                        alt='computer'
                        className='search-computer-image'
                      />
                      <p className='search-computer-message'>
                        We don't have any product with the applied filters
                      </p>
                    </div>
                  ) : (
                    [...filteredProducts]
                      .sort((a, b) => {
                        if (sortInput === 'relevance') return;
                        else if (sortInput === 'price-low')
                          return a.price - b.price;
                        else if (sortInput === 'price-high')
                          return a.price + b.price;
                        else if (sortInput === 'rating-low')
                          return a.rating - b.rating;
                        else if (sortInput === 'rating-high')
                          return a.rating + b.rating;
                        else return;
                      })
                      .map((cur, index) => (
                        <ProductSearch
                          key={index}
                          productId={cur._id}
                          image={cur.images[0]}
                          name={cur.name}
                          shortInfo={cur.shortInfo}
                          ratingAverage={cur.ratingAvg}
                          ratingQuantity={cur.ratingQty}
                          price={cur.price}
                          oldPrice={cur.oldPrice}
                        />
                      ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <Loader classes='loader-center' />
      )}
    </>
  );
};

export default SearchPage;
