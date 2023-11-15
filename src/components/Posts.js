import { useState, useEffect } from 'react'
import Post from './Post'

function Posts() {
    const [arrayPosts, setArrayPosts] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts'
                )
                const json = await response.json()
                setArrayPosts(json)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    if (error) {
        return <h1>Error: {error}</h1>
    }

    return (
        <>
            <h1>--- Posts ---</h1>
            <hr />

            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                arrayPosts.map((post) => <Post {...post} key={post.id} />)
            )}
        </>
    )
}

export default Posts
