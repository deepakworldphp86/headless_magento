import { gql, useQuery } from "@apollo/client";

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


export default function Navigation() {
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
    <div>
      <header>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
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
                      <a className="nav-link dropdown-toggle font-weight-bold text-uppercase" href="#" id="navbarDropdown" role="button"
                        data-mdb-toggle="dropdown" aria-expanded="false">
                        {cat.name}
                      </a>
                      <div className="dropdown-menu w-50 mt-0" aria-labelledby="navbarDropdown" >
                        <div className="container">
                          <div className="row my-4">
                            {cat.children.map((level1, index) => {
                              return <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
                                <div className="list-group list-group-flush">
                                  <a href={`/category/${level1.id}`} className="font-weight-bold text-uppercase list-group-item list-group-item-action"> {level1.name}</a>
                                  {level1.children.map((level2, index) => {
                                    //console.log(level2);
                                    return <a href={`/category/${level2.id}`} className="list-group-item list-group-item-action"> {level2.name}</a>
                                  })}
                                </div>
                              </div>
                            })}
                          </div>
                        </div>
                      </div>
                    </li>
                  } else {
                    return <li className="nav-item">
                      <a className="font-weight-bold text-uppercase nav-link" href={`/category/${cat.id}`} > {cat.name}</a>
                    </li>

                  }

                })}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
