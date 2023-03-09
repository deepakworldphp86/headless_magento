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
    <ul className={styles.menu} >
      {data.category.children.map((cat, index) => (
      
        <li key={index}> <Link value={cat.id}  href={`/product/${cat.id}`}  >{cat.name} </Link></li>

      ))}
      {/* <li>  <Link  href="/posts/pre-rendering">Pre-rendering </Link></li>
      <li> <Link  href="/posts/ssg-ssr" >Server-side Rendering </Link></li> */}
    </ul>
  );
}
