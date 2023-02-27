import { gql, useQuery } from "@apollo/client";
import styles from '../components/product.module.css';
import { useRouter } from 'next/router'
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

export default function productData() {

  const router = useRouter()
  const { id } = router.query
  const PRODUCT_QUERY = gql`
  {
    products(
      filter: {category_id: {eq:  ${id} }},
      sort: {name: ASC},
      pageSize: 20,
      currentPage: 1
    ) {
      total_count
      items {
        id
        name
        sku
        stock_status
        only_x_left_in_stock
        meta_keyword
        meta_description
        special_price
        special_from_date
        special_to_date
        attribute_set_id
        manufacturer
        special_price
        special_from_date
        
        price {
          regularPrice {
            amount {
              value
              currency
            }
          }
        }
        description {
          html
        }
        short_description {
          html
        }
        small_image {
          url
          label
          position
          disabled
        }
        thumbnail {
          url
          label
          position
          disabled
        }
        image {
          url
          label
          position
          disabled
        }
        media_gallery {
         url
          label
          position
          disabled
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
            discount {
              amount_off
              percent_off
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
            discount {
              amount_off
              percent_off
            }
          }
        }
      }
    }
  }
`;


  const { loading, error, data } = useQuery(PRODUCT_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div  class="row">
        {data.products.items.map((product, index) => (
                  <div class="item col-xs-4 col-lg-4">
                  <div class="thumbnail card">
                      <div class="img-event">
                          <img class="group list-group-image img-fluid" src={product.small_image.url} alt={product.name} />
                      </div>
                      <div class="caption card-body">
                          <h4 class="group card-title inner list-group-item-heading">
                             {product.name}</h4>
                          <p class="group inner list-group-item-text">
                          {product.description.html}</p>
                          <div class="row">
                              <div class="col-xs-12 col-md-6">
                                  <p class="lead">{product.special_price}</p>
                              </div>
                              <div class="col-xs-12 col-md-6">
                                  <a class="btn btn-success" href="http://www.jquery2dotnet.com">Add to cart</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
        ))}
      </div>
    </Layout>
  );
}

