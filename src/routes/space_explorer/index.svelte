<script context="module">
	export async function preload({ params }) {
        // const { slug } = params;
        // const news = news_data[slug];
        // const { article } = await api.get(`articles/${params.slug}`, null);
        // Your License Key is XGJFPA-WUQ254-VFTFK6-4LG0

        // const response = await fetch('https://api.n2yo.com/rest/v1/satellite//tle/{id}&apiKey={XGJFPA-WUQ254-VFTFK6-4LG0}')
        // return await response.json()
	}
</script>

<script>
    import { onMount } from "svelte"

    import { satellite_data } from '../../stores/_satellite_data.js'
    import { nasaDataTLE } from '../../stores/_nasa_tle_data.js'

    let date = new Date();
	$: hour = date.getHours();
	$: min = date.getMinutes();
    $: sec = date.getSeconds();
    $: day = date.getDate();
    $: month = monthNames[date.getDate()]
    $: year = date.getFullYear();
    let dayOrNight = 'AM';
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
	
	onMount( () => {
		const interval = setInterval(() => {
			date = new Date();
			dayOrNight = (hour >= 12) ? "PM" : "AM";
		}, 1000);
	});
    
    // Reference to the outside
    let viz, n;

    onMount(async () => {
        // Create the visualization and put it in our div.
        viz = new Spacekit.Simulation(document.getElementById('main-container'), {
            basePath: 'https://typpo.github.io/spacekit/src',
            jdPerSecond: 1
        });
        viz.createStars();
    });

    let earth;
    let sat_obj = []
    let all_obj = []

    const toggleEarth = () => {
        clearSimulation()

        earth = viz.createSphere('earth', {
            textureUrl: './assets/img/earth_66mya.jpg',
            debug: {
                showAxes: false,
            },
        });

        all_obj.push(earth)
    }

    const toggleEarthSat = () => {
        var val;
        if (sat_obj.length == 0) {
            for (val in nasaDataTLE[0].member) {
                
                // Convert TLW Sat Data to Useful Coordinates for SpaceKitJs
                var tleLine1 = nasaDataTLE[0].member[val].line1,
                tleLine2 = nasaDataTLE[0].member[val].line2

                // Initialize a satellite record
                var satrec = satellite.twoline2satrec(tleLine1, tleLine2);

                var spaceship = viz.createObject(nasaDataTLE[0].member[val].name, {
                    labelText: nasaDataTLE[0].member[val].name,
                    ephem: new Spacekit.Ephem({ 
                        a: satrec.a, 
                        e: satrec.ecco, 
                        i: satrec.inclo,
                        w: 5,
                        om: 50,
                        ma: satrec.mo, 
                        n: satrec.no,
                        epoch: satrec.jdsatepoch }, 'rad'),
                });
                // Store data in a spearate sat_obj
                sat_obj[val] = spaceship
                spaceship.orbitAround(earth);
            }
        } else {
            for (n in sat_obj) {
                viz.removeObject(sat_obj[n])
            }
            sat_obj = []
        }
    }

    const toggleMoon = () => {
        clearSimulation()

        const moon = viz.createSphere('earth', {
            textureUrl: './assets/img/moon_surface.jpg',
            debug: {
                showAxes: false,
            },
        });

        all_obj.push(moon)
    }

    const toggleGalaxy = () => {
        clearSimulation()

        const sun = viz.createObject('sun', Spacekit.SpaceObjectPresets.SUN);
        const mercury =  viz.createObject('mercury', Spacekit.SpaceObjectPresets.MERCURY);
        const venus =  viz.createObject('venus', Spacekit.SpaceObjectPresets.VENUS);
        const earth =  viz.createObject('earth', Spacekit.SpaceObjectPresets.EARTH);
        const mars =  viz.createObject('mars', Spacekit.SpaceObjectPresets.MARS);
        const jupiter =  viz.createObject('jupiter', Spacekit.SpaceObjectPresets.JUPITER);
        const saturn =  viz.createObject('saturn', Spacekit.SpaceObjectPresets.SATURN);
        const uranus =  viz.createObject('uranus', Spacekit.SpaceObjectPresets.URANUS);
        const neptune =  viz.createObject('neptune', Spacekit.SpaceObjectPresets.NEPTUNE);

        all_obj.push([sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune])
    }

    const clearSimulation = () => {
        for (n in all_obj) {
            viz.removeObject(all_obj[n])
        }
    }

    const filterSatellites = () => {
    }

</script>

<!-- Component HTML -->
<div id='outer-container'> 

    <!-- Canvas For Galaxy -->
    <div id='main-container'></div>

    <!-- Local Time Display -->
    <div id='time_cont'>
      <p> Local Time </p>
      <p> {hour}:{min}:{sec} {dayOrNight} </p>
      <p> {day} {month} {year} </p>
    </div>

    <!-- Back Home Button Page Redirect -->
    <a rel=prefetch sapper:noscroll href='/'>
      <button id='explorer_btn'> EVENTS Tracker <img src="./assets/svg/NextArrow_Vector.svg" alt="next-arrow-vector"/> </button>
    </a>

    <!-- Galaxay Search Options Menu -->
    <div id='btn-menu'>
        <button on:click={toggleEarthSat}> Show Satellites </button>
        <button on:click={toggleEarth}> Earth </button>
        <button on:click={toggleMoon}> Moon </button>
        <button on:click={toggleGalaxy}> Solar System </button>
        <button> Missions </button>
    </div>
</div>

<!-- Component SASS (CSS) -->

<style>
    #outer-container {
        position: relative;
    }

	#main-container {
		height: 100vh;
    }

    #time_cont {
        position: absolute;
        margin: auto;
        top: 0;
        right: 0;
        left: 0;
        text-align: center;
        font-family: Azonix;
        font-size: 12px;
        color: white;
    }

    #explorer_btn {
        background-color: white;
        border-radius: 10px;
        position: absolute;
        bottom: 50px;
        left: 50px;
    }

    #btn-menu {
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
    }
    
</style>