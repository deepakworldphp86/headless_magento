import { gql, useQuery } from "@apollo/client";
import styles from '../components/layout.module.css';
import Link from "next/link";

export const CAT_QUERY = gql`
{
    category(id: 2) {
      products {
        total_count
        page_info {
          current_page
          page_size
        }
      }
      children_count
      children {
        id
        level
        name
        path
        children {
          id
          level
          name
          path
          children {
            id
            level
            name
            path
            children {
              id
              level
              name
              path
            }
          }
        }
      }
    }
  } 
`;


export default function category() {
  const { loading, error, data } = useQuery(CAT_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    // <ul className={styles.menu} >
    //   {data.category.children.map((cat, index) => {

    //     return <li key={index}> <Link value={cat.id} href={`/product/${cat.id}`}  >{cat.name} </Link></li>

    //   })}
    //   {/* <li>  <Link  href="/posts/pre-rendering">Pre-rendering </Link></li>
    //   <li> <Link  href="/posts/ssg-ssr" >Server-side Rendering </Link></li> */}
    // </ul>



    <div className="container-fluid">
      <button className="navbar-toggler px-0" type="button" data-mdb-toggle="collapse"
        data-mdb-target="#navbarExampleOnHover" aria-controls="navbarExampleOnHover" aria-expanded="false"
        aria-label="Toggle navigation">
        <i className="fas fa-bars"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarExampleOnHover">
        <ul className="navbar-nav me-auto ps-lg-0" >

          {data.category.children.map((cat, index) => {

            if (cat.children.length) {
              return <li className="nav-item dropdown dropdown-hover position-static">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                  data-mdb-toggle="dropdown" aria-expanded="false">
                  {cat.name}
                </a>
                <div className="dropdown-menu w-100 mt-0" aria-labelledby="navbarDropdown" >
                {cat.children.map((level1, index) => {
                  return <div className="container">
                      <div className="row my-4">
                        <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
                          <div className="list-group list-group-flush">
                            <a href={`/product/${level1.id}`} className="list-group-item list-group-item-action"> {level1.name}</a>
                            {level1.children.map((level2, index) => {
                              //console.log(level2);
                              return <a href={`/product/${level2.id}`} className="list-group-item list-group-item-action"> {level2.name}</a>
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  
                })}
                </div>
              </li>
            } else {
              return <li className="nav-item">
                <a className="nav-link" href={`/product/${cat.id}`} > {cat.name}</a>
              </li>

            }

          })}
        </ul>
      </div>
    </div>
  );
}
