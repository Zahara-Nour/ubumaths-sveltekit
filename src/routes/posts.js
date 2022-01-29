import ghostAPI from '$lib/ghost'

export async function get() {
    // const res = await fetch('https://blog.ubumaths.net/ghost/api/v3/content/posts/?key=8f04d2c9a197a6c0097316afd5');
    const res = await ghostAPI.posts.browse({limit:3});
  
 
    // const data = await res.json();
    // console.log(res)

    return { body: JSON.stringify(res) };
    // return { body: data };
}