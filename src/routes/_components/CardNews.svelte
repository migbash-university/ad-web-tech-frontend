<script>
    export let id;
    export let comp;
    export let desc;
    export let date;
    export let img;
</script>

<!-- 
    Component HTML 
-->
<a rel=prefetch href="/news/{id}">
    <div id='div-outer-cont'>
        <img src={img} alt='news_img' />
        <div id='div-inner-cont'>
            <span>
                <h5> {comp} </h5>
                <p> {date} </p>
            </span>
            <p> {desc} </p>
        </div>
    </div>
</a>

<!-- 
    Component (CSS) 
-->
<style>

    #div-outer-cont {
        border-radius: 10px;
        overflow: hidden;
        display: grid;
        grid-template-rows: 1fr 1fr;
        border: 1px solid white;
    }

    
    #div-outer-cont:hover {
        box-shadow: 0px 0px 5px white;
    }

    #div-inner-cont {
        background-color: #0c0c0c;
        color: #B9B9B9;
        padding: 10px;
        overflow-y: hidden;
        height: 210px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p {
        font-size: 10px;
        color: #666363;
        border-radius: 5px;
    }

    span {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
</style>