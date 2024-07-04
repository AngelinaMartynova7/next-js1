import Post from '@/app/components/Post'

export async function generateStaticParams() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();

    const params=posts.map(post => ({
        id: post.id.toString(),
    }));
    
    console.log(params);

    return params;
}

export async function generateMetadata({ params }) {
    const post = await fetchData(params.id)
    return {
        title: `$post.title - Статья на сайте`,
        description: post.body,
    }
}

async function fetchData(id) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
  const result = await res.json();
  return result;
}


const PagePost = async ({ params }) => {
    const post = await fetchData(params.id);
    return (
        <div className="post">
            <Post post={post} />
           
        </div>
    )
}

export default PagePost