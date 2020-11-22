<script>
    export let id;
    export let comp;
    export let desc;
    export let date;
    export let img;
</script>

<!-- Component HTML -->
<a href="/news/{id}">
    <div>
        <img src={img} alt='news_img' />
        <h5> {comp} </h5>
        <p> {desc} </p>
        <p> {date} </p>
    </div>
</a>

<!-- Component SASS (CSS) -->
<style lang='sass'>

    img
        width: 100%

    p
        font:
            size: 10px
        color: #666363
        border-radius: 5px
    
    div
        padding: 2.5px

</style>