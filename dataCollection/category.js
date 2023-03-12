import { gql, useQuery } from "@apollo/client";
import styles from '../components/product.module.css';
import { useRouter } from 'next/router'
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import parseHtml from 'html-react-parser';
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
      <div className="row">
        {data.products.items.map((product, index) => (
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="card-img-actions">

                  <a href={`/product/${product.sku}`}><img className="card-img img-fluids" width="96" height="350" src={product.small_image.url} alt={product.name} /> </a>

                </div>
              </div>

              <div className="card-body bg-light text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <a href="#" className="text-default mb-2" data-abc="true"> {parseHtml(product.short_description.html)} </a>
                  </h6>

                  <a href="#" className="text-muted" data-abc="true">{product.name}</a>
                </div>

                <h3 className="mb-0 font-weight-semibold">{product.special_price}</h3>

                <div>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                  <i className="fa fa-star star"></i>
                </div>

                <div className="text-muted mb-3">34 reviews</div>

                <button type="button" className="btn bg-cart"><i class="fa fa-cart-plus mr-2"></i> Add to cart</button>


              </div>
            </div>




          </div>
        ))}
      </div>
    </Layout>
  );
}

