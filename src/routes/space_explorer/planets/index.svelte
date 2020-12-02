<script>

    // SVELTE IMPORTS
    import { onMount } from "svelte"
    
    import { fade } from 'svelte/transition';

    // DUMMY DATA;
    // import { satellite_data } from '../../../stores/_data_satellite.js'
    import { nasaDataTLE } from '../../../stores/_data_nasa_tle.js'
    import { earth_markers } from '../../../stores/_data_earth_markers.js'
    import { planet_data } from '../../../stores/_data_planet_insight.js'

    // REAL DATA;

    export let segment;
    console.log('Space Explorer: ' + segment)

    // ~~~~~~~~~~~~~~
    // Local Clock
    // ~~~~~~~~~~~~~~

    let date = new Date();
	$: hour = date.getHours();
	$: min = date.getMinutes();
    $: sec = date.getSeconds();
    $: day = date.getDate();
    $: month = monthNames[date.getMonth()]
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
    
    // ~~~~~~~~~~~~~~
    // SPACEKIT-JS SIMULATION INTEGRATION
    // ~~~~~~~~~~~~~~

    let viz, n;
    let viz_option;
    let earthPinsView = false;

    onMount(async () => {
        recreateSimulation();
    });

    const recreateSimulation = () => {
        // Create the visualization and put it in our div.
        viz = new Spacekit.Simulation(document.getElementById('main-container'), {
            basePath: 'https://typpo.github.io/spacekit/src',
            jdPerSecond: 1
        });
        viz.createStars();
    }

    let earth;       // global paramater for satellite selection and targeting,
    let sat_obj = [] // all EARTH satellite ONLY,
    let all_obj = [] // all visualization objects,

    let planet_info;
    let sat_info;

    let sat_counter = 0;

    /**
     * Funtion - Assign a variable the data for the target planet data;
     * @param planet_name
     */
    const loadPlanetInfo = (planet_name) => {
        planet_data.forEach(elem => {
            if (elem.planet == planet_name) {
                planet_info = elem
            }
        })
    }

    /**
     * Function - Renders the Earth alone
     */
    const toggleEarth = () => {

        viz_option = 'earth'

        clearSimulation()

        earth = viz.createSphere('earth', {
            textureUrl: './assets/img/earth_66mya.jpg',
            debug: {
                showAxes: false,
            },
        });

        all_obj.push(earth)
        loadPlanetInfo('Earth')
    }

    /**
     * Function - Renders the Artificial Satellites of EARTH
     */
    const toggleEarthSat = () => {
        
        viz_option = 'earth_sat';
        var val;
        sat_obj = []

        if (sat_obj.length == 0) {
            for (val in nasaDataTLE[0].member) {
                
                // Convert TLW Sat Data to Useful Coordinates for SpaceKitJs
                var tleLine1 = nasaDataTLE[0].member[val].line1,
                tleLine2 = nasaDataTLE[0].member[val].line2

                // Initialize a satellite record CDN
                var satrec = satellite.twoline2satrec(tleLine1, tleLine2);
                
                // ~~~~~~~
                // a : 
                // e : eccentricity,
                // i : inclination,
                // w :
                // ma : mean orbit value,
                // n : number orbit,
                // epoch : value in jd OR normal epoch,
                // ~~~~~~~

                var spaceship = viz.createObject(nasaDataTLE[0].member[val].name, {
                    labelText: nasaDataTLE[0].member[val].name,
                    // textureUrl: './assets/img/moon_surface.jpg',
                    theme: {
                        color: 0xFA00FF,
                        orbitColor: 0x888888,
                    },
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
                sat_obj[val] = { }
                sat_obj[val].spaceObject = spaceship // Store data in a spearate sat_obj array;
                sat_obj[val].data = nasaDataTLE[0].member[val]

                spaceship.orbitAround(earth);
                all_obj.push(spaceship)
            }
        }
    }

    /**
     * Function to remove ALL of the EARTH SATELLITES;
    */
    const removeAllSatellites = () => {
        for (n in sat_obj) {
            viz.removeObject(sat_obj[n].spaceObject)
        }
        // sat_obj = []
    }
    
    // TODO:
    const re_rednerTargetEarthSat = (target_sat, sat_counter) => {
        // target_sat._options.theme.color = 0x00FFD1
        var spaceship = target_sat.spaceObject
        console.log(spaceship)
        // viz.addObject(spaceship, false) // FIXME: ISSUE // ERROR
        spaceship = viz.createObject(spaceship._id, 
            spaceship._options);
        sat_obj[sat_counter].spaceObject = spaceship
        // spaceship.orbitAround(earth)
    }

    /**
     * Function - Re-Renders a target Artificial Satellites with a more eye-catching look for EARTH
     */
    const selectEarthSat = (change) => {
        // Assign target sat to variable
        let target_sat = sat_obj[sat_counter]
        // Remove all satellites,
        removeAllSatellites()
        // Re-render our target sat into view,
        re_rednerTargetEarthSat(target_sat, sat_counter)
        // Set sat info to that of our sat-obj,
        sat_info = target_sat.data
        // View next Earth Sat on the list
        sat_counter += change
        console.log('hello', sat_counter)
    }

    let next = true;

    $:if (sat_counter == 0) {
        next = true;
        console.log('hello', sat_counter)
    } else if (sat_counter == sat_obj.length) {
        next = false
        sat_counter--
    }

    /**
     * Function - Renders the Natural Satellite of EARTH = the Moon, alone
     */
    const toggleMoon = () => {

        viz_option = 'moon'

        clearSimulation()

        const moon = viz.createSphere('earth', {
            textureUrl: './assets/img/moon_surface.jpg',
            debug: {
                showAxes: false,
            },
        });

        all_obj.push(moon)
        loadPlanetInfo('Moon')
    }

    /**
     * Function - Renders the Planet Mars alone
     */
    const toggleMars = () => {

        viz_option = 'mars'

        clearSimulation()

        const mars = viz.createSphere('Mars', {
            textureUrl: './assets/img/mars_surf.jpg',
            debug: {
                showAxes: false,
            },
        });

        all_obj.push(mars)
        loadPlanetInfo('Mars')
    }

    /**
     * Function - Renders the Planet Jupiter alone
     */
    const toggleJupiter = () => {
        viz_option = 'jupiter'

        clearSimulation()

        const jupiter = viz.createSphere('Jupiter', {
            textureUrl: './assets/img/jupiter_surf.jpg',
            debug: {
                showAxes: false,
            },
        });

        all_obj.push(jupiter)
        loadPlanetInfo('Jupiter')
    }

    /**
     * Function - Renders the Planet Neptune alone
     */
    const toggleNeptune = () => {
        viz_option = 'neptune'

        clearSimulation()

        const neptune = viz.createSphere('Neptune', {
            textureUrl: './assets/img/neptune_surf.jpg',
            debug: {
                showAxes: false,
            },
        });

        all_obj.push(neptune)
        loadPlanetInfo('Neptune')
    }

    /**
     * Function - Renders the Galaxy (Solar System) Visualization
     */
    const toggleGalaxy = () => {
        viz_option = 'solar_sys'

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

        all_obj.push(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune)
    }

    /**
     * clear off the current interactive SpaceKitJs Simulation of off the
     * planets visualized and their images, ready for the next visualizations,
     */
    const clearSimulation = () => {
        for (n in all_obj) {
            viz.removeObject(all_obj[n])
        }

        removeAllSatellites()

        sat_obj = []

        planet_info = undefined

        // Make sure that the other simulation is hidden:
        if (earthPinsView != false) {
            earthPinsView = false
            setTimeout(() => {
                recreateSimulation()
            }, 2000)
        }
    }

    /**
     * Functon - Allows for the filtering of the EARTH Orbiting Satellites based on data,
     * launch-date, operational, purpose, etc...
     */
    const filterSatellites = () => {
    }

    // ~~~~~~~~~~~
    // Interactive Earth Simulation
    // WITH PINS FOR VISUAL LAUNCH PADS ACROSS THE EARTH
    // 
    // THREE.JS ROTATING GLOBE CONFIG & SETUP
    // EARTH WITH PINS
    // ~~~~~~~~~~~

    // PLANET VISUAL & INTERACTION

    let objects = [], marker_data = [];
    let selectedMarker, info;

    let showInfo = false

    /**
     * Logical triggers (+ TimeOut) for layout update,
     * and data visualization for indiviual pins
     */
    const showInfoFn = () => {
        showInfo = true
        setTimeout(function() {
        showInfo = false;
        }, 10000)
    }

    /**
     * Match the 'hovered' pin, with the data stored in a temp array,
     * and set the new 'info' to that of the 'hovered' pin, 
     * @param uuid
     */
    const getMarkerData = (uuid) => {
        console.log('Checking for markers data')
        marker_data.forEach(elem => {
            console.log(elem.marker.uuid + ' ' + uuid)
            if (elem.marker.uuid == uuid) {
                // console.log('+++++++++++++++++++ Marker Found! ++++++++++++++++++++++')
                showInfoFn()
                info = elem.data
            }
        });
    }

    /**
     * Function to trigger the Earth with Pins with delay to allow for proper
     * component rendering and loading,
     */
    const toggleEarthPins = () => {
        earthPinsView = true
        setTimeout(() => {
            renderEarthWithPins()
        }, 4000)
    }

    /**
     * Render the Interactive THREE.JS Earth with the PINS,
     * and their interactivity,
     */
    const renderEarthWithPins = () => {

        viz_option = 'launch_pads'

        function Marker() {
            THREE.Object3D.call(this);
            var radius = 0.005;
            var sphereRadius = 0.02;
            var height = 0.05;
            var material = new THREE.MeshPhongMaterial({ color: 0xbab68f });
            var cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material);
            cone.position.y = height * 0.5;
            cone.rotation.x = Math.PI;
            var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
            sphere.position.y = height * 0.95 + sphereRadius;
            this.add(cone, sphere);
            // scene.add(sphere) // Adding marker for easier identification
            // scene.add(cone) // Adding marker for easier identification
        }

        Marker.prototype = Object.create(THREE.Object3D.prototype);

        function Earth(radius) {
            THREE.Object3D.call(this);
            this.userData.radius = radius;
            var earth = new THREE.Mesh(
                new THREE.SphereBufferGeometry(radius, 64.0, 48.0),
                new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('/assets/img/world_map_color.png'),
                })
            );
            this.add(earth);
        }

        Earth.prototype = Object.create(THREE.Object3D.prototype);

        Earth.prototype.createMarker = function (lat, lon, data) {
            var marker = new Marker();
            var latRad = lat * (Math.PI / 180);
            var lonRad = -lon * (Math.PI / 180);
            var r = this.userData.radius;
            marker.position.set(Math.cos(latRad) * Math.cos(lonRad) * r, Math.sin(latRad) * r, Math.cos(latRad) * Math.sin(lonRad) * r);
            marker.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);
            this.add(marker);
            console.log(marker)
            scene.add(marker) // Adding marker for easier identification
            objects.push(marker);
            marker_data.push({
            marker: marker,
            data: data
            })
        };

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        var scene, camera, renderer;
        var controls;

        init();

        function init() {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
            camera.position.set(0.0, 1.5, 3.0);

            // Select the canvas from the document
            var canvReference = document.getElementById('rotatingGlobe');

            renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                canvas: canvReference
            });

            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;
            controls.autoRotateSpeed = -1.0;
            controls.enablePan = false;

            var ambient = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambient);

            var direcitonal = new THREE.DirectionalLight(0xffffff, 0.5);
            direcitonal.position.set(5.0, 2.0, 5.0).normalize();
            scene.add(direcitonal);

            animate()

            var earth = new Earth(0.5);

            // POPULATE EARTH MODEL WITH LAUNCH SITES =====
            for (var i in earth_markers) {
                var item = earth_markers[i]
                earth.createMarker(item['coord'][0], item['coord'][1], earth_markers[i]['info'])
            }
            // END OF POPULATE

            scene.add(earth);

            window.addEventListener('resize', onResize);
            onResize();

            canvReference.addEventListener('mousemove', onMouseMove, false);
            window.requestAnimationFrame(render);
        }

        function onMouseMove(event) {
            // calculate mouse position in normalized device coordinates (-1 to +1) for both components
            mouse.x = ( event.offsetX / window.innerWidth ) * 2 - 1;          // Adjusted to the canvas only (event.offsetX)
            mouse.y = - ( event.offsetY / window.innerHeight ) * 2 + 1;       // Adjusted to the canvas only (event.offsetY)
        }

        function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight;     // controls the camera view position and aspect ratio
            camera.updateProjectionMatrix();                            // updates the "porjector" matrix
            renderer.setSize(window.innerWidth, window.innerHeight);    // size of the render canvas
        }

        function animate() {
            requestAnimationFrame(animate);
            render()
            controls.update();
        }

        function render() {
            // update the picking ray with the camera and mouse position
            raycaster.setFromCamera(mouse, camera);
            // console.log(scene.children) // ERROR !!!
            // calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects( objects, true );

            for (let i = 0; i < intersects.length; i ++) {
                // alert('Got to here!')
                // console.log(intersects[i].object.uuid)
                selectedMarker = intersects[i].object.parent.uuid
                getMarkerData(selectedMarker)
                intersects[ i ].object.material.color.set(0xff0000);
            }

            renderer.render(scene, camera); // RE-RENDER THE CANVAS
        }
    }

</script>

<!-- 
    Component HTML 
-->

<div id='outer-container'> 

    <!-- Canvas For Galaxy -->
    {#if earthPinsView == false}
        <!-- Canvas for Interactive Visualization -->
        <div in:fade out:fade id='main-container'></div>

        <!-- planet exploration info card -->
        {#if planet_info != undefined && sat_obj.length == 0}
            <!-- Selected Planet Info Card -->
            <div in:fade id='div-planets-info-wrapper'>
                <div id='div-planets-info-inner'>
                    <h5 style='grid-column: 1 / 3;'> { planet_info.planet } </h5>
                    <p style='grid-column: 1 / 3;'> { planet_info.planet_desc } </p>
                    <p> { planet_info.planet_stats.length_year } </p>
                    <p> { planet_info.planet_stats.distance_from_sun } </p>
                    <p> { planet_info.planet_stats.moons } Moons </p>
                    <p> { planet_info.planet_stats.satellites } Satellites </p>
                </div>
            </div>
        {/if}
        
        <!-- satellite exploration info card -->
        {#if sat_obj.length != 0 && viz_option == 'earth_sat'}
            <div in:fade id='div-planets-info-wrapper'>
                <div id='div-planets-info-inner'>
                    {#if sat_info != undefined}
                        <h5> {sat_info.name} </h5>
                        <p> {sat_info.ad_data.desc} </p>
                        <p> {sat_info.ad_data.launch_date} </p>
                    {/if}
                </div>
                <div style='display: flex; justify-content: space-between; align-items: center;'> 
                    <button style='width: 100%;' disabled='{!next}' on:click={() => selectEarthSat(1)}> Next {'>'} </button>
                    <button style='width: 100%;' disabled='{next}' on:click={() => selectEarthSat(-1)}> Prev {'<'} </button>
                </div>
            </div>
        {/if}
    {/if}
    
    <!-- Canvas for Interactive EARTH with PINs View -->
    {#if earthPinsView}
        <div in:fade out:fade id='canvas_cont'>
            <!-- VISUAL GLOBE 3D - CANVAS -->
            <canvas id='rotatingGlobe'> </canvas>

            <!-- Launch Pad Selected Pin Info Card -->
            {#if showInfo}
                <div in:fade out:fade id='pin-info-wrapper'>
                    <div id='pin-info-inner'>
                        <h6 style='color: white;'> {info.name} </h6>
                        <img style="width: 75px; height: 75px;" src={info.logo} alt="logo-launch-site" />
                    </div>
                </div> 
            {/if}
        </div>
    {/if}

    <!-- Local Time Display -->
    <div id='time_cont'>
        <h5 style='color: #828282;'> Local Time </h5>
        <h5> {hour}:{min}:{sec} {dayOrNight} </h5>
        <h5> {day} {month} {year} </h5>
    </div>

    <!-- Back Home Button Page Redirect -->
    <a id='div-back-btn' rel=prefetch sapper:noscroll href='/'>
        <span>
            <img src="./assets/svg/_space_exp/_home_btn.svg" alt="next-arrow-vector"/>
            <h5> Back <br /> Home </h5>
        </span>
    </a>

    <!-- Galaxay Search Engine Search Options Menu -->
    <div id='div-btn-menu'>
        <h6 class:active='{viz_option === 'solar_sys'}' on:click={toggleGalaxy}> Solar System </h6>

        <h6 class:active='{viz_option === 'earth'}' on:click={toggleEarth}> Earth </h6>
        <h6 class:active='{viz_option === 'earth_sat'}' on:click={toggleEarthSat}> Show Satellites </h6>
        <h6 class:active='{viz_option === 'launch_pads'}' on:click={toggleEarthPins}> View Launch Pads </h6>
        <h6 class:active='{viz_option === 'moon'}' on:click={toggleMoon}> Moon </h6>

        <h6 class:active='{viz_option === 'mars'}' on:click={toggleMars}> Mars </h6>

        <h6 class:active='{viz_option === 'jupiter'}' on:click={toggleJupiter}> Jupiter </h6>

        <h6 class:active='{viz_option === 'neptune'}' on:click={toggleNeptune}> Neptune </h6>
    </div>

    <!-- Option Menu for Mission Tracking and Simple Planet/Galaxy Exploration -->
    <div id='div-opt-menu'>
        <a rel=prefetch sapper:noscroll href='space_explorer/planets'>
            <button> Planets </button>
        </a>
        <a rel=prefetch sapper:noscroll href='space_explorer/missions'>
            <button> Missions </button>
        </a>
    </div>

</div>

<!-- Component SASS (CSS) -->

<style>

    #outer-container {
        position: relative;
        height: 100vh;
        width: -webkit-fill-available;
        /* Change */
        overflow: hidden; 
    }

	#main-container {
		height: 100vh;
    }

    #time_cont {
        position: absolute;
        margin: auto;
        top: 5%;
        width: -webkit-fill-available;
        display: grid;
        grid-gap: 15px;
        text-align: center;
        font-family: Azonix;
        font-size: 12px;
        color: white;
    }

    #div-back-btn {
        position: absolute;
        top: 5%;
        left: 2.5%;
    }

    #div-btn-menu {
        position: absolute;
        bottom: 25%;
        right: 2.5%;
        top: 25%;
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        text-align: center;
        align-items: center;
        justify-items: end;
    }

    #div-btn-menu h6 {
        color: #464646;
    }

    .active {
        color: aqua !important;
        cursor: pointer;
        /* zoom: 1.2; */
        transform: scale(1.1);
    }

    #div-btn-menu h6:hover {
        color: aqua;
        cursor: pointer;
        /* zoom: 1.2; */
        transform: scale(1.1);
    }

    #div-opt-menu {
        position: absolute;
        bottom: 50px;
        width: 100%;
        right: 0;
        left: 0;
        text-align: center;
    }

    #div-planets-info-wrapper {
        position: absolute;
        left: 2.5%;
        top: 40%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5));
        padding: 1px;
        border-radius: 10px;
        width: 250px;
    }

    #div-planets-info-inner {
        padding: 25px;
        background-color: black;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    #pin-info-wrapper {
        position: absolute;
        top: 50px;
        right: 50px;
        border-radius: 10px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5));
        padding: 1px;
    }

    #pin-info-inner {
        background-color: black;
        padding: 25px;
        border-radius: 10px;
    }
    
</style>