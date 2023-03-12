import { gql, useQuery } from "@apollo/client";
import styles from '../components/product.module.css';
import { useRouter } from 'next/router'
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import parseHtml from 'html-react-parser';
export default function productData() {

  const router = useRouter()
  const { sku } = router.query
  const PRODUCT_QUERY = gql`
  {
    products(filter: { sku: { eq: ${sku} } }) {
      total_count
      sort_fields {
        default
        options {
          label
          value
          __typename
        }
      }
      aggregations {
        count
        attribute_code
        label
        __typename
        options {
          count
          label
          value
        }
      }
      page_info {
        current_page
        page_size
        total_pages
        __typename
      }
      items {
        id
        name
        sku
        url_key
        stock_status
        new_from_date
        new_to_date
        special_price
        special_from_date
        special_to_date
        __typename
        short_description {
          html
        }
        description {
          html
        }
        sale
        new
        gender
        attribute_set_id
        meta_title
        meta_keyword
        meta_description
        manufacturer
        size
        color
        country_of_manufacture
        gift_message_available
        image {
          url
          label
        }
        small_image {
          url
          label
        }
        thumbnail {
          url
          label
        }
        swatch_image
        media_gallery {
          url
          label
        }
        categories {
          id
          name
          is_anchor
          url_key
          url_path
          level
          display_mode
          default_sort_by
          description
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
        }
        price_tiers {
          quantity
          final_price {
            value
            currency
          }
        }
      }
    }
  }
`;


  const { loading, error, data } = useQuery(PRODUCT_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const product = data.products.items.find(e => typeof e !== 'undefined')


  console.log(product);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div classNameName="row">
        <div className="container mt-5 mb-5">
          <div className="card">
            <div className="row g-0">
              <div className="col-md-6 border-end">
                <div className="d-flex flex-column justify-content-center">
                  <div className="main_image">
                    {
                      (() => {
                        if (product.image !== 'undefined') {
                          return (<img src={product.image.url} alt={product.image.label} id="main_product_image" width="350" />)
                        }
                      })()}


                  </div>
                  <div className="thumbnail_images">
                    <ul id="thumbnail">
                      
                      {product.media_gallery.map((objGallery, index) => (

                        <li><img onclick="changeImage(this)" src={objGallery.url} width="70" /></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 right-side">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{product.name}</h3> <span className="heart"><i className='bx bx-heart'></i></span>
                  </div>
                  <div className="mt-2 pr-3 content">
                    <p>{parseHtml(product.description.html)}</p>
                  </div>
                  <h3>$430.99</h3>
                  <div className="ratings d-flex flex-row align-items-center">
                    <div className="d-flex flex-row"> <i className='bx bxs-star'></i> <i className='bx bxs-star'></i> <i
                      className='bx bxs-star'></i> <i className='bx bxs-star'></i> <i className='bx bx-star'></i> </div>
                    <span>441 reviews</span>
                  </div>
                  <div className="mt-5"> <span className="fw-bold">Color</span>
                    <div className="colors">
                      <ul id="marker">
                        <li id="marker-1"></li>
                        <li id="marker-2"></li>
                        <li id="marker-3"></li>
                        <li id="marker-4"></li>
                        <li id="marker-5"></li>
                      </ul>
                    </div>
                  </div>
                  <div className="buttons d-flex flex-row mt-5 gap-3"> <button className="btn btn-outline-dark">Buy
                    Now</button> <button className="btn btn-dark">Add to Basket</button> </div>
                  <div className="search-option"> <i className='bx bx-search-alt-2 first-search'></i>
                    <div className="inputs"> <input type="text" name="" /> </div> <i className='bx bx-share-alt share' ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

