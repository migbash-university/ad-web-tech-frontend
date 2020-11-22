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
    import { stores } from '@sapper/app';
    const { session } = stores();

    export let news
</script>

<svelte:head>
	<title>{news.company}</title>
</svelte:head>

<!-- Component HTML -->

<!-- Top News Section -->
<div>
    <h1> Blog </h1>
    <a href='/'>
        <img class='icon' src='./assets/svg/_news_page/back_btn.svg' alt='white_back_btn' />
    </a>
</div>

<div class='container'>
    <!-- Article Itself -->
    <div class='conatiner article'>
        <img src={news.img_thumb} alt='news_img' />
        <p> {news.news_desc} </p>
        <p> {news.date} </p>
    </div>
</div>

<!-- Component SASS (CSS) -->
<style lang='sass'>
    
    div
        // margin: auto
        // postion: absolute
        // top: 0
        // bottom: 0
        // right: 0
        // left: 0

    // img
    //     width: 100%
    //     height: 200px
    //     object-fit: cover
    //     border-radius: 10px

    h1
        font-family: Azonix
        color: #4D4D4D

</style>