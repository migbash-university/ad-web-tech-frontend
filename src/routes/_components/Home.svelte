<script>
  const fetch = process.browser ? window.fetch : require('node-fetch').default;
  let base = 'https://space-shadow-api.herokuapp.com';

  if (process.env.NODE_ENV != 'production') {
	  base = 'http://127.168.1.0:8080';
  }

	import { onMount } from "svelte"

  // COMPONENTS
	import UpcomingLaunch from './UpcomingLaunch.svelte'
  import CardNews from './CardNews.svelte'
  import EmailSubscription from './EmailSubscription.svelte'
  import StreamLaunchModal from './StreamLaunch.svelte'
  import NotificationConfig from './NotificationConfig.svelte'

  // DUMMY DATA
  import {news_data} from '../../stores/dummy_news_data.js';
  // import {launch_data} from '../../stores/dummy_launch_data';

  // STORES
  import { streamVisible } from '../../stores/stream.js';
  import { notif } from '../../stores/_state_notification.js';

  let showMore = false

  function loadMore() {
    showMore = !showMore
    document.getElementById('')
  }

  let launch_data;
  let live_events_count = 0;

  $:if (launch_data != undefined) {
    launch_data.result.forEach(element => {
      console.log(element)
      if (element['live']) {
        live_events_count = live_events_count + 1
      }
    });
  }

  (async () => {
    const response = await fetch(base + '/launch_data');
    launch_data = await response.json()
  })()

  // LOCAL CLOCK

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

	let date = new Date();
	$: hour = date.getHours();
	$: min = date.getMinutes();
  $: sec = date.getSeconds();
  $: day = date.getDate();
  $: month = monthNames[date.getMonth()]
  $: year = date.getFullYear();
  let dayOrNight = 'AM';
  
	onMount( () => {
		const interval = setInterval(() => {
			date = new Date();
			dayOrNight = (hour >= 12) ? "PM" : "AM";
		}, 1000);
  });
  
</script>

<!-- COMPONENT HTML START -->

<svelte:head>
	<title>AdvaSpace | Tracking Space Software</title>
</svelte:head>

<!-- 
  Hero Section
-->
<div class="grid-cont">
	<div style="display: grid; grid-template-rows: auto 1fr auto; height: 50vh; grid-gap: 35px;">

    <!-- Launch Header Data DIV -->
    <div class='header'>
      <h4> Upcoming Launches </h4>
      <span style='display: flex; align-items: center;'>
        <!-- Live Launch Status Icon-->
        <img style='width 17px; height: 17px;' src="./assets/gif/red-point-gif.gif" alt="red-point-gif" />
        <p style='cursor: pointer; color: #7E7E7E; font-weight: bold; margin-inline-start: 10px; white-space: nowrap;'> {live_events_count} live event(s) </p>
      </span>
    </div>

    <!-- Launch Cards Data -->
    <div id='launch-data-cont'>
      {#if launch_data != undefined}
        {#each launch_data.result.slice(0,3) as item}
          <UpcomingLaunch {...item}/>
        {/each}
      {/if}
      {#if showMore}
        {#each launch_data.result.slice(3,) as item}
          <UpcomingLaunch {...item}/>
        {/each}
      {/if}
    </div>

    <!-- LOAD MORE BTN -->
    {#if showMore}
      <span>
        <h5 on:click={loadMore} style='color: #9B9B9B; cursor: pointer;'> Show Less ▲ • </h5>
        <p> showing {launch_data.result.length} results </p>
      </span>
    {:else}
      <span>
        <h5 on:click={loadMore} style='color: #9B9B9B; cursor: pointer;'> Load More ▼ </h5>
        <p> showing 3 results </p>
      </span>
    {/if}
	</div>

  <!-- Second Container -->
	<div class='planet_div'>
    <!-- Local Time Display -->
    <div id='div-clock-cont'>
      <h3 style='color: #00FFD1'> Local Time </h3>
      <h1 style='color: #828282'> {hour}:{min}:{sec} {dayOrNight} </h1>
      <h1 style='color: #828282'> {day} {month} {year} </h1>
    </div>
    <!-- Explorer Page Redirect-->
    <a rel=prefetch sapper:noscroll href='/space_explorer'>
      <button id='explorer_btn'> EXPLORER MODE <img src="./assets/svg/NextArrow_Vector.svg" alt="next-arrow-vector"/> </button>
    </a>
	</div>

</div>

<!-- 
  In the News Section 
-->
<section>
  <!-- news articles showcase; -->
  <div id='div-grid-showcase-cont'>
	  <h1> In the news </h1>
    {#each news_data.slice(0,3) as news}
	  	<CardNews comp={news.tag} desc={news.news_desc} date={news.date} img={news.img_thumb} id={news.id}/>
    {/each}
      <!-- read more hyperlink; -->
    <a rel=prefetch id='a-news-more' href='/news'>
      <h5 style='color: #9B9B9B; cursor: pointer;'> Read More </h5>
    </a>
  </div>
</section>

<!-- Newsletter Subscription Section -->
<EmailSubscription />

<!-- 
  PAGE MODAL BOXES POP-UPS 
-->

<!-- Stream Video Launch Modal Box PopUp -->
{#if $streamVisible.stream}
  <StreamLaunchModal />
{/if}

<!-- Notification Setting Modal Box PopUp -->
{#if $notif.state}
  <NotificationConfig />
{/if}

<!-- Component SASS (CSS) -->
<style lang='sass'>

  @import '../../styles/main.sass'

  #div-clock-cont
    display: grid;
    grid-gap: 35px;


  .header
    display: flex
    justify-content: space-between
    align-items: center

  .input-form
    @include flex-config($align-items: center, $justify-content: center, $flex-direction: column)

    button
      width: auto
      display: grid

  #explorer_btn
    position: absolute
    bottom: 10px
    right: 10px
    align-items: center
    border-radius: 5px
    font-size: 16px
    padding: 15px
    display: flex

    &:hover
      background-color: aqua

    &:img
      margin-left: 10px

  .grid-cont
    display: grid
    align-items: center
    grid-gap: 7.5%
    justify-content: space-evenly
    grid-template-columns: 1fr 1fr
    height: 90vh
    margin: auto
    width: 80%
    position: relative

  .planet_div
    @include flex-config($align-items: center, $justify-content: space-evenly)

  section
    min-height: 100vh
    display: flex

  #div-grid-showcase-cont
    display: grid
    align-items: center
    justify-items: center
    grid-template-columns: 1fr 1fr 1fr 1fr
    grid-gap: 50px
    background-color: black
    width: 90%
    margin: auto

  #a-news-more
    grid-column: 4 / 4
    justify-self: end

  #launch-data-cont
    position: relative
    overflow-y: auto
    height: -webkit-fill-available
    display: grid
    grid-template-rows: repeat(auto-fill, minmax(200px, 1fr))
    grid-auto-flow: row

    &::-webkit-scrollbar
      display: none;

  span
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
    align-items: center
    justify-items: left

</style>