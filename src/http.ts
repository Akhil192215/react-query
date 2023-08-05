import axios from 'axios'

export function getPosts(post:number){
    return axios.get(`https://dummyjson.com/posts/${post}`,)
    .then(res => res.data.body)
}