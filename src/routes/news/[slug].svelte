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

    import { stores } from '@sapper/app';
    const { session } = stores();

    export let news

    function printBlog() {
        window.print()
    }

    function saveBlog() {
    }

    function shareBlog() {
    }

</script>

<svelte:head>
	<title>Blog | {news.tag}</title>
</svelte:head>

<!-- Component HTML -->

<!-- Top News Section -->
<div class="blog-header">
    <h1 class='header'> Blog </h1>
    <a href='/'>
        <img class='icon' src='./assets/svg/_news_page/back_btn.svg' alt='white_back_btn' />
    </a>
</div>

<div class='out-art'>
    <!-- Article Itself -->
    <div class='article'>
        <img class='thumb-img' src={news.img_thumb} alt='news_img' />
        <div class='blog-h'>
            <span class='blog-tag'> {news.tag} </span>
            <span class='blog-date'> {news.date} </span>
        </div>
        <p class='blog-txt'> {news.news_desc} </p>
    </div>
    <!-- Article Actions -->
    <div class='blog-actions'>
        <img on:click={printBlog} class='icon' src='./assets/svg/_news_page/print_icon.svg' alt='print_icon' />
        <img on:click={shareBlog} class='icon' src='./assets/svg/_news_page/share_icon.svg' alt='share_icon' />
        <img on:click={saveBlog} class='icon' src='./assets/svg/_news_page/fav_icon.svg' alt='fav_icon' />
    </div>
</div>

<!-- Newsletter Subscription Section -->
<EmailSubscription />

<!-- Component SASS (CSS) -->
<style lang='sass'>

    @import '../../styles/main.sass'
    
    .blog-header
        margin: 0 50px
        height: 200px
        display: flex
        justify-content: space-evenly
        flex-direction: column
    
    .out-art
        position: relative
        width: 50%
        margin: auto

    .thumb-img
        width: 100%
        height: 250px
        object-fit: cover
        border-radius: 10px

    .blog-h
        display: flex
        justify-content: space-between
        align-items: center
        height: 100px

    .blog-actions
        display: flex
        justify-content: space-between
        align-items: center
        flex-direction: column
        position: absolute
        top: 50%
        right: -10%
        height: 150px

    .blog-tag
        font: 
            family: Azonix
            size: 24px
        color: white

    .blog-txt
        font:
            family: 'Raleway', sans-serif
            size: 16px
            weight: normal
        color: #949494

    .blog-date
        font: 
            family: Azonix
            size: 24px
        color: white

    h1
        font-family: Azonix
        color: #4D4D4D

    @media print

        .icon, .header, .blog-header
            display: none

</style>