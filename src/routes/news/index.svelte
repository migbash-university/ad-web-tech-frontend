<script>
	import CardNews from '../_components/CardNews.svelte'
    import {news_data} from '../../stores/dummy_news_data.js'
</script>

<svelte:head>
	<title>AdvaSpace | News</title>
</svelte:head>

<!-- Component HTML -->
<div>
    <h1> News </h1>
    <div class='grid-view'>
        {#each news_data as news}
            <CardNews comp={news.company} desc={news.news_desc} date={news.date} img={news.img_thumb} id={news.id}/>
        {/each}
    </div>
</div>

<!-- Component SASS (CSS) -->
<style lang='sass'>

    h1
        font-family: Azonix
        color: white

    .grid-view
        display: grid
        grid-template-columns: 1fr 1fr 1fr 1fr
        width: 80%;
        margin: auto
        grid-gap: 2.5%

</style>