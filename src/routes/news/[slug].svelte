<script context="module">
    import { news_data } from '../../stores/dummy_news_data.js'

	export async function preload({ params }) {
        const { slug } = params;
        const news = news_data[slug];
        // const { article } = await api.get(`articles/${params.slug}`, null);

		return { news };
	}
</script>

<script>
    import EmailSubscription from '../_components/EmailSubscription.svelte'

	import { post_non_auth } from 'utils.js';

    import { stores, goto } from '@sapper/app';
    const { session } = stores();

    export let news
    
    let uid;

    if (uid != undefined) {
        uid = $session.user.uid
    }

    let news_id = news.id

    function printBlog() {
        window.print()
    }

    /**
	 * Save Function for an authenticated user,
	 * to be able to save a news / blog into their favourites,
     * onto their database, with the users 'uid' token,
     *  
	 * @param event
	 */
	async function saveToFavNews(event) {
        
        if (uid == undefined) {
            goto('/login') 
            return
        }

        const response = await post_non_auth('http://127.168.1.0:8080/news_fav', { uid, news_id });
        console.log(response)
	}

    function shareBlog() {
    }

</script>

<svelte:head>
	<title> News | {news.tag} </title>
</svelte:head>

<!-- Component HTML -->
<div id='div-grid-showcase-cont'>

    <!-- Top News Section -->
    <div id="div-blog-header-cont">
        <h1> News </h1>
        <!-- return btn; -->
        <a rel=prefetch href='/news'>
            <div id='div-return-cont'>
                <img class='icon' src='./assets/svg/_news_page/back_btn.svg' alt='white_back_btn' />
                <h5> Return </h5> 
            </div>
        </a>
    </div>

    <div id='div-article-wrapper-cont'>
        <!-- Article Itself -->
        <div class='article'>
            <img class='thumb-img' src={news.img_thumb} alt='news_img' />
            <div class='blog-h'>
                <h2> {news.tag} </h2>
                <h2> {news.date} </h2>
            </div>
            <p class='blog-txt'> {news.news_desc} </p>
        </div>
        <!-- Article Actions -->
        <div class='blog-actions'>
            <img on:click={printBlog} class='icon' src='./assets/svg/_news_page/print_icon.svg' alt='print_icon' />
            <img on:click={shareBlog} class='icon' src='./assets/svg/_news_page/share_icon.svg' alt='share_icon' />
            <img on:click={saveToFavNews} class='icon' src='./assets/svg/_news_page/fav_icon.svg' alt='fav_icon' />
        </div>
    </div>

</div>

<!-- Newsletter Subscription Section -->
<EmailSubscription />

<!-- Component SASS (CSS) -->
<style>

    #div-grid-showcase-cont {
        min-height: 90vh;
        display: grid;
        grid-auto-rows: auto 1fr;
        padding: 5%;
        width: 80%;
        margin: auto;
        grid-gap: 50px;
        align-items: center;
    }
        
    #div-blog-header-cont {
        
    }
    
    #div-article-wrapper-cont {
        position: relative;
        width: 75%;
        margin: auto;
    }

    .thumb-img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 10px;
    }

    .blog-h {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
    }

    .blog-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        position: absolute;
        top: 50%;
        right: -10%;
        height: 150px;
    }

    .blog-txt {
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        font-weight: normal;
        color: #949494;
    }   

    @media print {
        .icon {
            display: none;
        }
    }

</style>