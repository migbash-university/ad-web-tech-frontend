<script>
    import CardNews from '../_components/CardNews.svelte'
    import EmailSubscription from '../_components/EmailSubscription.svelte'
    
    import {news_data} from '../../stores/dummy_news_data.js'
</script>

<svelte:head>
	<title>AdvaSpace | News</title>
</svelte:head>

<!-- Component HTML -->
<div id='div-grid-showcase-cont'>
    <span> 
        <h1> News </h1> 
    </span>
    {#each news_data as news}
        <CardNews comp={news.company} desc={news.news_desc} date={news.date} img={news.img_thumb} id={news.id}/>
    {/each}
</div>

<!-- Newsletter Subscription Section -->
<EmailSubscription />

<!-- Component SASS (CSS) -->
<style>

    #div-grid-showcase-cont {
        min-height: 90vh;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width: 80%;
        margin: auto;
        grid-gap: 50px;
        align-items: center;
        justify-items: center;
    }

    #div-grid-showcase-cont span {
        grid-column: 1 / 5;
    }

</style>