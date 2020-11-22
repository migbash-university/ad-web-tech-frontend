<script>
  const fetch = process.browser ? window.fetch : require('node-fetch').default;

	import { onMount } from "svelte"

	import UpcomingLaunch from './UpcomingLaunch.svelte'
  import CardNews from './CardNews.svelte'
  import EmailSubscription from './EmailSubscription.svelte'
  import StreamLaunchModal from './StreamLaunch.svelte'
  import NotificationConfig from './NotificationConfig.svelte'

  import {news_data} from '../../stores/dummy_news_data.js'
  import {launch_data} from '../../stores/dummy_launch_data';

  import { streamVisible } from '../../stores/stream.js';
  import { notif } from '../../stores/notification.js';

	// import MainView from './MainView/index.svelte';
	// import Tags from './Tags.svelte';
	// import * as api from 'api.js';

	// export let p = 1;

	// let tab;
	// let tag;
	// let tags;

	// function setTags({ detail }) {
	// 	tag = detail.tag;
	// 	tab = "tag";
	// }

	// onMount(async () => {
	// 	({ tags } = await api.get('tags'));
	// });

	// onMount(async () => {
	// 	var planet = planetaryjs.planet();
	// 	// You can remove this statement if `world-110m.json`
	// 	// is in the same path as the HTML page:
	// 	planet.loadPlugin(planetaryjs.plugins.earth({
	// 	topojson: { file: 'world-110m.json' }
	// 	}));
	// 	// Make the planet fit well in its canvas
	// 	planet.projection.scale(250).translate([250, 250]);
	// 	var canvas = document.getElementById('globe');
	// 	planet.draw(canvas);
  // });
  
  const fetchLaunchData = (async () => {
    const response = await fetch('http://127.168.1.0:8080/launch_data')
    // console.log(response)
    return await response.json()
  })()

	let date = new Date();
	$: hour = date.getHours();
	$: min = date.getMinutes();
  $: sec = date.getSeconds();
  $: day = date.getDate();
  $: month = monthNames[date.getDate()]
  $: year = date.getFullYear();
  let dayOrNight = 'AM';
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
	
	onMount( () => {
		const interval = setInterval(() => {
			date = new Date();
			dayOrNight = (hour >= 12) ? "PM" : "AM";
		}, 1000);
	});

	onMount( async () => {
		(function() {
      var globe = planetaryjs.planet();
      // Load our custom `autorotate` plugin; see below.
      globe.loadPlugin(autorotate(10));
      // The `earth` plugin draws the oceans and the land; it's actually
      // a combination of several separate built-in plugins.
      //
      // Note that we're loading a special TopoJSON file
      // (world-110m-withlakes.json) so we can render lakes.
      globe.loadPlugin(planetaryjs.plugins.earth({
        topojson: { file:   '/world-110m-withlakes.json' },
        oceans:   { fill:   '#000080' },
        land:     { fill:   '#339966' },
        borders:  { stroke: '#008000' }
      }));
      // Load our custom `lakes` plugin to draw lakes; see below.
      globe.loadPlugin(lakes({
        fill: '#000080'
      }));
      // The `pings` plugin draws animated pings on the globe.
      globe.loadPlugin(planetaryjs.plugins.pings());
      // The `zoom` and `drag` plugins enable
      // manipulating the globe with the mouse.
      globe.loadPlugin(planetaryjs.plugins.zoom({
        scaleExtent: [100, 300]
      }));
      globe.loadPlugin(planetaryjs.plugins.drag({
        // Dragging the globe should pause the
        // automatic rotation until we release the mouse.
        onDragStart: function() {
          this.plugins.autorotate.pause();
        },
        onDragEnd: function() {
          this.plugins.autorotate.resume();
        }
      }));
      // Set up the globe's initial scale, offset, and rotation.
      globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

      // Every few hundred milliseconds, we'll draw another random ping.
      var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
      setInterval(function() {
        var lat = Math.random() * 170 - 85;
        var lng = Math.random() * 360 - 180;
        var color = colors[Math.floor(Math.random() * colors.length)];
        globe.plugins.pings.add(lng, lat, { color: color, ttl: 2000, angle: Math.random() * 10 });
      }, 150);

      var canvas = document.getElementById('rotatingGlobe');
      // Special code to handle high-density displays (e.g. retina, some phones)
      // In the future, Planetary.js will handle this by itself (or via a plugin).
      if (window.devicePixelRatio == 2) {
        canvas.width = 800;
        canvas.height = 800;
        context = canvas.getContext('2d');
        context.scale(2, 2);
      }
      // Draw that globe!
      globe.draw(canvas);

      // This plugin will automatically rotate the globe around its vertical
      // axis a configured number of degrees every second.
      function autorotate(degPerSec) {
        // Planetary.js plugins are functions that take a `planet` instance
        // as an argument...
        return function(planet) {
          var lastTick = null;
          var paused = false;
          planet.plugins.autorotate = {
            pause:  function() { paused = true;  },
            resume: function() { paused = false; }
          };
          // ...and configure hooks into certain pieces of its lifecycle.
          planet.onDraw(function() {
            if (paused || !lastTick) {
              lastTick = new Date();
            } else {
              var now = new Date();
              var delta = now - lastTick;
              // This plugin uses the built-in projection (provided by D3)
              // to rotate the globe each time we draw it.
              var rotation = planet.projection.rotate();
              rotation[0] += degPerSec * delta / 1000;
              if (rotation[0] >= 180) rotation[0] -= 360;
              planet.projection.rotate(rotation);
              lastTick = now;
            }
          });
        };
      };

      // This plugin takes lake data from the special
      // TopoJSON we're loading and draws them on the map.
      function lakes(options) {
        options = options || {};
        var lakes = null;

        return function(planet) {
          planet.onInit(function() {
            // We can access the data loaded from the TopoJSON plugin
            // on its namespace on `planet.plugins`. We're loading a custom
            // TopoJSON file with an object called "ne_110m_lakes".
            var world = planet.plugins.topojson.world;
            lakes = topojson.feature(world, world.objects.ne_110m_lakes);
          });

          planet.onDraw(function() {
            planet.withSavedContext(function(context) {
              context.beginPath();
              planet.path.context(context)(lakes);
              context.fillStyle = options.fill || 'black';
              context.fill();
            });
          });
        };
      };
    })();
	})

</script>

<svelte:head>
	<title>AdvaSpace | Tracking Space Software</title>
</svelte:head>

<!-- Hero Section-->
<div class="grid-cont">
	<div>
		<h1> Upcoming Launches </h1>
		<p> Live Event(s)</p>
    
    <!-- {#each launch_data as item}
      <UpcomingLaunch {...item}/>
    {/each} -->

    {#await fetchLaunchData}
      <p> ... Loading Upcoming Launch Data </p>
    {:then data}
      {#each data.result as item}
        <!-- <p> {console.log(item)} </p> -->
        <UpcomingLaunch {...item}/>
      {/each}
    {:catch error}
      <p> {error} </p> 
    {/await}

    <h1 style='font-size: 12px; color: #9B9B9B;'> Load More </h1>
	</div>
  <!-- Second Container -->
	<div class='planet_div'>
		<!-- <canvas id='globe' width='500' height='500'></canvas> -->
		<canvas id='rotatingGlobe' width='400' height='400' style='width: 400px; height: 400px; cursor: move;'></canvas>
    <!-- Local Time Display -->
    <div class='time'>
      <p> Local Time </p>
      <p> {hour}:{min}:{sec} {dayOrNight} </p>
      <p> {day} {month} {year} </p>
    </div>
    <!-- Explorer Page Redirect-->
    <a rel=prefetch sapper:noscroll href='/space_explorer'>
      <button id='explorer_btn'> EXPLORER MODE <img src="./assets/svg/NextArrow_Vector.svg" alt="next-arrow-vector"/> </button>
    </a>
	</div>
</div>

<!-- Stream Video Launch Modal Box PopUp-->
{#if $streamVisible.stream}
  <StreamLaunchModal />
{/if}

<!-- Notification Setting Modal Box PopUp -->
{#if $notif.state}
  <NotificationConfig />
{/if}

<!-- In the News Section -->
<section id='news_section' class='container'>
	<h1> In the news </h1>
	{#each news_data as news}
		<CardNews comp={news.company} desc={news.news_desc} date={news.date} img={news.img_thumb} id={news.id}/>
	{/each}
</section>

<!-- Newsletter Subscription Section -->
<EmailSubscription />

<!-- Component SASS (CSS) -->
<style lang='sass'>

	@import '../../styles/main.sass'

	section
		@include flex-config($align-items: center, $justify-content: center)
		// min-height: 100vh

		.input-form
			@include flex-config($align-items: center, $justify-content: center, $flex-direction: column)

			button
				width: auto
        display: grid;

  #explorer_btn
    position: absolute
    bottom: 10px
    right: 10px

	.grid-cont
		display: grid
		align-items: center
    grid-gap: 12.5%
		justify-content: space-evenly
		grid-template-columns: 1fr 1fr
		grid-gap: 200px
    height: 100vh
    margin: auto
    width: 80%

  .planet_div
    @include flex-config($align-items: center, $justify-content: space-evenly)

    p
      font:
        family: Azonix
        size: 15px
      color: white

	h1
		font-family: Azonix
		color: white

	#news_section
		display: grid
		align-items: center
		justify-content: space-evenly
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr
		grid-column-gap: 10px

		background:
			color: black

</style>