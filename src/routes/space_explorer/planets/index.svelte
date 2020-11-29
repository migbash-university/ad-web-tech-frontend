<script>

    // SVELTE IMPORTS
    import { onMount } from "svelte"
    
    import { fade } from 'svelte/transition';

    // DUMMY DATA;
    import { satellite_data } from '../../../stores/_satellite_data.js'
    import { nasaDataTLE } from '../../../stores/_data_nasa_tle.js'
    import { earth_markers } from '../../../stores/_data_earth_markers.js'

    // REAL DATA;
    // TODO:

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

    let earth;
    let sat_obj = [], all_obj = []

    /**
     * Function - Renders the Earth alone
     */
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

    /**
     * Function - Renders the Artificial Satellites of EARTH
     */
    const toggleEarthSat = () => {
        var val;
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
                sat_obj[val] = spaceship // Store data in a spearate sat_obj array;
                spaceship.orbitAround(earth);

                // TODO: Apply Click trigger on to the sattelite for determinig the satellite;
                // sat_obj[val].addEventListener('mouseover', function() {
                //     alert('mouseover!')
                // })
            }
        } else {
            for (n in sat_obj) {
                viz.removeObject(sat_obj[n])
            }
            sat_obj = []
        }
    }

    /**
     * Function - Renders the Natural Satellite of EARTH = the Moon, alone
     */
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

    /**
     * Function - Renders the Planet Mars alone
     */
    const toggleMars = () => {
    }

    /**
     * Function - Renders the Planet Jupiter alone
     */
    const toggleJupiter = () => {
    }

    /**
     * Function - Renders the Planet Neptune alone
     */
    const toggleNeptune = () => {
    }

    /**
     * Function - Renders the Galaxy (Solar System) Visualization
     */
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
         <!-- content here -->
        <div in:fade out:fade id='main-container'></div>
    {/if}
    
    <!-- Canvas for Interactive EARTH with PIN View -->
    {#if earthPinsView}
        <div in:fade out:fade id='canvas_cont'>
            <!-- VISUAL GLOBE 3D - CANVAS -->
            <canvas id='rotatingGlobe'> </canvas>
            <!-- PIN INFO -->
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
        <h6 on:click={toggleGalaxy}> Solar System </h6>

        <h6 on:click={toggleEarth}> Earth </h6>
        <h6 on:click={toggleEarthSat}> Show Satellites </h6>
        <h6 on:click={toggleEarthPins}> View Launch Pads </h6>
        <h6 on:click={toggleMoon}> Moon </h6>

        <h6 on:click={toggleMars}> Mars </h6>

        <h6 on:click={toggleJupiter}> Jupiter </h6>

        <h6 on:click={toggleNeptune}> Neptune </h6>
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