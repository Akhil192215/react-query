import {useQuery} from '@tanstack/react-query'
import { getPosts } from './http'


export default function Post2() {
    const postQuery = useQuery({
        queryKey:['post'],
        queryFn:() => getPosts(2)
    })

    if(postQuery.status==='loading') return <h2>Loading...</h2>
    if(postQuery.status==='error') return <h2>{JSON.parse(JSON.stringify(postQuery.error))}</h2>
    console.log(postQuery);
    
  return (
  <div>
      <div>Post2</div>
    <p>
     {postQuery.data}
    </p>
  </div>
  )
}